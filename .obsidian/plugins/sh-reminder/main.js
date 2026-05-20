'use strict';

const obsidian = require('obsidian');
const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── 默认设置 ────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  enabled: true,
  checkIntervalSeconds: 60,
  timeoutSeconds: 300,        // 单个脚本最长执行时间，超时自动终止
  upcomingCount: 3,           // 命令面板「显示即将到点的脚本提醒」列出的条数
  showNotifications: true,
  logFile: 'logs/sh-reminder.log',
};

// ─── 主插件类 ────────────────────────────────────────────────
class ShReminderPlugin extends obsidian.Plugin {

  async onload() {
    await this.loadSettings();

    // 已执行记录：taskId -> "YYYY-MM-DD HH:mm"（防止同一分钟重复执行）
    this.executedMap = new Map();

    // 设置面板
    this.addSettingTab(new ShReminderSettingTab(this.app, this));

    // 命令：立即检查一次
    this.addCommand({
      id: 'run-check-now',
      name: '显示即将到点的脚本提醒',
      callback: () => this.checkScheduledTasks(true),
    });

    // 状态栏：常驻显示「下一个任务」，点击可立即检查
    this.statusBarEl = this.addStatusBarItem();
    this.statusBarEl.addClass('sh-reminder-status');
    this.statusBarEl.addEventListener('click', () => this.checkScheduledTasks(true));
    this.updateStatusBar();

    // 状态栏刷新：每 30s 一次。调度器开着时只刷新倒计时文字（_nextUp 由扫描更新）；
    // 关闭时自行重新扫描，保证状态栏依然实时。
    this.registerInterval(window.setInterval(() => {
      if (this.settings.enabled) this.renderStatusBar();
      else this.updateStatusBar();
    }, 30 * 1000));

    // 启动调度循环
    if (this.settings.enabled) {
      this.startScheduler();
    }

    console.log('[Shell Reminder] ✅ 已加载');
  }

  onunload() {
    this.stopScheduler();
    console.log('[Shell Reminder] 已卸载');
  }

  // ─── 调度器控制 ──────────────────────────────────────────

  startScheduler() {
    this.stopScheduler(); // 防止重复
    this._intervalId = this.registerInterval(
      window.setInterval(
        () => this.checkScheduledTasks(),
        this.settings.checkIntervalSeconds * 1000
      )
    );
    console.log(`[Shell Reminder] 调度器已启动（每 ${this.settings.checkIntervalSeconds}s 检查一次）`);
  }

  stopScheduler() {
    if (this._intervalId != null) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  // ─── 核心：扫描并执行 ────────────────────────────────────

  async checkScheduledTasks(manual = false) {
    const now = new Date();
    const todayStr    = this.fmtDate(now);   // YYYY-MM-DD
    const timeStr     = this.fmtTime(now);   // HH:mm
    const datetimeStr = `${todayStr} ${timeStr}`; // YYYY-MM-DD HH:mm

    // 统计本次扫描结果（用于手动触发时给出反馈）
    let triggered = 0;   // 本次实际触发执行
    let deduped = 0;     // 到点但本分钟已执行过、被防重跳过
    let nextUp = null;   // 最近一个即将到点的任务 { when, path, line, timeSpec }
    let missedCount = 0; // 漏跑的一次性任务数（时间已过、仍未打勾）

    // 匹配：（可缩进）- [ ] 任意文字 (@时间规格) [shell: 命令]
    // 时间规格支持：HH:mm（每日）或 YYYY-MM-DD HH:mm（一次性）
    const TASK_RE = /^\s*- \[ \] .*\(@([^)]+)\)\s*\[shell:\s*([^\]]+)\]/;

    for (const file of this.app.vault.getMarkdownFiles()) {
      let content;
      try {
        content = await this.app.vault.cachedRead(file);
      } catch (e) {
        continue;
      }

      const lines = content.split('\n');

      // 围栏代码块状态：块内的任务行不应触发
      // 围栏 = 行首（可缩进）≥3 个 ` 或 ~，闭合需同字符且不短于开启
      let inFence = false;
      let fenceChar = '';
      let fenceLen = 0;
      const FENCE_RE = /^\s*(`{3,}|~{3,})/;

      for (let i = 0; i < lines.length; i++) {
        const fenceMatch = lines[i].match(FENCE_RE);
        if (fenceMatch) {
          const marker = fenceMatch[1];
          if (!inFence) {
            inFence = true;
            fenceChar = marker[0];
            fenceLen = marker.length;
          } else if (marker[0] === fenceChar && marker.length >= fenceLen) {
            inFence = false;
            fenceChar = '';
            fenceLen = 0;
          }
          continue; // 围栏标记行本身不是任务
        }

        if (inFence) continue; // 代码块内：忽略

        const match = lines[i].match(TASK_RE);
        if (!match) continue;

        const timeSpec = match[1].trim(); // 时间部分
        const shellCmd = match[2].trim(); // 命令部分

        // 判断是否该执行
        let shouldRun = false;
        let isOneTime = false;

        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(timeSpec)) {
          // 一次性：YYYY-MM-DD HH:mm
          shouldRun = (timeSpec === datetimeStr);
          isOneTime = true;
        } else if (/^\d{2}:\d{2}$/.test(timeSpec)) {
          // 每日：HH:mm
          shouldRun = (timeSpec === timeStr);
          isOneTime = false;
        }

        // 计算该任务的下一次触发时间，记录最近的一个（用于状态栏与「最近即将到点」提示）
        const candWhen = this.nextTriggerTime(timeSpec, now);
        if (candWhen && (!nextUp || candWhen < nextUp.when)) {
          nextUp = { when: candWhen, path: file.path, line: i + 1, timeSpec };
        } else if (!candWhen && isOneTime) {
          // 一次性、且无未来触发时刻 = 时间已过 → 漏跑
          missedCount++;
        }

        if (!shouldRun) continue;

        // 防重：同一分钟已执行过则跳过
        const taskId = `${file.path}::${i}::${timeSpec}`;
        if (this.executedMap.get(taskId) === datetimeStr) { deduped++; continue; }
        this.executedMap.set(taskId, datetimeStr);

        // 异步执行，不阻塞扫描（传整行内容，完成时按内容匹配，避免行号错位/覆盖并发编辑）
        // i+1 = 人类可读的 1-based 行号，用于日志来源标注
        triggered++;
        this.executeShell(shellCmd, file, lines[i], isOneTime, i + 1);
      }
    }

    // 每次扫描后更新状态栏「下一个任务」与漏跑计数
    this._nextUp = nextUp;
    this._missedCount = missedCount;
    this.renderStatusBar();

    // 手动触发（命令面板）时给出反馈，避免「无反应」错觉
    if (manual) {
      let msg;
      if (triggered > 0) {
        msg = `🔍 已检查：触发 ${triggered} 个到点任务`;
      } else if (deduped > 0) {
        msg = `🔍 已检查：有 ${deduped} 个任务到点，但本分钟已执行过（防重跳过）`;
      } else {
        msg = `🔍 已检查：当前时间 ${timeStr} 没有到点的任务`;
      }

      const { upcoming, missed } = await this.scanReminders(now);

      // 着重提示：漏跑的一次性任务（放最前，醒目）
      if (missed.length > 0) {
        msg += `\n\n⚠️ 漏跑 ${missed.length} 个一次性任务（已过期未执行）：`;
        missed.forEach((u, idx) => {
          msg += `\n${idx + 1}. @${u.timeSpec} — 「${u.path}」第 ${u.line} 行`;
        });
      }

      // 接下来 N 个即将到点（N 由设置 upcomingCount 指定）
      const limit = Math.max(1, this.settings.upcomingCount || 1);
      const top = upcoming.slice(0, limit);
      if (top.length > 0) {
        msg += `\n\n⏭ 接下来 ${top.length} 个即将到点：`;
        top.forEach((u, idx) => {
          msg += `\n${idx + 1}. @${u.timeSpec}（${this.fmtUntil(u.when, now)}）— 「${u.path}」第 ${u.line} 行`;
        });
      } else {
        msg += `\n\n⏭ 暂无即将到点的任务`;
      }

      new obsidian.Notice(msg, 12000);
      this.log(`[${this.fmtTimestamp(now)}] ${msg.replace(/\n/g, ' ')}（手动触发）`);
    }
  }

  // ─── 计算某时间规格的下一次触发时刻 ──────────────────────
  // timeSpec: "HH:mm"（每日）或 "YYYY-MM-DD HH:mm"（一次性）
  // 返回未来的 Date；过期的一次性任务返回 null
  nextTriggerTime(timeSpec, now) {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(timeSpec)) {
      const d = new Date(timeSpec.replace(' ', 'T')); // 本地时间
      return (!isNaN(d) && d > now) ? d : null;
    }
    if (/^\d{2}:\d{2}$/.test(timeSpec)) {
      const [hh, mm] = timeSpec.split(':').map(Number);
      const d = new Date(now);
      d.setHours(hh, mm, 0, 0);
      if (d <= now) d.setDate(d.getDate() + 1); // 今天已过则算明天
      return d;
    }
    return null;
  }

  // ─── 只读扫描：返回 { upcoming, missed }（均按时间升序，不执行）──
  // upcoming：即将到点的任务（每日任务总有下一次；一次性仅未来）
  // missed：漏跑的一次性任务（时间已过、仍未打勾 = 当时 Obsidian 没开错过了）
  async scanReminders(now) {
    const TASK_RE = /^\s*- \[ \] .*\(@([^)]+)\)\s*\[shell:\s*([^\]]+)\]/;
    const FENCE_RE = /^\s*(`{3,}|~{3,})/;
    const ONETIME_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    const upcoming = [];
    const missed = [];

    for (const file of this.app.vault.getMarkdownFiles()) {
      let content;
      try {
        content = await this.app.vault.cachedRead(file);
      } catch (e) {
        continue;
      }
      const lines = content.split('\n');
      let inFence = false, fenceChar = '', fenceLen = 0;

      for (let i = 0; i < lines.length; i++) {
        const fm = lines[i].match(FENCE_RE);
        if (fm) {
          const marker = fm[1];
          if (!inFence) { inFence = true; fenceChar = marker[0]; fenceLen = marker.length; }
          else if (marker[0] === fenceChar && marker.length >= fenceLen) { inFence = false; fenceChar = ''; fenceLen = 0; }
          continue;
        }
        if (inFence) continue;

        const m = lines[i].match(TASK_RE);
        if (!m) continue;

        const timeSpec = m[1].trim();
        const candWhen = this.nextTriggerTime(timeSpec, now);
        if (candWhen) {
          upcoming.push({ when: candWhen, path: file.path, line: i + 1, timeSpec });
        } else if (ONETIME_RE.test(timeSpec)) {
          // 一次性、且 nextTriggerTime 返回 null = 时间已过 → 漏跑
          const d = new Date(timeSpec.replace(' ', 'T'));
          if (!isNaN(d) && d <= now) {
            missed.push({ when: d, path: file.path, line: i + 1, timeSpec });
          }
        }
      }
    }

    upcoming.sort((a, b) => a.when - b.when);
    missed.sort((a, b) => a.when - b.when);
    return { upcoming, missed };
  }

  // ─── 状态栏 ──────────────────────────────────────────────
  async updateStatusBar() {
    const { upcoming, missed } = await this.scanReminders(new Date());
    this._nextUp = upcoming[0] || null;
    this._missedCount = missed.length;
    this.renderStatusBar();
  }

  // 把 when 与 now 的差距格式化为人类可读（用于通知列表）
  fmtUntil(when, now) {
    const diffMin = Math.max(0, Math.round((when - now) / 60000));
    if (diffMin < 60)   return `${diffMin} 分钟后`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)} 小时 ${diffMin % 60} 分后`;
    return `${Math.floor(diffMin / 1440)} 天 ${Math.floor((diffMin % 1440) / 60)} 小时后`;
  }

  renderStatusBar() {
    if (!this.statusBarEl) return;
    const nu = this._nextUp;
    const missed = this._missedCount || 0;
    const missedPrefix = missed > 0 ? `⚠️${missed} ` : '';
    const missedTip = missed > 0 ? `\n⚠️ 有 ${missed} 个漏跑的一次性任务（点击查看）` : '';

    // 漏跑时给状态栏加醒目类，便于 CSS 高亮
    if (missed > 0) this.statusBarEl.addClass('sh-reminder-status-missed');
    else this.statusBarEl.removeClass('sh-reminder-status-missed');

    if (!nu) {
      this.statusBarEl.setText(`${missedPrefix}⏰ 提醒: 无`);
      const tip0 = `Shell Reminder：暂无即将到点的任务${missedTip}\n（点击立即检查）`;
      this.statusBarEl.setAttribute('aria-label', tip0);
      this.statusBarEl.title = tip0;
      return;
    }
    const diffMin = Math.max(0, Math.round((nu.when - Date.now()) / 60000));
    let human;
    if (diffMin < 60)        human = `${diffMin}m`;
    else if (diffMin < 1440) human = `${Math.floor(diffMin / 60)}h${diffMin % 60}m`;
    else                     human = `${Math.floor(diffMin / 1440)}d${Math.floor((diffMin % 1440) / 60)}h`;

    this.statusBarEl.setText(`${missedPrefix}⏰ ${nu.timeSpec} (${human})`);
    const tip = `Shell Reminder 下一个任务\n@${nu.timeSpec}（${human} 后）\n${nu.path} 第 ${nu.line} 行${missedTip}\n（点击立即检查）`;
    this.statusBarEl.setAttribute('aria-label', tip);
    this.statusBarEl.title = tip;
  }

  // ─── 执行 Shell 命令 ─────────────────────────────────────

  executeShell(shellCmd, file, originalLine, isOneTime, lineNumber) {
    const vaultPath = this.app.vault.adapter.basePath;
    let resolvedCmd = shellCmd;

    // 来源标注：哪个页面、第几行
    const source = `「${file.path}」第 ${lineNumber} 行`;

    // 自动补全脚本路径和解释器
    if (!path.isAbsolute(shellCmd)) {
      const absScript = path.join(vaultPath, shellCmd);
      if (shellCmd.endsWith('.ps1')) {
        resolvedCmd = `powershell.exe -NonInteractive -ExecutionPolicy Bypass -File "${absScript}"`;
      } else if (shellCmd.endsWith('.bat') || shellCmd.endsWith('.cmd')) {
        resolvedCmd = `cmd.exe /c "${absScript}"`;
      } else if (shellCmd.endsWith('.sh')) {
        resolvedCmd = `bash "${absScript}"`;
      } else if (shellCmd.endsWith('.py')) {
        resolvedCmd = `python "${absScript}"`;
      } else if (shellCmd.endsWith('.js')) {
        resolvedCmd = `node "${absScript}"`;
      } else {
        // 兜底：当作命令原样执行（cwd 已是 vault 根），不拼接 vault 路径前缀
        // 例：powershell -Command "..."、git status、tools\my.exe
        resolvedCmd = shellCmd;
      }
    }

    const label = path.basename(shellCmd);
    const ts    = this.fmtTimestamp(new Date());

    this.log(`[${ts}] ▶ 开始执行：来源 ${source}：\n${resolvedCmd}`);

    const startMs = Date.now();
    if (this.settings.showNotifications) {
      new obsidian.Notice(`⚙️ Shell Reminder 启动：${label}\n（后台运行中，完成后会通知）`, 5000);
    }

    const execOpts = {
      cwd: vaultPath,
      timeout: this.settings.timeoutSeconds * 1000, // 超时自动杀掉，防止脚本挂死
      maxBuffer: 10 * 1024 * 1024,                  // 10MB，避免输出过多被误判为失败
    };

    childProcess.exec(resolvedCmd, execOpts, async (err, stdout, stderr) => {
      const ts2 = this.fmtTimestamp(new Date());

      // 记录脚本输出，便于调试
      const out = (stdout || '').trim();
      const errOut = (stderr || '').trim();
      if (out)    this.log(`[${ts2}]   ┌ stdout: ${out.replace(/\n/g, '\n           ')}`);
      if (errOut) this.log(`[${ts2}]   ┌ stderr: ${errOut.replace(/\n/g, '\n           ')}`);

      if (err) {
        const msg = err.killed
          ? `执行超时（>${this.settings.timeoutSeconds}s），已终止`
          : (err.message || String(err));
        this.log(`[${ts2}] ❌ 失败：${label}（来源 ${source}）— 原因：${msg}`);
        if (this.settings.showNotifications) {
          new obsidian.Notice(`❌ 执行失败：${label}\n来源 ${source}\n${msg}`, 6000);
        }
        return;
      }

      const elapsedSec = Math.round((Date.now() - startMs) / 1000);
      this.log(`[${ts2}] ✅ 成功：${label}（来源 ${source}，耗时 ${elapsedSec}s）`);
      if (this.settings.showNotifications) {
        new obsidian.Notice(`✅ 执行完成：${label}\n来源 ${source}\n耗时 ${elapsedSec} 秒`, 5000);
      }

      // 一次性任务：执行完自动打勾
      // 原子读改写：完成时重新读取文件，按行内容匹配，避免覆盖用户的并发编辑或行号错位
      if (isOneTime) {
        try {
          await this.app.vault.process(file, (data) => {
            const arr = data.split('\n');
            const idx = arr.indexOf(originalLine);
            if (idx !== -1) {
              arr[idx] = arr[idx].replace('- [ ]', '- [x]');
              return arr.join('\n');
            }
            // 行已被改动/移动，找不到原行则不改动，避免误伤
            this.log(`[${ts2}] ⚠️ 未找到原任务行，跳过自动打勾：${label}（来源 ${source}）`);
            return data;
          });
        } catch (e) {
          console.error('[Shell Reminder] 勾选任务失败:', e);
        }
      }
    });
  }

  // ─── 日志写入 ────────────────────────────────────────────

  log(message) {
    console.log('[Shell Reminder]', message);
    if (!this.settings.logFile) return;
    try {
      const logPath = path.join(
        this.app.vault.adapter.basePath,
        this.settings.logFile
      );
      // 确保目录存在
      const dir = path.dirname(logPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.appendFileSync(logPath, message + '\n', 'utf8');
    } catch (e) {
      console.error('[Shell Reminder] 写日志失败:', e);
    }
  }

  // ─── 工具函数 ────────────────────────────────────────────

  fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  fmtTime(d) {
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  fmtTimestamp(d) {
    return `${this.fmtDate(d)} ${this.fmtTime(d)}:${String(d.getSeconds()).padStart(2,'0')}`;
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// ─── 设置面板 ────────────────────────────────────────────────
class ShReminderSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Shell Reminder' });

    // ─── 使用说明 ─────────────────────────────────
    containerEl.createEl('h3', { text: '使用说明' });

    const intro = containerEl.createDiv({ cls: 'sh-reminder-intro' });
    intro.createEl('p', {
      text: 'Shell Reminder 让你在普通笔记里写「定时任务」：插件每隔几十秒扫描全库的 Markdown，发现到点的任务就自动在后台执行你指定的脚本/命令，并弹出通知。适合做定时备份、健康检查、同步、数据抓取等自动化。',
    });

    const steps = intro.createEl('ol');
    [
      ['写一行任务', '在任意笔记中新建一个待办行，按下方「任务语法」写明触发时间与要执行的脚本。例如：- [ ] 每日备份 (@09:00) [shell: _scripts/backup.ps1]'],
      ['放好脚本', '把脚本放进 vault（推荐 _scripts/ 目录），路径相对 vault 根目录；插件会按后缀自动选择解释器（见下方表格）。也可直接写绝对路径或可执行命令。'],
      ['保持 Obsidian 开着', '插件只在 Obsidian 运行时工作。到达设定时间的那一分钟，任务会被触发；可在「基本设置」里调整扫描间隔。'],
      ['查看结果', '执行开始/成功/失败都会弹通知，并写入日志文件（默认 logs/sh-reminder.log），脚本的 stdout/stderr 也会记进日志便于排查。'],
      ['立即测试', '不想等到点？打开命令面板（Ctrl/Cmd+P）运行命令「显示即将到点的脚本提醒」，即可马上扫描、执行当前到点的任务，并显示最近一个即将到点的任务及其位置。'],
    ].forEach(([t, d]) => {
      const li = steps.createEl('li');
      li.createEl('strong', { text: t + '：' });
      li.appendText(d);
    });

    const tips = intro.createEl('p', { cls: 'setting-item-description' });
    tips.appendText('提示：每日任务用 ');
    tips.createEl('code', { text: '@HH:mm' });
    tips.appendText('，会每天重复；一次性任务用 ');
    tips.createEl('code', { text: '@YYYY-MM-DD HH:mm' });
    tips.appendText('，执行完成后会自动把 - [ ] 勾选为 - [x]。写在代码块（``` 围栏）里的任务行会被忽略，方便你在笔记里展示示例而不被误触发。');

    // ─── 语法说明 ─────────────────────────────────
    containerEl.createEl('h3', { text: '任务语法' });
    containerEl.createEl('p', {
      text: '在任意笔记的任务行中使用以下语法触发脚本：',
      cls: 'setting-item-description',
    });

    const syntaxBox = containerEl.createDiv({ cls: 'sh-reminder-syntax-box' });
    syntaxBox.createDiv({ text: '- [ ] 描述 (@HH:mm) [shell: 脚本路径]' });
    syntaxBox.createDiv({ text: '         └─ 每日重复', cls: 'setting-item-description' });
    syntaxBox.createDiv({ text: '- [ ] 描述 (@YYYY-MM-DD HH:mm) [shell: 脚本路径]' });
    syntaxBox.createDiv({ text: '         └─ 一次性，完成后自动打勾', cls: 'setting-item-description' });

    // ─── 支持的脚本类型表格 ────────────────────────
    containerEl.createEl('h3', { text: '支持的脚本类型' });

    const tableWrap = containerEl.createDiv({ cls: 'sh-reminder-table-wrap' });
    const table = tableWrap.createEl('table');

    const thead = table.createEl('thead');
    const trh = thead.createEl('tr');
    ['后缀', '解释器', '示例'].forEach(h => {
      trh.createEl('th', { text: h });
    });

    const rows = [
      ['.ps1',        'powershell.exe', '_scripts/diary-lint.ps1'],
      ['.bat / .cmd', 'cmd.exe',        '_scripts/backup.bat'],
      ['.sh',         'bash',           '_scripts/sync.sh'],
      ['.py',         'python',         '_scripts/analyze.py'],
      ['.js',         'node',           '_scripts/scrape.js'],
      ['其他 / 绝对路径', '直接执行',     'C:\\tools\\mytool.exe'],
    ];

    const tbody = table.createEl('tbody');
    rows.forEach(r => {
      const tr = tbody.createEl('tr');
      r.forEach((cell, i) => {
        const td = tr.createEl('td');
        if (i !== 1) {
          td.createEl('code', { text: cell });
        } else {
          td.setText(cell);
        }
      });
    });

    // ─── 注意事项 ─────────────────────────────────
    const notes = containerEl.createDiv({ cls: 'sh-reminder-notes' });
    notes.createEl('strong', { text: '注意：' });
    const ul = notes.createEl('ul');
    [
      '相对路径以 vault 根目录为基准（如 _scripts/xxx.py）',
      '调用 python / node / bash 前确保已在系统 PATH',
      'Shell Reminder 仅在 Obsidian 运行时工作；一次性任务若错过其精确分钟（如当时未开 Obsidian）将不会补跑',
      '支持缩进/嵌套任务行（行首空白会被忽略）',
      '一次性任务执行完成后会自动把 - [ ] 改为 - [x]',
      '⚠️ 安全：任何笔记里的 [shell: …] 都会在本机执行命令。请勿运行来源不明 / 同步分享进来的笔记中的脚本',
    ].forEach(t => ul.createEl('li', { text: t }));

    // ─── 全部脚本提醒 ─────────────────────────────
    const remindHeader = new obsidian.Setting(containerEl)
      .setName('全部脚本提醒')
      .setDesc('扫描全库列出所有即将到点的提醒（已过期的一次性任务、代码块内的示例不计入）');
    remindHeader.addButton(b => b
      .setButtonText('刷新')
      .onClick(() => this.renderReminderList()));

    this.reminderListEl = containerEl.createDiv({ cls: 'sh-reminder-list' });
    this.renderReminderList(); // 异步填充

    containerEl.createEl('h3', { text: '基本设置' });

    new obsidian.Setting(containerEl)
      .setName('启用调度器')
      .setDesc('关闭后停止所有自动检查')
      .addToggle(t => t
        .setValue(this.plugin.settings.enabled)
        .onChange(async v => {
          this.plugin.settings.enabled = v;
          await this.plugin.saveSettings();
          v ? this.plugin.startScheduler() : this.plugin.stopScheduler();
        }));

    new obsidian.Setting(containerEl)
      .setName('检查间隔（秒）')
      .setDesc('每隔多少秒扫描一次笔记（最小 30）')
      .addText(t => t
        .setPlaceholder('60')
        .setValue(String(this.plugin.settings.checkIntervalSeconds))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 30) {
            this.plugin.settings.checkIntervalSeconds = n;
            await this.plugin.saveSettings();
            if (this.plugin.settings.enabled) this.plugin.startScheduler();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName('脚本超时（秒）')
      .setDesc('单个脚本最长执行时间，超时自动终止（最小 5）')
      .addText(t => t
        .setPlaceholder('300')
        .setValue(String(this.plugin.settings.timeoutSeconds))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 5) {
            this.plugin.settings.timeoutSeconds = n;
            await this.plugin.saveSettings();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName('即将到点提醒条数')
      .setDesc('命令面板「显示即将到点的脚本提醒」一次列出几条（最小 1）')
      .addText(t => t
        .setPlaceholder('3')
        .setValue(String(this.plugin.settings.upcomingCount))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 1) {
            this.plugin.settings.upcomingCount = n;
            await this.plugin.saveSettings();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName('显示执行通知')
      .setDesc('执行时在右上角显示 Obsidian 通知')
      .addToggle(t => t
        .setValue(this.plugin.settings.showNotifications)
        .onChange(async v => {
          this.plugin.settings.showNotifications = v;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName('日志文件路径')
      .setDesc('相对于 vault 根目录，留空则不记录日志')
      .addText(t => t
        .setPlaceholder('logs/sh-reminder.log')
        .setValue(this.plugin.settings.logFile)
        .onChange(async v => {
          this.plugin.settings.logFile = v.trim();
          await this.plugin.saveSettings();
        }));
  }

  // 异步扫描并渲染「全部脚本提醒」列表（漏跑着重置顶）
  async renderReminderList() {
    const el = this.reminderListEl;
    if (!el) return;
    el.empty();
    el.createEl('p', { text: '扫描中…', cls: 'setting-item-description' });

    const now = new Date();
    const { upcoming, missed } = await this.plugin.scanReminders(now);

    el.empty();

    // ── 漏跑的一次性任务：着重标注，置顶 ──
    if (missed.length > 0) {
      const warn = el.createDiv({ cls: 'sh-reminder-missed-box' });
      warn.createEl('div', {
        cls: 'sh-reminder-missed-title',
        text: `⚠️ 漏跑 ${missed.length} 个一次性任务（已过期、未执行）`,
      });
      warn.createEl('div', {
        cls: 'setting-item-description',
        text: '这些任务到点时 Obsidian 未运行，已永久错过、不会自动补跑。请手动处理：补跑、改时间或删除。',
      });
      this.buildReminderTable(warn, missed, now, false);
    }

    // ── 即将到点 ──
    if (upcoming.length === 0 && missed.length === 0) {
      el.createEl('p', { text: '暂无即将到点的提醒。', cls: 'setting-item-description' });
      return;
    }

    const MAX_ROWS = 50; // 太多时只渲染前 N 行，避免拖慢设置页
    const list = upcoming.slice(0, MAX_ROWS);
    const caption = upcoming.length > MAX_ROWS
      ? `即将到点 ${upcoming.length} 个，仅显示最近 ${MAX_ROWS} 个（按时间排序）：`
      : `即将到点 ${upcoming.length} 个（按时间排序）：`;
    el.createEl('p', { text: caption, cls: 'setting-item-description' });
    this.buildReminderTable(el, list, now, true);
  }

  // 构建提醒表格；showUntil=true 时多一列「距现在」
  buildReminderTable(parent, items, now, showUntil) {
    const table = parent.createEl('table', { cls: 'sh-reminder-list-table' });
    const trh = table.createEl('thead').createEl('tr');
    const headers = showUntil
      ? ['#', '触发时间', '距现在', '来源（页面 : 行）']
      : ['#', '触发时间', '来源（页面 : 行）'];
    headers.forEach(h => trh.createEl('th', { text: h }));

    const tbody = table.createEl('tbody');
    items.forEach((u, idx) => {
      const tr = tbody.createEl('tr');
      tr.createEl('td', { text: String(idx + 1) });
      tr.createEl('td').createEl('code', { text: `@${u.timeSpec}` });
      if (showUntil) tr.createEl('td', { text: this.plugin.fmtUntil(u.when, now) });
      const srcTd = tr.createEl('td');
      const link = srcTd.createEl('a', { text: `${u.path} : ${u.line}`, href: '#' });
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.openAtLine(u.path, u.line);
      });
    });
  }

  // 打开指定文件并跳到指定行
  async openAtLine(path, line) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!file) return;
    const leaf = this.app.workspace.getLeaf(false);
    await leaf.openFile(file);
    const view = leaf.view;
    if (view && view.editor) {
      const ln = Math.max(0, line - 1);
      view.editor.setCursor({ line: ln, ch: 0 });
      view.editor.scrollIntoView({ from: { line: ln, ch: 0 }, to: { line: ln, ch: 0 } }, true);
    }
  }
}

module.exports = ShReminderPlugin;

'use strict';

const obsidian = require('obsidian');
const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── 默认设置 ────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  enabled: true,
  checkIntervalSeconds: 60,
  showNotifications: true,
  logFile: '_scripts/task-runner.log',
};

// ─── 主插件类 ────────────────────────────────────────────────
class ClaudianSchedulerPlugin extends obsidian.Plugin {

  async onload() {
    await this.loadSettings();

    // 已执行记录：taskId -> "YYYY-MM-DD HH:mm"（防止同一分钟重复执行）
    this.executedMap = new Map();

    // 设置面板
    this.addSettingTab(new ClaudianSchedulerSettingTab(this.app, this));

    // 命令：立即检查一次
    this.addCommand({
      id: 'run-check-now',
      name: '立即检查定时任务',
      callback: () => this.checkScheduledTasks(),
    });

    // 启动调度循环
    if (this.settings.enabled) {
      this.startScheduler();
    }

    console.log('[Claudian Scheduler] ✅ 已加载');
  }

  onunload() {
    this.stopScheduler();
    console.log('[Claudian Scheduler] 已卸载');
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
    console.log(`[Claudian Scheduler] 调度器已启动（每 ${this.settings.checkIntervalSeconds}s 检查一次）`);
  }

  stopScheduler() {
    if (this._intervalId != null) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  // ─── 核心：扫描并执行 ────────────────────────────────────

  async checkScheduledTasks() {
    const now = new Date();
    const todayStr    = this.fmtDate(now);   // YYYY-MM-DD
    const timeStr     = this.fmtTime(now);   // HH:mm
    const datetimeStr = `${todayStr} ${timeStr}`; // YYYY-MM-DD HH:mm

    // 匹配：- [ ] 任意文字 (@时间规格) [shell: 命令]
    // 时间规格支持：HH:mm（每日）或 YYYY-MM-DD HH:mm（一次性）
    const TASK_RE = /^- \[ \] .*\(@([^)]+)\)\s*\[shell:\s*([^\]]+)\]/;

    for (const file of this.app.vault.getMarkdownFiles()) {
      let content;
      try {
        content = await this.app.vault.read(file);
      } catch (e) {
        continue;
      }

      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
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

        if (!shouldRun) continue;

        // 防重：同一分钟已执行过则跳过
        const taskId = `${file.path}::${i}::${timeSpec}`;
        if (this.executedMap.get(taskId) === datetimeStr) continue;
        this.executedMap.set(taskId, datetimeStr);

        // 异步执行，不阻塞扫描
        this.executeShell(shellCmd, file, i, isOneTime, lines);
      }
    }
  }

  // ─── 执行 Shell 命令 ─────────────────────────────────────

  executeShell(shellCmd, file, lineIndex, isOneTime, lines) {
    const vaultPath = this.app.vault.adapter.basePath;
    let resolvedCmd = shellCmd;

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
        resolvedCmd = absScript;
      }
    }

    const label = path.basename(shellCmd);
    const ts    = this.fmtTimestamp(new Date());

    this.log(`[${ts}] ▶ 开始执行：${resolvedCmd}`);

    const startMs = Date.now();
    if (this.settings.showNotifications) {
      new obsidian.Notice(`⚙️ Claudian 启动：${label}\n（后台运行中，完成后会通知）`, 5000);
    }

    childProcess.exec(resolvedCmd, { cwd: vaultPath }, async (err, stdout, stderr) => {
      const ts2 = this.fmtTimestamp(new Date());

      if (err) {
        const msg = err.message || String(err);
        this.log(`[${ts2}] ❌ 失败：${label} — ${msg}`);
        if (this.settings.showNotifications) {
          new obsidian.Notice(`❌ 执行失败：${label}\n${msg}`, 6000);
        }
        return;
      }

      const elapsedSec = Math.round((Date.now() - startMs) / 1000);
      this.log(`[${ts2}] ✅ 完成：${label}（耗时 ${elapsedSec}s）`);
      if (this.settings.showNotifications) {
        new obsidian.Notice(`✅ 执行完成：${label}\n耗时 ${elapsedSec} 秒`, 5000);
      }

      // 一次性任务：执行完自动打勾
      if (isOneTime) {
        const newLines = [...lines];
        newLines[lineIndex] = newLines[lineIndex].replace('- [ ]', '- [x]');
        try {
          await this.app.vault.modify(file, newLines.join('\n'));
        } catch (e) {
          console.error('[Claudian Scheduler] 勾选任务失败:', e);
        }
      }
    });
  }

  // ─── 日志写入 ────────────────────────────────────────────

  log(message) {
    console.log('[Claudian Scheduler]', message);
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
      console.error('[Claudian Scheduler] 写日志失败:', e);
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
class ClaudianSchedulerSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Claudian Scheduler' });

    // ─── 语法说明 ─────────────────────────────────
    containerEl.createEl('h3', { text: '任务语法' });
    containerEl.createEl('p', {
      text: '在任意笔记的任务行中使用以下语法触发脚本：',
      cls: 'setting-item-description',
    });

    const syntaxBox = containerEl.createDiv({ cls: 'claudian-syntax-box' });
    syntaxBox.style.background = 'var(--background-secondary)';
    syntaxBox.style.padding = '8px 12px';
    syntaxBox.style.borderRadius = '6px';
    syntaxBox.style.fontFamily = 'var(--font-monospace)';
    syntaxBox.style.fontSize = '0.9em';
    syntaxBox.style.marginBottom = '12px';
    syntaxBox.createDiv({ text: '- [ ] 描述 (@HH:mm) [shell: 脚本路径]' });
    syntaxBox.createDiv({ text: '         └─ 每日重复', cls: 'setting-item-description' });
    syntaxBox.createDiv({ text: '- [ ] 描述 (@YYYY-MM-DD HH:mm) [shell: 脚本路径]' });
    syntaxBox.createDiv({ text: '         └─ 一次性，完成后自动打勾', cls: 'setting-item-description' });

    // ─── 支持的脚本类型表格 ────────────────────────
    containerEl.createEl('h3', { text: '支持的脚本类型' });

    const tableWrap = containerEl.createDiv({ cls: 'claudian-table-wrap' });
    tableWrap.style.marginBottom = '16px';
    const table = tableWrap.createEl('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontSize = '0.9em';

    const thead = table.createEl('thead');
    const trh = thead.createEl('tr');
    ['后缀', '解释器', '示例'].forEach(h => {
      const th = trh.createEl('th', { text: h });
      th.style.textAlign = 'left';
      th.style.padding = '6px 10px';
      th.style.borderBottom = '2px solid var(--background-modifier-border)';
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
        td.style.padding = '6px 10px';
        td.style.borderBottom = '1px solid var(--background-modifier-border)';
        if (i !== 1) {
          const code = td.createEl('code', { text: cell });
          code.style.background = 'var(--background-secondary)';
          code.style.padding = '2px 6px';
          code.style.borderRadius = '3px';
        } else {
          td.setText(cell);
        }
      });
    });

    // ─── 注意事项 ─────────────────────────────────
    const notes = containerEl.createDiv({ cls: 'claudian-notes' });
    notes.style.padding = '8px 12px';
    notes.style.background = 'var(--background-modifier-form-field)';
    notes.style.borderLeft = '3px solid var(--interactive-accent)';
    notes.style.borderRadius = '4px';
    notes.style.fontSize = '0.85em';
    notes.style.marginBottom = '16px';
    notes.createEl('strong', { text: '注意：' });
    const ul = notes.createEl('ul');
    ul.style.margin = '4px 0 0 0';
    ul.style.paddingLeft = '20px';
    [
      '相对路径以 vault 根目录为基准（如 _scripts/xxx.py）',
      '调用 python / node / bash 前确保已在系统 PATH',
      'Claudian Scheduler 仅在 Obsidian 运行时工作',
      '一次性任务执行完成后会自动把 - [ ] 改为 - [x]',
    ].forEach(t => ul.createEl('li', { text: t }));

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
        .setPlaceholder('_scripts/task-runner.log')
        .setValue(this.plugin.settings.logFile)
        .onChange(async v => {
          this.plugin.settings.logFile = v.trim();
          await this.plugin.saveSettings();
        }));
  }
}

module.exports = ClaudianSchedulerPlugin;

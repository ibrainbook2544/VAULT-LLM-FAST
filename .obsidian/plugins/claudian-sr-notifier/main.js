'use strict';

const obsidian = require('obsidian');

// ─── 默认设置 ────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  enabled:             true,
  intervalMinutes:     15,           // 每 N 分钟触发一次（默认 15 分钟）
  triggerOnLoad:       true,         // 启动时是否立即触发一次
  lookAheadDays:       0,            // 0=只看今日 / 1=今明 / 2=未来 3 天
  baseFile:            'DIARY/diary.base', // 点击通知后打开的文件
  maxListCount:        5,            // 通知中最多列出的卡片数
  desktopNotification: true,         // 是否同时发系统级桌面通知（OB 最小化也能看到）
  inAppNotice:         true,         // 是否同时发 OB 内 Notice

  // ─── 高级：字段名映射 ───
  atomTypeValue:    'diary-atom',
  typeField:        'type',
  nextReviewField:  'next_review',
  archivedField:    'archived',
  importanceField:  'importance',
};

// ─── 主插件类 ────────────────────────────────────────────────
class ClaudianSrNotifierPlugin extends obsidian.Plugin {

  async onload() {
    await this.loadSettings();

    // 首次加载时尝试取得系统通知权限（Electron 一般自动 granted，但少数环境需要请求）
    this.ensureNotificationPermission();

    // 设置面板
    this.addSettingTab(new ClaudianSrNotifierSettingTab(this.app, this));

    // 命令：立即检查
    this.addCommand({
      id: 'check-sr-now',
      name: '立即检查 SR 待复习卡片',
      callback: () => this.checkSrReminders(true),
    });

    // 启动调度循环
    if (this.settings.enabled) {
      this.startScheduler();
    }

    console.log('[Claudian SR Notifier] ✅ 已加载');
  }

  onunload() {
    this.stopScheduler();
    this.dismissActiveNotice();
    this.dismissActiveDesktop();
    console.log('[Claudian SR Notifier] 已卸载');
  }

  /** 关闭当前还挂着的 OB 内 Notice（如果有） */
  dismissActiveNotice() {
    if (this._activeNotice) {
      try { this._activeNotice.hide(); } catch (_) { /* 已自然消失 */ }
      this._activeNotice = null;
    }
  }

  /** 关闭当前还挂着的系统桌面通知（如果有） */
  dismissActiveDesktop() {
    if (this._activeDesktop) {
      try { this._activeDesktop.close(); } catch (_) { /* 用户已手动关闭 */ }
      this._activeDesktop = null;
    }
  }

  /** 取一次系统通知权限。Electron 默认大多直接 granted。 */
  async ensureNotificationPermission() {
    if (typeof Notification === 'undefined') return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    try {
      const result = await Notification.requestPermission();
      return result === 'granted';
    } catch (e) {
      console.warn('[Claudian SR Notifier] 请求通知权限失败：', e);
      return false;
    }
  }

  /** 把 Obsidian 窗口拉到前台（用户点击桌面通知时调用） */
  focusObsidianWindow() {
    try {
      const electron = window.require ? window.require('electron') : null;
      // Electron renderer：优先用 remote（旧版 Electron），否则 ipcRenderer 发起
      const win = electron?.remote?.getCurrentWindow?.()
        || electron?.getCurrentWindow?.();
      if (win) {
        if (typeof win.isMinimized === 'function' && win.isMinimized()) win.restore();
        win.show?.();
        win.focus?.();
        return;
      }
      // 退路：浏览器原生 focus（在 Electron 里多数情况下足够）
      window.focus();
    } catch (e) {
      console.warn('[Claudian SR Notifier] focusObsidianWindow 失败：', e);
    }
  }

  /**
   * 发送一条系统级桌面通知。
   * @param {string} title 通知标题
   * @param {string} body  通知正文（系统通知一般只显示几行）
   * @param {() => void} onClick 用户点击时的回调
   * @returns {Notification|null}
   */
  showDesktopNotification(title, body, onClick) {
    if (typeof Notification === 'undefined') return null;
    if (Notification.permission !== 'granted') {
      // 异步请求一次，下次触发就能用上
      this.ensureNotificationPermission();
      return null;
    }
    try {
      const n = new Notification(title, {
        body,
        silent: false,
        tag: 'claudian-sr-notifier', // 同 tag 的会被系统合并/替换，避免堆积
        requireInteraction: true,    // Windows 上让通知停留在 Action Center 直到用户处理
      });
      n.onclick = () => {
        this.focusObsidianWindow();
        try { onClick && onClick(); } catch (_) {}
        try { n.close(); } catch (_) {}
        if (this._activeDesktop === n) this._activeDesktop = null;
      };
      n.onclose = () => {
        if (this._activeDesktop === n) this._activeDesktop = null;
      };
      return n;
    } catch (e) {
      console.warn('[Claudian SR Notifier] 发送桌面通知失败：', e);
      return null;
    }
  }

  // ─── 调度器控制 ──────────────────────────────────────────

  /** 取得合法的间隔毫秒数（最小 1 分钟，防止 0 / 负数） */
  getIntervalMs() {
    const minutes = Number(this.settings.intervalMinutes);
    const safe = (!isFinite(minutes) || minutes < 1) ? 15 : minutes;
    return safe * 60 * 1000;
  }

  startScheduler() {
    this.stopScheduler();
    const intervalMs = this.getIntervalMs();

    this._intervalId = window.setInterval(() => this.tick(), intervalMs);
    this.registerInterval(this._intervalId);

    // 启动时立即触发一次（避免等待第一个周期）
    if (this.settings.triggerOnLoad) {
      // 延后 2s，等 metadataCache 完成首次索引
      window.setTimeout(() => this.checkSrReminders(false), 2000);
    }

    console.log(`[Claudian SR Notifier] 调度器已启动（每 ${this.settings.intervalMinutes} 分钟检查一次）`);
  }

  stopScheduler() {
    if (this._intervalId != null) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  /** 周期触发：直接执行扫描 */
  tick() {
    this.checkSrReminders(false);
  }

  // ─── 核心：扫描 + 通知 ───────────────────────────────────

  /**
   * @param {boolean} force - true: 命令面板手动触发，无视开关
   */
  checkSrReminders(force = false) {
    if (!force && !this.settings.enabled) return;

    // 每次触发先关掉上一次还挂着的通知（OB 内 + 系统桌面），避免堆叠
    this.dismissActiveNotice();
    this.dismissActiveDesktop();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lookAhead = new Date(today);
    lookAhead.setDate(lookAhead.getDate() + (this.settings.lookAheadDays || 0));
    lookAhead.setHours(23, 59, 59, 999);

    const TYPE_FIELD = this.settings.typeField        || 'type';
    const ATOM_VALUE = this.settings.atomTypeValue    || 'diary-atom';
    const NEXT_FIELD = this.settings.nextReviewField  || 'next_review';
    const ARC_FIELD  = this.settings.archivedField    || 'archived';
    const IMP_FIELD  = this.settings.importanceField  || 'importance';

    const dueCards = [];

    // ⚡ 关键：用 metadataCache（零 IO，O(n) 内存查询）
    for (const file of this.app.vault.getMarkdownFiles()) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter;
      if (!fm) continue;

      if (fm[TYPE_FIELD] !== ATOM_VALUE) continue;
      if (fm[ARC_FIELD] === true) continue;

      const nr = this.parseDateValue(fm[NEXT_FIELD]);
      if (!nr) continue;
      if (nr > lookAhead) continue;

      const overdueDays = Math.floor((today - nr) / (1000 * 60 * 60 * 24));
      dueCards.push({
        file,
        title:       file.basename,
        importance:  typeof fm[IMP_FIELD] === 'number' ? fm[IMP_FIELD] : 3,
        nextReview:  nr,
        overdueDays: Math.max(0, overdueDays),
      });
    }

    if (dueCards.length === 0) {
      if (force) new obsidian.Notice('📚 SR：今日无待复习卡片 ✨', 4000);
      console.log(`[Claudian SR Notifier] 无待复习`);
      return;
    }

    // 排序：importance 降序 → overdue 降序 → next_review 升序
    dueCards.sort((a, b) =>
      (b.importance - a.importance) ||
      (b.overdueDays - a.overdueDays) ||
      (a.nextReview - b.nextReview)
    );

    const overdueCount = dueCards.filter(c => c.overdueDays > 0).length;
    const todayCount   = dueCards.length - overdueCount;
    const maxCount     = this.settings.maxListCount || 5;

    // 构建通知内容
    const top = dueCards.slice(0, maxCount).map(c => {
      const stars = '★'.repeat(c.importance) + '☆'.repeat(5 - c.importance);
      const overdueTag = c.overdueDays > 0 ? ` (逾期 ${c.overdueDays}d)` : '';
      return `  ${stars} ${c.title}${overdueTag}`;
    });

    const headerLines = [`📚 SR 提醒：${dueCards.length} 张卡片待复习`];
    if (overdueCount > 0) headerLines.push(`⚠️  逾期 ${overdueCount} 张`);
    if (todayCount > 0)   headerLines.push(`📅 今日到期 ${todayCount} 张`);

    const body = [
      ...headerLines,
      '',
      ...top,
    ];
    if (dueCards.length > maxCount) body.push(`  … 还有 ${dueCards.length - maxCount} 张`);
    body.push('', '点击打开复习视图 →');

    // 点击通知后的统一动作：打开 baseFile
    const openReviewView = () => {
      const targetPath = this.settings.baseFile || 'DIARY/diary.base';
      const target = this.app.vault.getAbstractFileByPath(targetPath);
      if (target) {
        this.app.workspace.getLeaf().openFile(target);
      } else {
        new obsidian.Notice(`未找到文件：${targetPath}`, 3000);
      }
    };

    // ① OB 内 Notice（前台时可见）
    if (this.settings.inAppNotice !== false) {
      const notice = new obsidian.Notice(body.join('\n'), 0); // 0 = 不自动消失
      this._activeNotice = notice;
      notice.noticeEl.style.cursor = 'pointer';
      notice.noticeEl.addEventListener('click', () => {
        openReviewView();
        notice.hide();
        if (this._activeNotice === notice) this._activeNotice = null;
      });
    }

    // ② 系统桌面通知（OB 最小化也能看到）
    if (this.settings.desktopNotification !== false) {
      const desktopBody = [];
      if (overdueCount > 0) desktopBody.push(`逾期 ${overdueCount} 张`);
      if (todayCount > 0)   desktopBody.push(`今日到期 ${todayCount} 张`);
      // 加上前 3 张卡片标题，避免桌面通知被截断
      const preview = dueCards.slice(0, 3).map(c => c.title).join(' / ');
      const bodyText = `${desktopBody.join(' · ')}\n${preview}${dueCards.length > 3 ? ` …(+${dueCards.length - 3})` : ''}`;
      this._activeDesktop = this.showDesktopNotification(
        `📚 SR 提醒：${dueCards.length} 张卡片待复习`,
        bodyText,
        openReviewView,
      );
    }

    console.log(`[Claudian SR Notifier] 弹出通知：${dueCards.length} 张待复习（逾期 ${overdueCount}）`);
  }

  // ─── 工具函数 ────────────────────────────────────────────

  /** 解析 next_review 字段为 Date（支持 YYYY-MM-DD 字符串或 Date 对象） */
  parseDateValue(value) {
    if (!value) return null;
    if (value instanceof Date) {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }
    const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return null;
    return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// ─── 设置面板 ────────────────────────────────────────────────
class ClaudianSrNotifierSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Claudian SR Notifier' });

    // ─── 说明 ─────────────────────────────────────
    const intro = containerEl.createDiv();
    intro.style.padding = '10px 14px';
    intro.style.background = 'var(--background-modifier-form-field)';
    intro.style.borderLeft = '3px solid var(--interactive-accent)';
    intro.style.borderRadius = '4px';
    intro.style.fontSize = '0.88em';
    intro.style.marginBottom = '16px';

    intro.createEl('strong', { text: '🎯 工作原理：' });
    const ul = intro.createEl('ul');
    ul.style.margin = '6px 0 0 0';
    ul.style.paddingLeft = '20px';
    [
      '使用 Obsidian metadataCache 读取所有 diary-atom 文件的 frontmatter（零文件 IO）',
      '过滤条件：type=diary-atom AND archived≠true AND next_review≤今日+前瞻天数',
      '排序：importance 降序 → 逾期天数降序 → next_review 升序',
      '按固定间隔（默认每 15 分钟）轮询一次，命中时同时推送：OB 内 Notice + 系统桌面通知（OB 最小化也能看到）',
      '点击任一通知 → 拉起 OB 窗口并打开 DIARY/diary.base 复习视图',
      '性能：1 万张卡片亦在 ~100ms 内完成扫描',
    ].forEach(t => ul.createEl('li', { text: t }));

    // ─── 基本设置 ─────────────────────────────────
    containerEl.createEl('h3', { text: '基本设置' });

    new obsidian.Setting(containerEl)
      .setName('启用 SR 通知')
      .setDesc('关闭后停止自动检查（命令面板仍可手动触发）')
      .addToggle(t => t
        .setValue(this.plugin.settings.enabled)
        .onChange(async v => {
          this.plugin.settings.enabled = v;
          await this.plugin.saveSettings();
          v ? this.plugin.startScheduler() : this.plugin.stopScheduler();
        }));

    new obsidian.Setting(containerEl)
      .setName('触发间隔（分钟）')
      .setDesc('每隔 N 分钟自动扫描一次并推送通知（最小 1 分钟，默认 15）')
      .addText(t => t
        .setPlaceholder('15')
        .setValue(String(this.plugin.settings.intervalMinutes))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 1 && n <= 1440) {
            this.plugin.settings.intervalMinutes = n;
            await this.plugin.saveSettings();
            if (this.plugin.settings.enabled) this.plugin.startScheduler();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName('启动时立即触发一次')
      .setDesc('Obsidian 启动 / 插件加载后是否先跑一次扫描，再进入周期循环')
      .addToggle(t => t
        .setValue(this.plugin.settings.triggerOnLoad)
        .onChange(async v => {
          this.plugin.settings.triggerOnLoad = v;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName('提前提醒天数')
      .setDesc('0 = 只看今日到期 / 1 = 今明两天 / 2 = 未来 3 天')
      .addText(t => t
        .setPlaceholder('0')
        .setValue(String(this.plugin.settings.lookAheadDays))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 0 && n <= 30) {
            this.plugin.settings.lookAheadDays = n;
            await this.plugin.saveSettings();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName('点击通知打开的文件')
      .setDesc('点击 SR 通知时在 Obsidian 中打开该文件（默认 DIARY/diary.base）')
      .addText(t => t
        .setPlaceholder('DIARY/diary.base')
        .setValue(this.plugin.settings.baseFile)
        .onChange(async v => {
          this.plugin.settings.baseFile = v.trim();
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName('通知中最多列出的卡片数')
      .setDesc('超过的卡片显示为「… 还有 N 张」')
      .addText(t => t
        .setPlaceholder('5')
        .setValue(String(this.plugin.settings.maxListCount))
        .onChange(async v => {
          const n = parseInt(v);
          if (!isNaN(n) && n >= 1 && n <= 30) {
            this.plugin.settings.maxListCount = n;
            await this.plugin.saveSettings();
          }
        }));

    // ─── 通知通道 ─────────────────────────────────────
    containerEl.createEl('h3', { text: '通知通道' });

    new obsidian.Setting(containerEl)
      .setName('系统桌面通知')
      .setDesc('OB 最小化 / 失焦时也能看到（Windows 任务栏 toast、macOS 通知中心、Linux notify）。点击通知会拉起 OB 窗口并打开复习视图。')
      .addToggle(t => t
        .setValue(this.plugin.settings.desktopNotification !== false)
        .onChange(async v => {
          this.plugin.settings.desktopNotification = v;
          await this.plugin.saveSettings();
          if (v) this.plugin.ensureNotificationPermission();
        }));

    new obsidian.Setting(containerEl)
      .setName('Obsidian 内 Notice')
      .setDesc('在 OB 前台时弹出的浮层通知（详细列出卡片标题与重要度）。建议至少保留一个通道。')
      .addToggle(t => t
        .setValue(this.plugin.settings.inAppNotice !== false)
        .onChange(async v => {
          this.plugin.settings.inAppNotice = v;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName('测试系统通知')
      .setDesc('点这个按钮立刻发一条桌面通知，验证系统是否允许 Obsidian 推送通知。')
      .addButton(b => b
        .setButtonText('发送测试通知')
        .onClick(async () => {
          const ok = await this.plugin.ensureNotificationPermission();
          if (!ok) {
            new obsidian.Notice('❌ 系统未授予通知权限，请到 OS 设置中允许 Obsidian 发送通知', 6000);
            return;
          }
          this.plugin.showDesktopNotification(
            '📚 Claudian SR Notifier 测试通知',
            '如果你看到这条桌面通知，说明系统通道工作正常。',
            () => new obsidian.Notice('✅ 测试通知点击成功', 3000),
          );
        }));

    // ─── 高级：字段名映射 ─────────────────────────────
    const advHeader = containerEl.createEl('details');
    advHeader.style.marginTop = '20px';
    advHeader.createEl('summary', { text: '高级：自定义 frontmatter 字段名' });
    const adv = advHeader.createDiv();
    adv.style.paddingTop = '8px';

    new obsidian.Setting(adv)
      .setName('type 字段名')
      .setDesc('frontmatter 中表示笔记类型的字段（默认 type）')
      .addText(t => t
        .setValue(this.plugin.settings.typeField)
        .onChange(async v => {
          this.plugin.settings.typeField = v.trim() || 'type';
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(adv)
      .setName('Atom 类型值')
      .setDesc('type 字段需要匹配的目标值（默认 diary-atom）')
      .addText(t => t
        .setValue(this.plugin.settings.atomTypeValue)
        .onChange(async v => {
          this.plugin.settings.atomTypeValue = v.trim() || 'diary-atom';
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(adv)
      .setName('next_review 字段名')
      .addText(t => t
        .setValue(this.plugin.settings.nextReviewField)
        .onChange(async v => {
          this.plugin.settings.nextReviewField = v.trim() || 'next_review';
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(adv)
      .setName('archived 字段名')
      .addText(t => t
        .setValue(this.plugin.settings.archivedField)
        .onChange(async v => {
          this.plugin.settings.archivedField = v.trim() || 'archived';
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(adv)
      .setName('importance 字段名')
      .addText(t => t
        .setValue(this.plugin.settings.importanceField)
        .onChange(async v => {
          this.plugin.settings.importanceField = v.trim() || 'importance';
          await this.plugin.saveSettings();
        }));
  }
}

module.exports = ClaudianSrNotifierPlugin;

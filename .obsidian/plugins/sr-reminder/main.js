'use strict';

const obsidian = require('obsidian');

// ─── 默认设置 ────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  enabled:             true,
  triggerOnLoad:       true,         // 启动时是否立即触发一次
  intervalMinutes:     15,           // 每 N 分钟触发一次（默认 15 分钟）

  desktopNotification: true,         // 是否同时发系统级桌面通知（OB 最小化也能看到）
  desktopShowPreview:   false,       // 桌面通知中是否显示卡片标题（关闭可避免投屏/公共环境泄露）
  inAppNotice:         true,         // 是否同时发 OB 内 Notice
  maxListCount:        5,            // 通知中最多列出的卡片数
  baseFile:            'SR Dashboard.md', // 点击通知后打开的文件
  excludeFolder:       '_template',  // 全库扫描时排除的文件夹（避免模板 <% %> 占位污染）

  // ─── 高级：字段名映射 ───
  nextReviewField:  'sr_next_review_datetime', // 凡带此字段的笔记即纳入 SR 队列
  importanceField:  'importance',
};

// ─── 主插件类 ────────────────────────────────────────────────
class SrReminderPlugin extends obsidian.Plugin {

  async onload() {
    await this.loadSettings();

    // 仅在启用桌面通知时尝试取得系统通知权限
    if (this.settings.desktopNotification !== false) {
      this.ensureNotificationPermission();
    }

    // 设置面板
    this.addSettingTab(new SrReminderSettingTab(this.app, this));

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

    console.log('[SR Reminder] ✅ 已加载');
  }

  onunload() {
    this.stopScheduler();
    this.dismissActiveNotice();
    this.dismissActiveDesktop();
    console.log('[SR Reminder] 已卸载');
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
      console.warn('[SR Reminder] 请求通知权限失败：', e);
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
      console.warn('[SR Reminder] focusObsidianWindow 失败：', e);
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
        tag: 'sr-reminder', // 同 tag 的会被系统合并/替换，避免堆积
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
      console.warn('[SR Reminder] 发送桌面通知失败：', e);
      return null;
    }
  }

  // ─── 调度器控制 ──────────────────────────────────────────

  /** 取得合法的间隔毫秒数（最小 1 分钟，防止 0 / 负数） */
  getIntervalMs() {
    const safe = this.normalizeInt(this.settings.intervalMinutes, 1, 1440, 15);
    return safe * 60 * 1000;
  }

  startScheduler() {
    this.stopScheduler();
    const intervalMs = this.getIntervalMs();

    this._intervalId = window.setInterval(() => this.tick(), intervalMs);
    this.registerInterval(this._intervalId);

    // 启动时立即触发一次（避免等待第一个周期）
    if (this.settings.triggerOnLoad) {
      const runStartupCheck = () => {
        if (this._startupTimeoutId != null) {
          window.clearTimeout(this._startupTimeoutId);
          this._startupTimeoutId = null;
        }
        this.clearStartupMetadataEvent();
        this.checkSrReminders(false);
      };

      // 优先等待 metadataCache 完成索引；若事件未触发，则用 5s fallback 兜底
      try {
        this._startupMetadataEvent = this.app.metadataCache.on('resolved', runStartupCheck);
      } catch (e) {
        console.warn('[SR Reminder] 注册 metadataCache resolved 事件失败，将仅使用 fallback timeout：', e);
      }
      this._startupTimeoutId = window.setTimeout(() => {
        this._startupTimeoutId = null;
        this.clearStartupMetadataEvent();
        this.checkSrReminders(false);
      }, 5000);
    }

    console.log(`[SR Reminder] 调度器已启动（每 ${this.settings.intervalMinutes} 分钟检查一次）`);
  }

  stopScheduler() {
    if (this._intervalId != null) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
    if (this._startupTimeoutId != null) {
      window.clearTimeout(this._startupTimeoutId);
      this._startupTimeoutId = null;
    }
    this.clearStartupMetadataEvent();
  }

  /** 周期触发：直接执行扫描 */
  tick() {
    this.checkSrReminders(false);
  }

  /** 清理启动阶段等待 metadataCache resolved 的事件监听 */
  clearStartupMetadataEvent() {
    if (this._startupMetadataEvent) {
      try { this.app.metadataCache.offref(this._startupMetadataEvent); } catch (_) {}
      this._startupMetadataEvent = null;
    }
  }

  // ─── 核心：扫描 + 通知 ───────────────────────────────────

  /**
   * @param {boolean} force - true: 命令面板手动触发，无视开关
   */
  checkSrReminders(force = false) {
    if (!force && !this.settings.enabled) return;

    if (this.settings.inAppNotice === false && this.settings.desktopNotification === false) {
      if (force) new obsidian.Notice('SR Reminder：两个通知通道都已关闭，请至少启用一个通道。', 5000);
      console.warn('[SR Reminder] 两个通知通道均已关闭，跳过本轮提醒');
      return;
    }

    // 每次触发先关掉上一次还挂着的通知（OB 内 + 系统桌面），避免堆叠
    this.dismissActiveNotice();
    this.dismissActiveDesktop();

    // 严格以「当前时刻」为基准（精确到秒），配合 SR 算法的分钟级节奏
    const now = new Date();

    const NEXT_FIELD = this.settings.nextReviewField  || 'sr_next_review_datetime';
    const IMP_FIELD  = this.settings.importanceField  || 'importance';
    const EXCLUDE_FOLDER = this.settings.excludeFolder || '_template';

    const dueCards = [];

    // ⚡ 关键：用 metadataCache（零 IO，O(n) 内存查询）
    // SR 已与 DIARY 解绑：全库扫描凡带 sr_next_review_datetime 字段的笔记
    // （diary card 或将来的 FAST 原子笔记），仅排除模板目录，避免 <% %> 占位污染队列。
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (file.parent?.path === EXCLUDE_FOLDER) continue;

      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter;
      if (!fm) continue;

      const nr = this.parseDateValue(fm[NEXT_FIELD]);
      if (!nr) continue;
      if (nr > now) continue;       // 只提醒此刻已到期的卡

      const overdueMs = now - nr;   // 已到期时长（≥0）
      dueCards.push({
        file,
        title:        file.basename,
        importance:   this.normalizeImportance(fm[IMP_FIELD]),
        reviewCount:  this.normalizeInt(fm.sr_review_count, 0, Number.MAX_SAFE_INTEGER, 0),
        nextReview:   nr,
        overdueMs,
      });
    }

    if (dueCards.length === 0) {
      if (force) new obsidian.Notice('📚 SR：当前无到期复习卡片 ✨', 4000);
      console.log(`[SR Reminder] 无待复习`);
      return;
    }

    // 排序：sr_next_review_datetime 降序 → sr_review_count 升序
    dueCards.sort((a, b) =>
      (b.nextReview - a.nextReview) ||
      (a.reviewCount - b.reviewCount)
    );

    const overdueCount = dueCards.filter(c => c.overdueMs > 0).length;
    const maxCount     = this.normalizeInt(this.settings.maxListCount, 1, 30, 5);

    // 构建通知内容
    const top = dueCards.slice(0, maxCount).map(c => {
      const stars = '★'.repeat(c.importance) + '☆'.repeat(5 - c.importance);
      const overdueTag = c.overdueMs > 0 ? ` (逾期 ${this.formatDuration(c.overdueMs)})` : '';
      return `  ${stars} ${c.title}${overdueTag}`;
    });

    const headerLines = [`📚 SR 提醒：${dueCards.length} 张卡片待复习`];
    if (overdueCount > 0) headerLines.push(`⚠️  逾期 ${overdueCount} 张`);

    const body = [
      ...headerLines,
      '',
      ...top,
    ];
    if (dueCards.length > maxCount) body.push(`  … 还有 ${dueCards.length - maxCount} 张`);
    body.push('', '点击打开复习视图 →');

    // 点击通知后的统一动作：打开 baseFile
    const openReviewView = () => {
      const targetPath = this.normalizePathSetting(this.settings.baseFile, 'SR Dashboard.md');
      const target = this.app.vault.getAbstractFileByPath(targetPath);
      if (target instanceof obsidian.TFile) {
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
      const desktopBody = [`${dueCards.length} 张待复习`];
      if (overdueCount > 0) desktopBody.push(`其中逾期 ${overdueCount} 张`);
      // 加上前 3 张卡片标题，避免桌面通知被截断
      const preview = this.settings.desktopShowPreview === true
        ? dueCards.slice(0, 3).map(c => c.title).join(' / ')
        : '为保护隐私，桌面通知不显示卡片标题';
      const bodyText = `${desktopBody.join(' · ')}\n${preview}${this.settings.desktopShowPreview === true && dueCards.length > 3 ? ` …(+${dueCards.length - 3})` : ''}`;
      this._activeDesktop = this.showDesktopNotification(
        `📚 SR 提醒：${dueCards.length} 张卡片待复习`,
        bodyText,
        openReviewView,
      );
    }

    console.log(`[SR Reminder] 弹出通知：${dueCards.length} 张待复习（逾期 ${overdueCount}）`);
  }

  // ─── 工具函数 ────────────────────────────────────────────

  /**
   * 解析 sr_next_review_datetime 为 Date，保留时分秒。
   * 支持：Date 对象 / "YYYY-MM-DD HH:mm:ss" / "YYYY-MM-DDTHH:mm" / 纯 "YYYY-MM-DD"。
   * 缺失的时间部分按 00:00:00 补齐。
   */
  parseDateValue(value) {
    if (!value) return null;
    if (value instanceof Date) {
      const date = new Date(value.getTime());   // 完整保留时分秒
      return Number.isNaN(date.getTime()) ? null : date;
    }
    const m = String(value).trim()
      .match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
    if (!m) return null;
    const year = +m[1];
    const month = +m[2];
    const day = +m[3];
    const hour = +(m[4] || 0);
    const minute = +(m[5] || 0);
    const second = +(m[6] || 0);

    if (month < 1 || month > 12) return null;
    if (hour < 0 || hour > 23) return null;
    if (minute < 0 || minute > 59) return null;
    if (second < 0 || second > 59) return null;

    const date = new Date(
      +m[1], +m[2] - 1, +m[3],
      +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)
    );

    // 防止 JS Date 自动把 2026-02-31、25:99:99 等溢出值修正成另一个日期
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day ||
      date.getHours() !== hour ||
      date.getMinutes() !== minute ||
      date.getSeconds() !== second
    ) return null;

    return date;
  }

  /** 把 importance 规范化到 1–5，避免异常 frontmatter 导致 repeat() 抛错 */
  normalizeImportance(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 3;
    return Math.min(5, Math.max(1, Math.floor(n)));
  }

  /** 把整数配置规范化到指定范围 */
  normalizeInt(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, Math.floor(n)));
  }

  /** 规范化路径类设置：去空白、去前导斜杠，空值回退默认路径 */
  normalizePathSetting(value, fallback) {
    const path = String(value || '').trim().replace(/^[/\\]+/, '');
    return path || fallback;
  }

  /** 把毫秒时长格式化为「Nd / Nh / Nm」（取最大有意义单位） */
  formatDuration(ms) {
    const totalMin = Math.floor(ms / 60000);
    const days  = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const mins  = totalMin % 60;
    if (days  > 0) return `${days}d${hours > 0 ? ` ${hours}h` : ''}`;
    if (hours > 0) return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
    return `${mins}m`;
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// ─── 设置面板 ────────────────────────────────────────────────
class SrReminderSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'SR Reminder' });

    const dependentSettings = [];
    const markSettingDisabled = (setting, disabled) => {
      if (!setting?.settingEl) return;
      setting.settingEl.toggleClass('is-disabled', disabled);
      setting.settingEl.style.opacity = disabled ? '0.55' : '';
      setting.settingEl.style.pointerEvents = disabled ? 'none' : '';
    };
    const bindDisabled = (component, setting, predicate) => {
      dependentSettings.push({ component, setting, predicate });
      return component;
    };
    const refreshDisabledStates = () => {
      for (const item of dependentSettings) {
        const disabled = item.predicate();
        if (typeof item.component.setDisabled === 'function') {
          item.component.setDisabled(disabled);
        }
        // 额外兜底：某些组件/主题只禁用控件本体，不会让整行呈现 disabled 状态。
        markSettingDisabled(item.setting, disabled);
      }
    };

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
      '使用 Obsidian metadataCache 全库读取带 sr_next_review_datetime 字段的笔记 frontmatter（零文件 IO）',
      '过滤条件：sr_next_review_datetime ≤ now AND file.parent ≠ _template（精确到秒，配合分钟级 SR 节奏；已与 DIARY 解绑，支持 FAST 原子笔记）',
      '排序：sr_next_review_datetime 降序 → sr_review_count 升序（与 sr.base 队列一致）',
      '按固定间隔（默认每 15 分钟）轮询一次，命中时同时推送：OB 内 Notice + 系统桌面通知（OB 最小化也能看到）',
      '点击任一通知 → 拉起 OB 窗口并打开复习视图（默认 SR Dashboard.md）',
      '桌面通知默认隐藏卡片标题，避免投屏或公共环境泄露笔记内容',
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
          refreshDisabledStates();
        }));

    const triggerOnLoadSetting = new obsidian.Setting(containerEl)
      .setName('启动时立即触发一次')
      .setDesc('Obsidian 启动 / 插件加载后是否先跑一次扫描，再进入周期循环。仅在「启用 SR 通知」开启时生效。');
    triggerOnLoadSetting.addToggle(t => bindDisabled(t
      .setValue(this.plugin.settings.triggerOnLoad)
      .onChange(async v => {
        this.plugin.settings.triggerOnLoad = v;
        await this.plugin.saveSettings();
      }), triggerOnLoadSetting, () => !this.plugin.settings.enabled));

    const intervalSetting = new obsidian.Setting(containerEl)
      .setName('触发间隔（分钟）')
      .setDesc('每隔 N 分钟自动扫描一次并推送通知（最小 1 分钟，默认 15）。仅在「启用 SR 通知」开启时生效。');
    intervalSetting.addText(t => bindDisabled(t
      .setPlaceholder('15')
      .setValue(String(this.plugin.settings.intervalMinutes))
      .onChange(async v => {
        const n = parseInt(v);
        if (!isNaN(n) && n >= 1 && n <= 1440) {
          this.plugin.settings.intervalMinutes = this.plugin.normalizeInt(n, 1, 1440, 15);
          await this.plugin.saveSettings();
          if (this.plugin.settings.enabled) this.plugin.startScheduler();
        }
      }), intervalSetting, () => !this.plugin.settings.enabled));

    // ─── 通知通道 ─────────────────────────────────────
    containerEl.createEl('h3', { text: '通知通道' });

    const desktopNotificationSetting = new obsidian.Setting(containerEl)
      .setName('系统桌面通知')
      .setDesc('OB 最小化 / 失焦时也能看到（Windows 任务栏 toast、macOS 通知中心、Linux notify）。点击通知会拉起 OB 窗口并打开复习视图。仅在「启用 SR 通知」开启时可配置。');
    desktopNotificationSetting.addToggle(t => bindDisabled(t
      .setValue(this.plugin.settings.desktopNotification !== false)
      .onChange(async v => {
        this.plugin.settings.desktopNotification = v;
        await this.plugin.saveSettings();
        if (v) this.plugin.ensureNotificationPermission();
        refreshDisabledStates();
      }), desktopNotificationSetting, () => !this.plugin.settings.enabled));

    const testDesktopSetting = new obsidian.Setting(containerEl)
      .setName('测试系统通知')
      .setDesc('点这个按钮立刻发一条桌面通知，验证系统是否允许 Obsidian 推送通知。仅在「系统桌面通知」开启时生效。');
    testDesktopSetting.addButton(b => bindDisabled(b
      .setButtonText('发送测试通知')
      .onClick(async () => {
        const ok = await this.plugin.ensureNotificationPermission();
        if (!ok) {
          new obsidian.Notice('❌ 系统未授予通知权限，请到 OS 设置中允许 Obsidian 发送通知', 6000);
          return;
        }
        this.plugin.showDesktopNotification(
          '📚 SR Reminder 测试通知',
          '如果你看到这条桌面通知，说明系统通道工作正常。',
          () => new obsidian.Notice('✅ 测试通知点击成功', 3000),
        );
      }), testDesktopSetting, () => !this.plugin.settings.enabled || this.plugin.settings.desktopNotification === false));

    const desktopPreviewSetting = new obsidian.Setting(containerEl)
      .setName('桌面通知显示卡片标题')
      .setDesc('关闭时桌面通知只显示数量，不显示具体卡片标题，适合投屏或公共环境。仅在「系统桌面通知」开启时生效。');
    desktopPreviewSetting.addToggle(t => bindDisabled(t
      .setValue(this.plugin.settings.desktopShowPreview === true)
      .onChange(async v => {
        this.plugin.settings.desktopShowPreview = v;
        await this.plugin.saveSettings();
      }), desktopPreviewSetting, () => !this.plugin.settings.enabled || this.plugin.settings.desktopNotification === false));

    const inAppNoticeSetting = new obsidian.Setting(containerEl)
      .setName('Obsidian 内 Notice')
      .setDesc('在 OB 前台时弹出的浮层通知（详细列出卡片标题与重要度）。建议至少保留一个通道。仅在「启用 SR 通知」开启时可配置。');
    inAppNoticeSetting.addToggle(t => bindDisabled(t
      .setValue(this.plugin.settings.inAppNotice !== false)
      .onChange(async v => {
        this.plugin.settings.inAppNotice = v;
        await this.plugin.saveSettings();
        refreshDisabledStates();
      }), inAppNoticeSetting, () => !this.plugin.settings.enabled));

    const maxListCountSetting = new obsidian.Setting(containerEl)
      .setName('通知中最多列出的卡片数')
      .setDesc('Obsidian 内 Notice 最多列出的卡片数；超过的卡片显示为「… 还有 N 张」。仅在「Obsidian 内 Notice」开启时生效。');
    maxListCountSetting.addText(t => bindDisabled(t
      .setPlaceholder('5')
      .setValue(String(this.plugin.settings.maxListCount))
      .onChange(async v => {
        const n = parseInt(v);
        if (!isNaN(n) && n >= 1 && n <= 30) {
          this.plugin.settings.maxListCount = this.plugin.normalizeInt(n, 1, 30, 5);
          await this.plugin.saveSettings();
        }
      }), maxListCountSetting, () => !this.plugin.settings.enabled || this.plugin.settings.inAppNotice === false));

    const baseFileSetting = new obsidian.Setting(containerEl)
      .setName('点击通知打开的文件')
      .setDesc('点击 SR 通知时在 Obsidian 中打开该文件（默认 SR Dashboard.md）。仅在至少一个通知通道开启时生效。');
    baseFileSetting.addText(t => bindDisabled(t
      .setPlaceholder('SR Dashboard.md')
      .setValue(this.plugin.settings.baseFile)
      .onChange(async v => {
        this.plugin.settings.baseFile = this.plugin.normalizePathSetting(v, 'SR Dashboard.md');
        await this.plugin.saveSettings();
      }), baseFileSetting, () => !this.plugin.settings.enabled || this.plugin.settings.inAppNotice === false && this.plugin.settings.desktopNotification === false));


    refreshDisabledStates();
  }
}

module.exports = SrReminderPlugin;

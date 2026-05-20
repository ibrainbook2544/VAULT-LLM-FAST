<div align="center">

# LLM-FAST

**AI 辅助的 Obsidian 知识库** · Karpathy LLM Wiki × FAST 分子笔记本

[![Obsidian](https://img.shields.io/badge/Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?logo=anthropic&logoColor=white)](https://claude.ai/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ibrainbook2544/VAULT-LLM-FAST)](https://github.com/ibrainbook2544/VAULT-LLM-FAST/commits/main)

[English](README.md) · **简体中文**

</div>

---

> 用 AI 接管知识管理的机械簿记（80%），让人专注于判断和创作（20%）。

LLM-FAST 是一个 Obsidian 仓库，融合了 [Andrej Karpathy 的 LLM Wiki 范式](https://karpathy.github.io/) 与自创的 **FAST 分子笔记本**方法论。它把 AI 助手（Claudian）当作"知识编译器"——摄取原始资料、生成结构化 wiki、维护索引与交叉链接——而人类只负责高价值的判断（读什么、留什么、怎么链接）。

## 为什么不是纯 LLM Wiki

我的另一个仓库 [llm-wiki-skills](https://github.com/ibrainbook2544/llm-wiki-skills) 比较严格地复刻了 Karpathy 的 `LLM-Wiki`。用了一段时间后暴露出两个核心问题，本仓库正是针对它们做的改进：

1. **扁平结构 vs 层次结构。** 纯 LLM Wiki 的笔记是完全扁平的——新增笔记时确实"不用纠结分类位置"，但也丧失了把知识挂到知识树上的机会，无法一眼看出它在整个体系中的位置和与其他知识的关系。
   → **LLM-FAST 的解法**：用 `FAST-<主题>` 把高度相关的知识封装成"分子"，再把分子挂到目录树的树干上（如 `OPC/学/FAST-LLM-Wiki`）。**分子之内**仍保持 Karpathy 式的扁平 `[[wikilink]]`（符合 ZettelKasten），**分子之间**靠目录树提供层次定位。两全其美。

2. **只关心知识本身，不关心知识的使用者——人的记忆。** 传统 LLM Wiki 默认知识写下来就"在那了"，但人会遗忘、会懒惰。一个不被复习的知识库，本质是一座只进不出的坟场。
   → **LLM-FAST 的解法1**：引入 **DIARY 原子卡 + 艾宾浩斯间隔复习（SR）**，让值得长期保留的念头进入遗忘曲线复习队列，并配合`提醒插件（SR Reminder）`主动把卡片推到你面前。
3.  → **LLM-FAST 的解法2**：引入AI提醒你。借助`OB Reminder`插件把要做的事情、要留意的知识内容或事务，定期展示在你面前。

简言之，本仓库在 Karpathy LLM Wiki 之上，补齐了 **Tiago Forte CODE（Capture→Organize→Distill→Express）** 与 **Zettelkasten（Fleeting→Literature→Permanent）** 所强调的、被纯 LLM Wiki 忽略的两件事：**知识的结构定位** 与 **使用者的记忆过程**。

---

## 目录

- [特性](#特性)
- [核心理念](#核心理念)
- [四层知识流转](#四层知识流转)
- [目录结构](#目录结构)
- [当前-fast-子库](#当前-fast-子库)
- [系统构成](#系统构成)
  - [Obsidian 插件](#obsidian-插件)
  - [自定义插件：Shell-Reminder--SR-Reminder](#自定义插件shell-reminder--sr-reminder)
  - [脚本与模板](#脚本与模板)
- [间隔复习（SR）](#间隔复习sr)
- [前置要求](#前置要求)
- [安装](#安装)
- [常用命令](#常用命令)
- [最佳实践](#最佳实践)
- [AI 助手（Claudian）](#ai-助手claudian)
- [路线图](#路线图)
- [贡献](#贡献)
- [致谢](#致谢)
- [许可证](#许可证)

---

## 特性

- 🧠 **AI 编译器范式** — Claudian 自动摄取 → 拆解 → 索引 → 维护，人类只做判断
- 📦 **FAST 分子封装** — 每个主题独立成"分子"，可单独打开、组合、出售
- 🌲 **层次 + 扁平双轨** — 分子之间用目录树定位，分子之内用扁平 `[[wikilink]]`
- 🃏 **遗忘曲线复习** — DIARY 原子卡基于"当日巩固 + 跨日 `2^N` 推进"双层 SR 调度
- ⏰ **主动提醒** — 自研 SR Reminder / Shell Reminder 插件，到点桌面通知 + 定时跑脚本
- 📋 **任务追踪** — TASK 用 [Obsidian Bases](https://obsidian.md/bases) 构建看板视图
- 🩺 **健康检查** — `lint` / `/diary-lint` / `/todo-lint` 检测死链、矛盾、孤儿、schema 违规
- 📊 **Dataview / Bases 仪表板** — 浏览统计、冷门高价值笔记、复习队列一目了然

---

## 核心理念

| 原则 | 说明 |
|------|------|
| **一卡一概念** | FAST 的 wiki 卡片、DIARY 的原子卡都遵守"一张卡只讲一件事"，便于复用与重组 |
| **AI 管簿记，人管判断** | 摄取、拆分、索引、交叉链接交给 AI；读什么、留什么、怎么挂载由人决定 |
| **新知识权重高于旧知识** | LLM Wiki 不适合频繁更新；合成时以新覆旧、去重去矛盾 |
| **随机游走** | 复习时引入 `重要程度`、`浏览次数` 作为筛选权重——浏览越少、越重要的卡片越优先被推送 |

---

## 四层知识流转

```
浏览 / 剪藏 ──→ INBOX/          原料层：随手记，不纠结分类，晚上清空
                  │
日常闪念   ──→ DIARY/            过程层：流水账(diary-log) + 原子卡(diary-atom)
                  │                       原子卡进入 SR 间隔复习队列
                  │  复习中发现值得长期保留 → 拆成原子卡并最终晋升
                  ▼
              OPC/<...>/FAST-<主题>/      知识层：编译为 LLM Wiki
                  ├── raw/        原文留存（只读）
                  └── wiki/       sources → concepts/entities → synthesis

并行：工程性待办 ──→ TASK/        任务层：优先级 + 截止日期，看板推进（非遗忘曲线）
```

四层各司其职：**INBOX 落得快、DIARY 防遗忘、FAST 沉淀知识、TASK 推进交付**。
DIARY 用遗忘曲线管理"要记住的东西"，TASK 用优先级管理"要做完的事"，两者刻意分离。

---

## 目录结构

```
LLM-FAST/
├── OPC/                  # 知识存储库（FAST 子库聚合）
│   ├── AI/AI工具/Claude/
│   │   └── FAST-CLAUDE/  # Claude AI 深度研究
│   └── 学/
│       ├── FAST-FAST/    # FAST 方法论本身
│       └── FAST-LLM-Wiki/ # Karpathy LLM Wiki 范式
├── INBOX/                # 原料层
│   ├── Clippings/        # 网页剪藏（OB Web Clipper）
│   └── Inbox.md          # 临时落脚点
├── TASK/                 # 任务看板（task.base）
├── DIARY/                # 过程层
│   ├── diary.base        # 日记综合视图
│   └── sr.base           # SR 待复习队列
├── _template/            # 笔记模板（Task / Diary Log / Diary Atom）
├── _scripts/             # 脚本（sr-evaluate.js / diary-lint / demo.ps1 …）
├── _attachment/          # 全局附件
├── logs/                 # 插件与健康检查日志
├── index.md              # 总索引
├── AGENTS.md             # AI 助手行为规范（宪法）
├── CLAUDE.md             # @AGENTS.md（AI 上下文入口）
├── README.md             # 英文说明（默认入口）
└── README.zh-CN.md       # 本文件
```

> 每个 `FAST-*` 子目录都是一个完整的 LLM Wiki，可作为独立 Obsidian 仓库单独打开。

### 当前 FAST 子库

| FAST | 主题 | 状态 | 入口 |
|------|------|------|------|
| **FAST-FAST** | FAST 方法论定义与说明 | 🟢 活跃 | [`OPC/学/FAST-FAST/wiki/index.md`](OPC/学/FAST-FAST/wiki/index.md) |
| **FAST-LLM-Wiki** | LLM Wiki 范式研究（Karpathy 方法论） | 🟢 活跃 | [`OPC/学/FAST-LLM-Wiki/wiki/index.md`](OPC/学/FAST-LLM-Wiki/wiki/index.md) |
| **FAST-CLAUDE** | Claude AI 深度研究 | 🟢 活跃 | [`OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md`](OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md) |

---

## 系统构成

整套系统由三类组件协作：**AI Agent**（编译知识）、**Obsidian 插件**（提醒与自动化）、**脚本与模板**（算法落地）。

### AI Agent

- **Claude Code（Claudian）** — 主力知识编译器，行为规范见 [`AGENTS.md`](AGENTS.md)
- **Codex** — 备用 Agent

### Obsidian 插件

| 插件 | 用途 |
|------|------|
| **Dataview** | 索引页查询、统计、动态视图 |
| **Templater** | 笔记模板填充；启动脚本注册 `file-open` 钩子，打开笔记自动 `views +1` |
| **QuickAdd** | 快速新建 atom / task（如 New Diary Atom，套用 Diary Atom 模板） |
| **Obsidian Git** | 自动备份提交到 GitHub |
| **Update Time on Edit** | 自动维护 `updated` 字段 |
| **Calendar** | 按日期打开 / 新建 diary-log |
| **SR Reminder** ⭐ | 自研：到点推送 SR 待复习通知（见下） |
| **Shell Reminder** ⭐ | 自研：在笔记任务里定时执行 Shell 脚本（见下） |
| **Reminder**（社区版） | 扫描 `(@日期)` 内联语法，弹日程提醒——用于"别忘了做某事"，与 SR 互补 |

> ⚠️ **Obsidian Tasks 目前未启用**——任务管理改用 `task.base`（Bases）。

### 自定义插件：Shell Reminder & SR Reminder

这两个是本仓库自研的桌面端插件（`isDesktopOnly`），把"提醒"和"自动化"留在 Obsidian 内部，不依赖外部 cron。

#### 🐚 Shell Reminder（`sh-reminder`）

> 在笔记任务中定时执行 Shell 脚本，实现 Obsidian 内的自动化调度。

**任务语法**（写在任意 `.md` 笔记里）：

```markdown
- [ ] 任务描述 (@时间) [shell: 命令或脚本路径]
```

| 能力 | 说明 |
|------|------|
| **每日重复** | `(@HH:mm)`，每天到点都执行 |
| **一次性** | `(@YYYY-MM-DD HH:mm)`，执行后自动把 `- [ ]` 勾成 `- [x]` |
| **缩进 / 嵌套** | 行首空白被忽略，子任务照样触发 |
| **直接写命令** | 后缀无法识别时按命令执行，如 `[shell: powershell -Command "..."]` |
| **代码块豁免** | 围栏代码块内的任务行不会被误执行（便于文档示例） |
| **状态栏** | 常驻显示"下一个任务"倒计时，点击立即检查 |
| **日志** | 执行结果写入 `logs/sh-reminder.log`，超时（默认 300s）自动终止 |
| **防重** | 同一分钟内同一任务只执行一次 |

演示见 [`INBOX/Inbox.md`](INBOX/Inbox.md) 的「Shell Reminder 用法演示」一节，示例脚本 [`_scripts/demo.ps1`](_scripts/demo.ps1)。

#### 🧠 SR Reminder（`sr-reminder`）

> 基于 Obsidian metadataCache 的间隔复习提醒器，**零文件 IO**，性能恒定，上万张卡片亦在 ~100ms 内扫完。

| 维度 | 行为 |
|------|------|
| **扫描范围** | 仅 `DIARY/` 根目录下 `type: diary-atom` 的文件（避免模板 / logs / 其他 FAST 污染） |
| **到期判定** | `sr_next_review_datetime ≤ now`（精确到秒，配合分钟级 SR 节奏） |
| **排序** | `sr_next_review_datetime` 降序 → `sr_review_count` 升序（与 `sr.base` 队列一致） |
| **轮询** | 默认每 15 分钟一次，启动时立即先跑一次 |
| **双通道通知** | OB 内 Notice（前台，列出卡片标题 + 重要度星级）+ 系统桌面通知（OB 最小化也能看到） |
| **隐私** | 桌面通知默认**不显示**卡片标题，适合投屏 / 公共环境 |
| **点击动作** | 拉起 OB 窗口并打开复习视图（默认 [`DIARY/sr.base`](DIARY/sr.base)） |

> Shell Reminder 是"通用定时器"，SR Reminder 是"专为 diary-atom 优化的复习闹钟"——前者跑脚本，后者推卡片。

### 脚本与模板

**脚本（`_scripts/`）**

| 文件 | 用途 |
|------|------|
| [`sr-evaluate.js`](_scripts/sr-evaluate.js) | SR 评估核心：被 Diary Atom 模板里的按钮调用，写回 frontmatter 并跳到下一张 |
| `diary-lint.{js,ps1,py}` | DIARY 健康检查（多语言实现） |
| `demo.ps1` | Shell Reminder 演示脚本 |

**模板（`_template/`）**

| 模板 | 用途 |
|------|------|
| **Diary Log Template** | 当天容器日志（流水账，不复习） |
| **Diary Atom Template** | QuickAdd「New Diary Atom」套用；内含 SR frontmatter + SR 评估按钮 |
| **Task Template** | 新建 task |
| `templater-startup-template-view-counter` | Templater 启动脚本，打开笔记时自动 `views +1` |

---

## 间隔复习（SR）

> 权威定义见 [`INBOX/SR算法.md`](INBOX/SR算法.md)；核心实现 [`_scripts/sr-evaluate.js`](_scripts/sr-evaluate.js)；数据库 [`DIARY/sr.base`](DIARY/sr.base)。
> SR **只针对 `diary-atom`**，不依赖任何第三方 SR 插件计算，全靠 frontmatter 字段 + 评估按钮驱动。

### 数据模型

```yaml
---
type: diary-atom
subtype: 灵感               # 灵感 | 反思 | 教训 | 金句 | 文摘
importance: 3              # 1–5
sr_review_count: 0         # 跨日推进次数（仅按钮 5 累加）
sr_next_review_datetime: 2026-05-20 08:00:00
views: 0                   # 浏览次数（Templater 自动维护）
---
```

### 双层算法（2026-05-19 v2）

核心是把"今天反复看"和"跨天推进"分开——这正是把"知识"和"使用者的记忆"对齐的关键设计。

**按钮 1–4 · 本轮未完成，当日内反复巩固**（`sr_review_count` 不变）

```
next = now + 15min × 2^(rating − 1)
```

| 按钮 | 含义 | 增量 |
|------|------|------|
| 1 忘记 | 完全没印象 | +15 min |
| 2 模糊 | 有点印象 | +30 min |
| 3 还行 | 大致记得 | +60 min |
| 4 牢记 | 记得很牢 | +120 min |

**按钮 5 · 本轮完成，跨日推进**（`sr_review_count += 1`）

```
base = max(sr_next_review_datetime, now)   ← 钳制到未来，避免逾期堆积
next = base + 24h × 2^sr_review_count
```

间隔阶梯（按钮 5 第 N 次点击）：**1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 …** 天

### 复习闭环

```
SR Reminder（每 15 分钟扫描）
   → 到期则桌面 / OB 通知 → 点击打开 DIARY/sr.base 队列
       → 打开队首卡片 → 阅读回顾 → 点击 SR 评估按钮（1–5）
           → sr-evaluate.js 立即写回 frontmatter
               → 自动跳到队列下一张；队列清空则关闭页面
```

> ⚠️ **历史教训（2026-05-15）**：曾发生"对话里报了新数值却没写入文件"的事故，导致下次复习时所有卡片仍是初始值。
> **评分必须立即落盘**——上一张未写入前，绝不进入下一张。这条铁律同时硬编码在按钮脚本和 Claudian 的行为规范里。

---

## 前置要求

| 工具 | 版本 | 用途 |
|------|------|------|
| [Obsidian](https://obsidian.md/) | ≥ 1.7 | 知识库主体（Bases 需较新版本） |
| [Git](https://git-scm.com/) | ≥ 2.30 | 版本控制 |
| [Claude Code](https://claude.ai/claude-code) | 最新 | AI 编译与维护（可选但强烈推荐） |
| PowerShell / Node | — | Shell Reminder 执行脚本（桌面端） |

---

## 安装

```bash
# 1. 克隆仓库
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. 用 Obsidian 打开
#    File → Open vault → 选择 LLM-FAST 目录

# 3. 启用插件
#    社区插件在 Settings → Community plugins 安装；
#    自研插件（sh-reminder / sr-reminder）已随仓库放在 .obsidian/plugins/，启用即可

# 4. （可选）在仓库根目录启动 Claude Code
claude
```

打开后，从 [`index.md`](index.md) 开始浏览，或直接打开 [`DIARY/sr.base`](DIARY/sr.base) 查看今日复习队列。

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `ingest [文件]` | 摄取某 FAST 的 `raw/` 中新来源，生成 sources / concepts / entities 页面 |
| `query <主题>` | 基于 wiki 综合回答，可保存为 output |
| `lint` | FAST 健康检查：死链、矛盾、孤儿文件，结果写入 `logs/` |
| `/diary-lint` | DIARY 健康检查：SR 字段、schema、命名、Base 配置（只报告，不自动改） |
| `/todo-lint` | TASK 健康检查：逾期堆积、停滞、死链、循环依赖（只报告，不自动改） |
| `/llm-wiki-init` | 在某目录初始化一个新的 FAST 子库结构 |

---

## 最佳实践

### 念头 → 知识的完整路径

```
随手记到 INBOX           （不纠结分类，落地优先；晚上整理清空）
   │
整理进 DIARY 当天 log，或直接拆成原子卡 atom
   │
进入 SR 复习队列，靠 SR Reminder 主动推送、随机游走回顾
   │
复习中确认"值得长期保留" → 晋升挂载到某 FAST 的 wiki 卡片
   │
原文留 FAST/raw/，原 atom 转为 stub（保留历史索引）
```

### 挂载一个新 FAST

```bash
cd OPC/<领域路径>          # 如 OPC/学
/llm-wiki-init             # 初始化 FAST-<主题>/ 标准结构
# 把 INBOX 中相关主题的剪藏移动到 FAST-<主题>/raw/
ingest                     # Claudian 摄取并编译为 wiki
```

### 输入习惯

- **随手记（INBOX）**：随时记录，不花时间想怎么存；晚上整理后清空。
- **剪藏**：配合 Chrome 扩展 **Obsidian Web Clipper** 落到 `INBOX/Clippings/`。
- **手机同步**：OB Sync（付费）或 Syncthing（免费）。
- **高亮转卡片**：编辑器里选中文字 → QuickAdd「New Diary Atom」，Templater 用 `tp.file.selection()` 直接抓取高亮内容，比剪贴板更精准。

### SR vs Remind 的区别

|  | **SR（间隔复习）** | **Remind（日程提醒）** |
|--|--|--|
| 驱动 | SR Reminder 主动推送 + 你点评估按钮 | Reminder 插件被动推送 |
| 机制 | `sr_next_review_datetime ≤ now` | 扫描 `(@YYYY-MM-DD)` 内联语法 |
| 目的 | 认知强化，对抗遗忘曲线 | 日程提醒，别忘了做某事 |
| 更新状态 | 是（写回 frontmatter） | 否（只弹窗） |
| 适用 | `diary-atom` 知识卡片 | 任务、待办、约会 |

> 两者可协作：一张 atom 既进 SR 队列，也可在正文写一行 `- [ ] 复习此卡 (@2026-05-17)` 让 Reminder 到期弹窗——**插件负责推送、Claudian/按钮负责计算**。

---

## AI 助手（Claudian）

本库由 [Claude Code](https://claude.ai/claude-code) 作为"知识编译器"维护。完整的行为规范、命名规则、frontmatter schema、复习算法、健康检查项见 [`AGENTS.md`](AGENTS.md)。

**关键约束**：

- ❌ 不修改 `raw/` 中的原始文件
- ❌ 不删除已有 wiki 页面（只追加 / 更新）
- ❌ `lint` / `/diary-lint` / `/todo-lint` 只报告，不自动修复
- ✅ SR 评分后**立即**写回 frontmatter，不允许批量延后

### Frontmatter 规范（Bases / Dataview / LLM 三方共用）

FAST wiki 与 INBOX：

```yaml
---
title:
type: source | concept | entity | synthesis | output | index | inbox
origin: self-written | agent-compiled
created: YYYY-MM-DD
tags: []
sources: []   # wikilinks，来源文件引用
summary: 一句话摘要
---
```

DIARY 使用 `diary-log` / `diary-atom` 双层模型（schema 见上方「间隔复习」与 [`AGENTS.md`](AGENTS.md) §5），TASK 使用 `type: task`（见 [`AGENTS.md`](AGENTS.md) §6）。

---

## 路线图

来源：[`AGENTS.md`](AGENTS.md) §8「待确认事项」

- [ ] `SCHEMA.md` — 为每个 FAST 单独制定编译规则文件
- [ ] `log.md` — 追加式操作日志
- [ ] **HTML 展示层** — `outputs/` 生成可交互 HTML 报告
- [ ] **晋升触发器** — INBOX → FAST 的自动 / 半自动建议（可由 Shell Reminder 定时扫描触发）

---

## 贡献

本库为个人知识库，原则上不接受外部 PR。但欢迎：

- 提 Issue 讨论 FAST 方法论
- Fork 后基于本结构搭建自己的 LLM-FAST
- 用 [`llm-wiki-init`](skill://llm-wiki-init) skill 在自己的 Obsidian 仓库初始化同款结构

## 致谢

- [Andrej Karpathy](https://karpathy.github.io/) — LLM Wiki 范式启发
- [Anthropic Claude](https://www.anthropic.com/) — Claudian 的能力来源
- [Obsidian](https://obsidian.md/) — 优秀的本地优先知识库工具
- [王树义老师](https://www.bilibili.com/) — 中文 LLM Wiki 实践方法论
- 程序员老李、Tarek Sherif、Lex Fridman — 多篇相关讨论与综述

## 许可证

本仓库的**结构、模板、插件与 AI 行为规范**（AGENTS.md / CLAUDE.md / `_template/` / `_scripts/` / `.obsidian/plugins/{sh,sr}-reminder/` / `*.base`）采用 [MIT License](LICENSE)。

**笔记正文**（`OPC/`、`DIARY/`、`INBOX/`）为个人知识，未授予复制 / 再分发许可——如需引用请联系作者。

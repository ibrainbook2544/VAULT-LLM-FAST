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

我的另一个仓库 [llm-wiki-skills](https://github.com/ibrainbook2544/llm-wiki-skills) 实现了比较严格遵循了 [Andrej Karpathy 的 LLM Wiki 范式](https://karpathy.github.io/) 的 `LLM-Wiki`。但使用了一段时间后发现了几个严重的问题：？？？

本仓库在以上基础上，结合了实际学习中的痛点。传统LLM只注重知识本身、却不注重知识的使用者--**人**的认知和记忆过程！！！
比如传统LLM太扁平、没有清晰的目录结构，
1. 扁平结构 vs 层次结构
新增笔记时**不用纠结分类位置**，但丧失了一次知识树挂载的机会！不知道在整个知识体系的位置和相互关系。
2. 记忆曲线

？？？？？来历：与传统LLM的区别
**Tiago Forte 的 CODE**（Capture-Organize-Distill-Express）或 **Zettelkasten 的 Fleeting → Literature → Permanent**


---
## 目录

- [特性](#特性)
- [前置要求](#前置要求)
- [快速开始](#快速开始)
- [使用](#使用)
- [目录结构](#目录结构)
- [当前 FAST 子库](#当前-fast-子库)
- [配置](#配置)
- [AI 助手（Claudian）](#ai-助手claudian)
- [路线图](#路线图)
- [贡献](#贡献)
- [致谢](#致谢)
- [许可证](#许可证)

---
## 特性

- 🧠 **AI 编译器范式** — Claudian 自动摄取 → 拆解 → 索引 → 维护，人类只做判断
- 📦 **FAST 分子封装** — 每个主题独立成"分子"，可单独打开、组合、出售
- 🃏 **遗忘曲线复习** — DIARY 原子卡基于 `2^N` 间隔自动调度
- 📋 **任务追踪** — TASK 用 [Obsidian Bases](https://obsidian.md/bases) 构建看板视图
- 🔗 **扁平 ZettelKasten 链接** — `[[wikilink]]` 不含路径，跨 FAST 自由跳转
- 🩺 **健康检查** — `lint` 命令检测死链、矛盾、孤儿文件、schema 违规
- 📊 **Dataview 仪表板** — 浏览统计、冷门笔记、本周访问一目了然

从 INBOX 晋升到 FAST、何时该归档
FAST 里的 wiki 卡片、日记的Atom记忆复习卡片要遵守「一卡一概念」

---

## 系统构成

AI Agent
- Codex、CLAUDE

本库由 [Claude Code](https://claude.ai/claude-code) 作为"知识编译器"维护。完整的行为规范、命名规则、frontmatter schema、复习算法、健康检查项见 [`AGENTS.md`](AGENTS.md)。

**关键约束**：
- ❌ 不修改 `raw/` 中的原始文件
- ❌ 不删除已有 wiki 页面（只追加/更新）
- ❌ `lint` 命令只报告，不自动修复
- ✅ `/diary-review` 每张卡评分后**立即**写入 frontmatter，不允许批量延后



Skills：
- `skill-creator`
- `obsidian-cli`、`obsidian-markdown`、`obsidian-bases`
- llm-wiki-init、llm-wiki-XXX
- llm-fast-XXX？？？？？？？

脚本：
- 日志（logs）

OB插件：
- Git
- Dataview
- Update time on edit
- Reminder
- Claudian：Codex、CLAUDE
- 日记
- QuickAdd
- Templater


| 插件                      | 用途                |
| ----------------------- | ----------------- |
| **Dataview**            | 索引页查询、统计、动态视图     |
| **Templater**           | 笔记模板填充            |
| **QuickAdd**            | 快速新建 atom / task  |
| **Obsidian Git**        | 自动备份提交到 GitHub    |
| **Reminder**            | atom 卡复习提醒        |
| **Update Time on Edit** | 自动维护 `updated` 字段 |
| **Obsidian Tasks**      | TASK 任务管理（目前未使用！） |



OB模板：
- templater-startup-template-view-counter：Templater的启动脚本模板
- Diary Log Template：日记的模板
- Diary Atom Template：QuickAdd的choice（New Diary Atom）的模板

OB的配置：
- \_template
- ？？？？？？？？？？？？？



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
│   ├── Clippings/        # 网页剪藏
│   └── Inbox.md          # 临时落脚点
├── TASK/                 # 任务看板（task.base）
├── DIARY/                # 过程层
│   └── diary.base        # 日记 + 间隔复习视图
├── _template/            # 笔记模板（Task / Diary Log / Diary Atom）
├── _attachment/          # 全局附件
├── index.md              # 总索引
├── dashboard.md          # 统计仪表板
├── AGENTS.md             # AI 助手行为规范（宪法）
├── CLAUDE.md             # @AGENTS.md（AI 上下文入口）
└── README.md             # 英文说明（默认入口）
```

> 每个 `FAST-*` 子目录都是一个完整的 LLM Wiki，可作为独立 Obsidian 仓库单独打开。

### 当前 FAST 子库

| FAST | 主题 | 状态 | 入口 |
|------|------|------|------|
| **FAST-FAST** | FAST 方法论定义与说明 | 🟢 活跃 | [`OPC/学/FAST-FAST/wiki/index.md`](OPC/学/FAST-FAST/wiki/index.md) |
| **FAST-LLM-Wiki** | LLM Wiki 范式研究（Karpathy 方法论） | 🟢 活跃 | [`OPC/学/FAST-LLM-Wiki/wiki/index.md`](OPC/学/FAST-LLM-Wiki/wiki/index.md) |
| **FAST-CLAUDE** | Claude AI 深度研究 | 🟢 活跃 | [`OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md`](OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md) |

## Frontmatter（给 Bases / Dataview / LLM 三方共用）

```yaml
---
title: 
aliases: []
created: 2026-05-13
updated: 2026-05-13
type: wiki        # inbox | diary | wiki | raw | moc
tags: []
source: []        # 来源链接或 [[原始剪藏]]
status: draft     # draft | live | archived
related: []       # [[其他卡片]]
---
```
有了这些字段，后面 Bases / Dataview 视图、自动整理脚本、LLM 过滤都不用改结构。


---
## 主要功能


随手记（Inbox）：
- 原则：随时记录（不必花费时间考虑如何存放等）、晚上整理后保持清空
- 剪藏：配合Chrome扩展（OB Web Clipper）
- 手机同步：使用OB Sync（付费）、或免费同步工具（如Syncthing）
- 

任务及待办事项（Task、Todo）：

日记（Diary）：
- 结合了艾宾浩斯遗忘曲线间隔记忆法
- 

知识领域全栈树（FAST）：（详细请看` FAST-FAST`）
- 多个FAST挂载到目录结构的树干上（如OPC -> 学 -> FAST-LLM-Wiki）
- 每个FAST（文件夹名称以`FAST-`开头）按照6+1维度组织某个知识领域的知识网（FAST-LLM-Wiki）
- `随机游走`原理：加入了`重要程度`、`浏览次数`等属性，提供筛选条件作为进一步参考。`浏览次数`越低、`重要程度`越高，则被选中的概率就越高




---

## 常用命令

| 命令 | 说明 |
|------|------|
| `ingest [文件]` | 摄取 `raw/` 中的新来源，生成 sources / concepts / entities 页面 |
| `query <主题>` | 基于 wiki 综合回答，可保存为 output |
| `lint` | 健康检查：死链、矛盾、孤儿文件，结果写入 `logs/` |
| `/diary-review` | 间隔复习流程：逐张呈现卡片，即时写入 frontmatter |
| `/todo-lint` | 任务库健康检查 |


---

## 前置要求

| 工具 | 版本 | 用途 |
|------|------|------|
| [Obsidian](https://obsidian.md/) | ≥ 1.7 | 知识库主体 |
| [Git](https://git-scm.com/) | ≥ 2.30 | 版本控制 |
| [Claude Code](https://claude.ai/claude-code) | 最新 | AI 编译与维护（可选但强烈推荐） |



## 安装

```bash
# 1. 克隆仓库
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. 用 Obsidian 打开
#    File → Open vault → 选择 LLM-FAST 目录

# 3. 安装必需插件（详见「配置」）
#    Obsidian → Settings → Community plugins → Browse

# 4. （可选）在仓库根目录启动 Claude Code
claude
```

打开后，从 [`index.md`](index.md) 开始浏览，或直接打开 [`DIARY/diary.base`](DIARY/diary.base) 查看今日复习队列。

## 配置





---
## 最佳实践

### 核心工作流

```
浏览/剪藏 ──→ INBOX/Clippings/
日常闪念  ──→ DIARY/YYYY-MM-DD.md  (diary-log)
                       │
                       │  值得长期保留时拆分
                       ▼
              原子卡片 (diary-atom)
                       │
                       │  ─→ 间隔复习队列 (1/2/4/8/16/32/64/128 天)
                       │
                       │  成熟后晋升
                       ▼
        FAST/wiki/concepts/  或  synthesis/
```

工作流层：晋升规则

这是最容易被忽视、却决定知识库会不会"烂尾"的地方。建议明确：

```
浏览/剪藏 ──▶ VAULT-INBOX/Clippings
日常闪念 ──▶ VAULT-DIARY/YYYY-MM-DD.md
              │
              │ （周回顾 / 触发式）
              ▼
       值得长期保留？
              │
              ├─ 是 ──▶ 拆成原子卡片 ──▶ VAULT-FAST/<topic>/wiki/
              │                       ──▶ 原文留 VAULT-FAST/<topic>/raw/
              └─ 否 ──▶ 留在 DIARY，不用处理
```

可以让我（或一个定时 hook）每周扫一次 INBOX 和 DIARY，提示哪些条目值得晋升。

挂载新FAST
cd `ai/test/demo`
/llm-wiki-init
移动Inbox中的相关FAST主题的剪藏文件到raw目录
ingest
登记日记Atom

念头灵感：
随手记到Inbox
整理到日记Log或Atom
复习回顾、随机游走、或提醒Atom，晋级挂载到某FAST的原子卡片

/diary-lint
/diary-review
## 🎴 卡片 2 / 7

### [[2026-05-07 AI CMS Pipeline]]
> **subtype**：反思 ｜ **importance**：4 ｜ **review_count**：0 ｜ **interval**：1

**内容回顾**：

> Obsidian → Markdown AST → Transform Plugins → Enhanced Markdown + metadata.json → Distribution Adapters → WordPress / Ghost / Static Site
>
> 核心洞察：最终推荐架构是"中间层"+ "适配层"的两层分离，而不是直接渲染。

**🪞 自评提示**：
- 你还记得这个管道的**关键卡脖子点**是什么吗？（wikilink 映射和 URL 生成）
- 这套思路对你今后的发布系统有影响吗？
- 重要性 4 合理吗？要不要改？

**请评分**（输入 `1`/`2`/`3`/`4`）👇

✅ **卡片 2 已更新**

```yaml
review_count: 1
last_review: 2026-05-15
interval: 2
next_review: 2026-05-17
```

> 清楚，间隔翻倍到 2 天。下次周五见。


**晋升卡片 1** — 我现在就把它搬到 [[OPC/学/FAST-FAST/wiki/synthesis/diary-spaced-repetition.md]]，留 stub
现在把原 diary-atom 改成 stub：
## ✨ 晋升完成

### 📄 新建合成笔记

**[[OPC/学/FAST-FAST/wiki/synthesis/diary-spaced-repetition]]**

### 📝 原 atom 转为 stub

**[[2026-05-13 LLM-FAST 日记拆分构想]]**

- `archived: true`
- `promoted_to: [[wiki/synthesis/diary-spaced-repetition]]`
- 保留原文作历史索引


 **创建 TODO 追踪系统**：Task

`/todo-lint`


自动提醒
| **Reminder**    | 读 frontmatter 的日期字段，到期弹通知         | 桌面通知 + Obsidian 内 |
**对你最契合的**：**Reminder 插件 + frontmatter 字段 `next_review`** 直接对接，到日子自动弹窗。
**优点**：原生 Obsidian 通知，OB 在后台运行就会触发。
**缺点**：Obsidian 必须**正在运行**，关掉 OB 没用。
Atom 模板加 Reminder 内联标记
更新 `Diary Atom.md` 模板，让 `obsidian-reminder` 插件能识别 `next_review` 日期触发通知

浏览次数自动增加
**思路**：用 frontmatter 字段 `views` + 插件/脚本在打开笔记时 +1。
**Templater + 启动事件**：在 Templater 用户脚本里写一个 `onFileOpen` 钩子，自动读取当前文件的 `views` 字段并 +1 写回 frontmatter。
最干净的方案是 **安装 Templater**，用它的 **Startup Template** 注册一个全局 `file-open` 监听器。整套不用写插件，30 行 JS 搞定。


**场景 C：只加 Reminder 通知，不进 SR 队列**
**Reminder 插件**：扫描范围由插件设置决定。从 data.json 看，`scanned: true`，已经识别了几个文件。Reminder 插件默认扫描**整个 vault**，不限制目录。所以只要任何 .md 文件里有 `- [ ] 内容 (@日期)` 语法，Reminder 都会识别


**场景 B：全 vault 通用 SR** （Spaced Repetition间隔复习）**（任何目录都能放可复习卡片）**
给"可复习"文件加统一标记字段，比如 `review: true`，然后 Dataview 查：
```dataview
FROM ""
WHERE review = true
  AND !archived
  AND next_review <= date(today)
```

`FROM ""` = 全 vault。




---
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

本仓库的**结构、模板、AI 行为规范**（AGENTS.md / CLAUDE.md / `_template/` / `*.base`）采用 [MIT License](LICENSE)。

**笔记正文**（`OPC/`、`DIARY/`、`INBOX/`）为个人知识，未授予复制/再分发许可——如需引用请联系作者。


---

TODO 使用指南

### 新建任务

在 `VAULT-TODO/` 创建文件，命名格式：`YYYY-MM-DD <task-slug>.md`

frontmatter：

```yaml
---
type: task
title: 接入 Claude API 做自动摘要
priority: 4          # 1(低) ~ 5(紧急)
status: backlog      # backlog | active | blocked | done | cancelled
created: 2026-05-16
due: 2026-05-20      # 可选
tags: []
dependencies: []
---
```

正文随意写任务详情、进度记录。

---

### 视图入口

打开 [[VAULT-TODO/todo.base]]，5 个视图：

| 视图 | 内容 |
|------|------|
| **活跃任务** | status ≠ done/cancelled，按优先级+截止排序 |
| **逾期** | due < 今天，未完成 |
| **本周截止** | due ∈ [今天, 今天+7) |
| **已完成** | status == done，时间倒序 |
| **状态分组** | 按 status 卡片视图 |

---

### 日常操作

**开始做**：把 `status: backlog` 改成 `status: active`

**完成**：改成 `status: done`

**被卡住**：改成 `status: blocked`，在 `dependencies` 里写被谁卡

**优先级调整**：直接改 `priority` 数字

---

### vs diary-atom 的区别

|      | diary-atom | task        |
| ---- | ---------- | ----------- |
| 目标   | 防止遗忘       | 推进完成        |
| 管理方式 | 遗忘曲线复习     | 优先级+截止      |
| 适合   | 知识/灵感/反思   | 工程/项目/任务/待办 |

---

### 健康检查

运行 `/task-lint` 扫描逾期堆积、停滞任务、死链等，输出报告到 TASK/logs/`。


---
---

鼠标高亮选中内容=》New Diary Atom
Templater 提供 `tp.file.selection()` 可以直接获取编辑器高亮选中文本，比剪贴板更精准。


---
---

## SR 在本 vault（LLM-FAST）的实现方式

### 实现层：**纯 Frontmatter 字段 + Claudian 手动驱动**

SR **不依赖任何插件自动计算**，完全靠 frontmatter 字段 + Claudian 执行算法：

```yaml
---
type: diary-atom
interval: 4           # 当前间隔天数
review_count: 3       # 已复习次数
last_review: 2026-05-13
next_review: 2026-05-17   # ← Bases 视图用这个字段过滤"今日到期"
archived: false
---
```

yaml

**触发流程**：

```
用户执行 /diary-review
    → Claudian 读 diary.base「今日复习」视图
    → 逐张展示卡片
    → 用户评分 1/2/3/4
    → Claudian 立即用 Edit 工具写入新 frontmatter
    → 算出下次 next_review
```

**间隔阶梯**（固定翻倍）：

```
1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 天
```

---

## Review vs Remind 的区别

|维度|**Review（复习）**|**Remind（提醒）**|
|---|---|---|
|**驱动者**|你主动发起 `/diary-review`|插件被动推送通知|
|**机制**|Bases 过滤 `next_review <= today`|扫描 `(@YYYY-MM-DD)` 语法|
|**工具**|[DIARY/diary.base](app://obsidian.md/DIARY/diary.base) + Claudian|Obsidian Reminder 插件|
|**目的**|认知强化（遗忘曲线）|日程提醒（别忘了做某事）|
|**更新状态**|是（写回 frontmatter）|否（只弹窗）|
|**适用内容**|`diary-atom` 知识卡片|任务、待办、约会|

---

## 两者可以协作

`diary-atom` 正文里可以同时写一行 Reminder 标记：


- [x] 复习此卡片 (@2026-05-17)


markdown

- **Reminder 插件**：到期当天弹窗提醒你"该复习了"
- **Claudian**：你执行复习后，把这行日期同步改成新的 `next_review`

这样**插件负责推送、Claudian 负责计算**，两者互补而不冲突。


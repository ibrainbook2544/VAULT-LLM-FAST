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

**LLM-FAST** 是一个面向个人/小团队的 Obsidian 知识库实验：它融合了 Andrej Karpathy 的 **LLM Wiki** 范式、自定义的 **FAST 分子笔记本** 方法，以及面向人的 **DIARY 间隔复习** 与 **TASK 任务推进** 系统。

在这个库里，AI 助手 **Claudian** 扮演「知识编译器」：摄取原始资料、编译 wiki 页面、维护索引与交叉链接；人类负责高价值判断：读什么、留什么、如何命名、是否晋升为长期知识。

> 当前规范以 [`AGENTS.md`](AGENTS.md) 为准；本文是面向使用者的总览说明。  
> 更新日期：2026-05-20

---

## 目录

- [为什么不是纯 LLM Wiki](#为什么不是纯-llm-wiki)
- [核心特性](#核心特性)
- [系统总览：四层知识流转](#系统总览四层知识流转)
- [目录结构](#目录结构)
- [核心模块说明](#核心模块说明)
  - [INBOX：输入暂存层](#inbox输入暂存层)
  - [DIARY：过程与记忆层](#diary过程与记忆层)
  - [SR：间隔复习系统](#sr间隔复习系统)
  - [TASK：任务推进层](#task任务推进层)
  - [OPC / FAST：长期知识层](#opc--fast长期知识层)
  - [Dashboard / Base：视图层](#dashboard--base视图层)
  - [脚本、模板与插件](#脚本模板与插件)
- [当前 FAST 子库](#当前-fast-子库)
- [安装与启用](#安装与启用)
- [常用命令与工作流](#常用命令与工作流)
- [Frontmatter 规范摘要](#frontmatter-规范摘要)
- [Claudian 行为约束](#claudian-行为约束)
- [路线图](#路线图)
- [贡献、致谢与许可](#贡献致谢与许可)

---

## 为什么不是纯 LLM Wiki

纯 LLM Wiki 的优点是简单：`raw/` 放原始资料，`wiki/` 放 LLM 编译后的页面。但长期使用后会暴露两个问题：

1. **知识需要结构定位**  
   完全扁平的 wiki 让写入很轻松，但不容易看出一个主题在整体知识树中的位置。

   **LLM-FAST 的解法**：用 `FAST-<主题>` 把高度相关的知识封装成「分子」，并挂载到 `OPC/` 的领域目录树下；分子内部仍保持 LLM Wiki / Zettelkasten 式扁平 wikilink。

2. **知识库不仅要保存知识，还要照顾人的记忆过程**  
   写下来的知识如果不被复习，很容易变成「只进不出」的仓库。

   **LLM-FAST 的解法**：引入 `DIARY` 原子卡与 `SR` 间隔复习，让值得长期保留的念头进入复习队列；同时用 `TASK` 管理需要推进完成的事项。

因此，LLM-FAST 不是只关心「知识被写下」，而是同时关心：

- 知识从哪里来；
- 暂时放在哪里；
- 什么时候复习；
- 何时晋升为长期 wiki；
- 哪些事项需要转成任务并推进完成。

---

## 核心特性

- **AI 知识编译器**：Claudian 负责摄取、拆解、摘要、索引与链接维护。
- **FAST 分子封装**：每个 `FAST-*` 都是一个完整 LLM Wiki，可独立打开、迁移、组合或发布。
- **层次定位 + 扁平链接**：FAST 之间通过目录树定位；FAST 内部用扁平 `[[wikilink]]` 连接。
- **DIARY 双层模型**：容器日志记录流水；原子卡片进入长期复习。
- **SR 间隔复习**：按钮 1–4 当日巩固，按钮 5 跨日推进，状态即时写回 frontmatter。
- **TASK 三分法**：`todo` / `reminder` / `shell` 分别对应人工待办、到点提醒、自动执行。
- **Bases 仪表盘**：`sr.base`、`diary.base`、`task.base` 与多个 Dashboard 统一提供入口。
- **健康检查**：`lint`、`/diary-lint`、`/todo-lint` 只报告问题，不自动修复。

---

## 系统总览：四层知识流转

```text
浏览 / 剪藏 / 闪念
        │
        ▼
INBOX/                      输入暂存层：落地优先，不急着分类
        │
        ├── 日常流水 → DIARY/YYYY-MM-DD.md
        │
        └── 值得长期保留 → DIARY/YYYY-MM-DD <slug>.md
                                  │
                                  ▼
                           SR 间隔复习队列
                                  │
                                  ▼
                    复习中确认值得沉淀 / 需要专题化
                                  │
                                  ▼
OPC/<领域>/FAST-<主题>/      长期知识层：LLM Wiki
        ├── raw/             原始资料，只读留存
        ├── wiki/sources/    来源摘要
        ├── wiki/concepts/   概念卡
        ├── wiki/entities/   实体卡
        ├── wiki/synthesis/  综合合成
        └── wiki/outputs/    对外输出

并行：
TASK/                       任务推进层：优先级 + 截止日期 + 触发方式
```

一句话：**INBOX 落得快，DIARY 防遗忘，FAST 沉淀知识，TASK 推进交付。**

---

## 目录结构

```text
LLM-FAST/
├── OPC/                         # 长期知识库：FAST 子库聚合
│   ├── AI/AI工具/Claude/FAST-CLAUDE/
│   └── 学/
│       ├── FAST-FAST/
│       └── FAST-LLM-Wiki/
├── INBOX/                       # 输入暂存层
│   ├── Clippings/               # 网页剪藏
│   └── Inbox.md                 # 临时落脚点
├── DIARY/                       # 过程与记忆层
│   ├── diary.base               # DIARY 综合视图
│   ├── Diary Dashboard.md       # DIARY 仪表盘
│   └── logs/                    # DIARY lint 报告
├── TASK/                        # 任务推进层
│   ├── task.base                # 任务看板
│   └── Task Dashboard.md        # 任务仪表盘
├── _template/                   # 模板
│   ├── Diary Template.md
│   ├── Diary Card Templater.md
│   ├── SR Reminder Templater.md
│   └── Task Template.md
├── _scripts/                    # 脚本
│   ├── sr-evaluate.js
│   ├── diary-lint.js / .ps1 / .py
│   └── demo.ps1
├── _attachment/                 # 全局附件
├── logs/                        # 插件、实验与运行日志
├── sr.base                      # 全库 SR 待复习队列
├── SR Dashboard.md              # SR 仪表盘
├── dashboard.md                 # 全库统计仪表盘
├── index.md                     # LLM-FAST 总索引
├── AGENTS.md                    # AI 行为规范
├── CLAUDE.md                    # Claude/Claudian 上下文入口
├── README.md                    # 英文说明
└── README.zh-CN.md              # 中文说明
```

> 每个 `FAST-*` 目录都是一个独立的 LLM Wiki/Obsidian 子库，可单独打开和处理。

---

## 核心模块说明

### INBOX：输入暂存层

用途：承接网页剪藏、临时想法、待处理资料。

- `INBOX/Inbox.md`：快速记录，不追求结构完整。
- `INBOX/Clippings/`：网页剪藏落点。
- `INBOX/SR算法.md`：当前 SR 算法权威说明。

原则：**先落地，后整理**。需要长期保留时，再拆为 DIARY 原子卡或迁移到某个 FAST 的 `raw/`。

### DIARY：过程与记忆层

DIARY 采用双层模型，所有文件平铺在 `DIARY/` 根目录，靠 frontmatter 区分：

| 类型 | frontmatter | 文件名 | 用途 |
|------|-------------|--------|------|
| 容器日志 | `type: diary`，无 `subtype` | `YYYY-MM-DD.md` | 当天流水账、临时记录；不进入复习 |
| 原子卡片 | `type: diary` + `subtype: card` | `YYYY-MM-DD <slug>.md` | 一念头/反思/教训/文摘；进入 SR |

关键入口：

- [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md)：DIARY 仪表盘。
- [`DIARY/diary.base`](DIARY/diary.base)：今日复习、逾期、高价值低曝光、新建未复习、全部卡片。
- [`_template/Diary Template.md`](_template/Diary%20Template.md)：每日容器日志模板。
- [`_template/Diary Card Templater.md`](_template/Diary%20Card%20Templater.md)：原子卡模板，内置 SR 按钮。

### SR：间隔复习系统

SR 的核心目标是：让值得长期保留的知识按遗忘曲线反复出现。

权威定义与实现：

- 算法说明：[`INBOX/SR算法.md`](INBOX/SR算法.md)
- 核心脚本：[`_scripts/sr-evaluate.js`](_scripts/sr-evaluate.js)
- 全库队列：[`sr.base`](sr.base)
- 仪表盘：[`SR Dashboard.md`](SR%20Dashboard.md)

当前算法（v3 规范）：

```text
初始：
sr_review_count = 0
sr_next_review_datetime = now + 15min

按钮 1–4：当日反复巩固
next = now + 15min × 2^(rating - 1)
sr_review_count 不变

按钮 5：本轮完成，跨日推进
base = max(sr_next_review_datetime, now)
next = base + 24h × 2^sr_review_count
sr_review_count += 1
```

按钮含义：

| 按钮 | 含义 | 下次复习 |
|------|------|----------|
| 1 | 忘记 | +15 分钟 |
| 2 | 模糊 | +30 分钟 |
| 3 | 还行 | +60 分钟 |
| 4 | 牢记 | +120 分钟 |
| 5 | 完成本轮 | 1、2、4、8、16… 天 |

重要更新：`sr.base` 已与 DIARY 解耦——凡带有 `sr_next_review_datetime` 字段的笔记都可以进入全库 SR 队列，便于未来支持 FAST 原子笔记。

### TASK：任务推进层

TASK 管理「要做完的事」，与 DIARY/SR 管理「要记住的知识」严格分离。

任务文件位于 `TASK/` 根目录，使用：

```yaml
---
type: task
subtype: todo        # todo | reminder | shell
priority: 3          # 1–5，数值越大越重要
status: backlog      # backlog | active | blocked | done | cancelled
created: YYYY-MM-DD
due:                 # 可选
---
```

三类任务：

| subtype | 含义 | 触发方式 | 正文语法 |
|---------|------|----------|----------|
| `todo` | 普通待办 | 人工执行 | `- [ ] 内容` |
| `reminder` | 到点提醒 | Obsidian Reminder 插件 | `- [ ] 内容 (@YYYY-MM-DD HH:mm)` |
| `shell` | 到点自动执行脚本 | Shell Reminder 插件 | `- [ ] 内容 (@时间) [shell: 脚本路径]` |

关键入口：

- [`TASK/task.base`](TASK/task.base)：任务看板。
- [`TASK/Task Dashboard.md`](TASK/Task%20Dashboard.md)：任务总览仪表盘。
- [`_template/Task Template.md`](_template/Task%20Template.md)：任务模板。

> 历史字段 `kind` 已更名为 `subtype`；README 中所有任务说明均应使用 `subtype`。

### OPC / FAST：长期知识层

`OPC/` 是长期知识存储库；每个 `FAST-*` 是一个「分子笔记本」，内部遵循 LLM Wiki 结构：

```text
FAST-<主题>/
├── raw/          # 原始资料，只读
├── asset/        # 附件
├── logs/         # 健康检查日志
├── wiki/
│   ├── index.md
│   ├── sources/
│   ├── concepts/
│   ├── entities/
│   ├── synthesis/
│   └── outputs/
├── AGENTS.md
└── CLAUDE.md
```

典型 ingest 流程：

1. 把原始资料放入 `raw/`。
2. Claudian 全文阅读并与用户确认核心要点。
3. 生成 `wiki/sources/` 来源摘要。
4. 拆分/更新 `concepts/`、`entities/`。
5. 更新 `wiki/index.md`。
6. 必要时生成 `synthesis/` 或 `outputs/`。

### Dashboard / Base：视图层

当前主要仪表盘：

| 文件 | 类型 | 用途 |
|------|------|------|
| [`dashboard.md`](dashboard.md) | `type: dashboard` | 全库统计总览 |
| [`SR Dashboard.md`](SR%20Dashboard.md) | `type: dashboard` | SR 待复习入口 |
| [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md) | `type: dashboard` | DIARY 卡片与复习总览 |
| [`TASK/Task Dashboard.md`](TASK/Task%20Dashboard.md) | `type: dashboard` | 任务总览 |

当前主要 Bases：

| 文件 | 扫描范围 | 用途 |
|------|----------|------|
| [`sr.base`](sr.base) | 全库带 `sr_next_review_datetime` 的笔记，排除 `_template/` | 全库 SR 待复习队列 |
| [`DIARY/diary.base`](DIARY/diary.base) | `DIARY` 根目录下 `type: diary` + `subtype: card` | DIARY 原子卡视图 |
| [`TASK/task.base`](TASK/task.base) | `TASK` 根目录下 `type: task` | 任务视图 |

### 脚本、模板与插件

脚本：

| 文件 | 用途 |
|------|------|
| [`_scripts/sr-evaluate.js`](_scripts/sr-evaluate.js) | SR 按钮评分后写回 frontmatter，并跳转下一张卡 |
| [`_scripts/diary-lint.js`](_scripts/diary-lint.js) / `.ps1` / `.py` | DIARY 健康检查 |
| [`_scripts/demo.ps1`](_scripts/demo.ps1) | Shell Reminder 演示脚本 |

主要插件：

| 插件 | 用途 |
|------|------|
| Dataview | 查询、统计、动态视图 |
| Templater | 模板渲染、卡片创建、按钮脚本入口 |
| QuickAdd | 快速新建 diary card / task |
| Obsidian Git | 自动备份到 GitHub |
| Update Time on Edit | 维护 `updated` 等字段 |
| Calendar | 日记入口 |
| Reminder | `(@时间)` 日程提醒 |
| Shell Reminder | 自研：到点执行 `[shell: ...]` |
| SR Reminder | 自研：扫描 SR 到期卡片并通知 |
| RealClaudian | 自研/本地：Claudian 相关集成 |

---

## 当前 FAST 子库

| FAST | 主题 | 状态 | 入口 |
|------|------|------|------|
| **FAST-FAST** | FAST 方法论定义与说明 | 规范定义 | `OPC/学/FAST-FAST/wiki/index.md` |
| **FAST-LLM-Wiki** | Karpathy LLM Wiki 范式研究 | 规范定义 | `OPC/学/FAST-LLM-Wiki/wiki/index.md` |
| **FAST-CLAUDE** | Claude AI 深度研究 | 规范定义 | `OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md` |

> 说明：上述 FAST 路径来自 `AGENTS.md` 的知识库规范；若当前仓库只同步框架与运行模块而未包含 `OPC/` 内容，它们表示约定入口而非本地必然存在的文件。

---

## 安装与启用

```bash
# 1. 克隆仓库
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. 用 Obsidian 打开
#    File → Open vault → 选择 LLM-FAST 目录

# 3. 启用插件
#    Settings → Community plugins → 启用所需插件

# 4. 可选：在仓库根目录启动 Claude Code
claude
```

建议首次打开后从以下入口开始：

- [`index.md`](index.md)：知识库总索引。
- [`dashboard.md`](dashboard.md)：全库统计。
- [`SR Dashboard.md`](SR%20Dashboard.md)：今日复习。
- [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md)：日记卡片总览。
- [`TASK/Task Dashboard.md`](TASK/Task%20Dashboard.md)：任务总览。

---

## 常用命令与工作流

| 命令 | 说明 |
|------|------|
| `ingest [文件]` | 在某个 FAST 内摄取 `raw/` 中的新来源，生成 sources / concepts / entities |
| `query <主题>` | 基于 wiki 综合回答，可保存到 outputs |
| `lint` | FAST 健康检查：死链、矛盾、孤儿文件等 |
| `/diary-lint` | DIARY 健康检查，只报告不自动修复 |
| `/todo-lint` | TASK 健康检查，只报告不自动修复 |
| `/llm-wiki-init` | 初始化新的 FAST/LLM Wiki 结构 |

推荐日常流程：

1. 快速输入进入 `INBOX/` 或当天 `DIARY`。
2. 值得长期记住的内容拆成 DIARY 原子卡。
3. 通过 SR Dashboard 定期复习。
4. 多次复习后仍有价值的内容，晋升到对应 FAST。
5. 可执行事项进入 TASK，不塞进 DIARY。

---

## Frontmatter 规范摘要

FAST wiki / INBOX：

```yaml
---
title:
type: source | concept | entity | synthesis | output | index | inbox
origin: self-written | agent-compiled
created: YYYY-MM-DD
tags: []
sources: []
summary:
---
```

DIARY 原子卡：

```yaml
---
type: diary
subtype: card
created: YYYY-MM-DD HH:mm:ss
importance: 3
sr_review_count: 0
sr_next_review_datetime: YYYY-MM-DD HH:mm:ss
tags: []
sources: []
views: 0
last_visited:
---
```

TASK：

```yaml
---
type: task
subtype: todo | reminder | shell
title:
priority: 3
status: backlog | active | blocked | done | cancelled
created: YYYY-MM-DD
due:
tags: []
dependencies: []
---
```

Dashboard：

```yaml
---
type: dashboard
---
```

完整规范见 [`AGENTS.md`](AGENTS.md)。

---

## Claudian 行为约束

Claudian 的完整行为规范见 [`AGENTS.md`](AGENTS.md)。核心约束：

- 不修改 FAST 的 `raw/` 原始资料。
- 不删除已有 wiki 页面，只追加或更新。
- ingest 新来源必须先阅读原文并与用户确认核心要点。
- `/diary-lint` 与 `/todo-lint` 只输出报告，不自动修复。
- SR 评分必须即时写回 frontmatter，禁止只在对话中口头反馈。
- DIARY 与 TASK 分离：记忆卡进入 DIARY，交付事项进入 TASK。
- 内部链接优先使用 Obsidian wikilink；README 面向 GitHub 时保留相对 Markdown 链接。

---

## 路线图

来自 [`AGENTS.md`](AGENTS.md)「待确认事项」：

- [ ] `SCHEMA.md`：是否为每个 FAST 创建单独的编译规则文件？
- [ ] `log.md`：是否需要追加式操作日志？
- [ ] HTML 展示层：`outputs/` 是否生成可交互 HTML 报告？
- [ ] 晋升触发器：INBOX → FAST 由用户手动触发，还是 AI 定期扫描建议？

---

## 贡献、致谢与许可

### 贡献

本仓库主要是个人知识库，原则上不接受外部 PR。但欢迎：

- 提 Issue 讨论 FAST 方法论；
- Fork 后搭建自己的 LLM-FAST；
- 使用 `llm-wiki-init` skill 在自己的 Obsidian vault 初始化同类结构。

### 致谢

- [Andrej Karpathy](https://karpathy.github.io/)：LLM Wiki 范式启发。
- [Anthropic Claude](https://www.anthropic.com/)：Claudian 的能力来源。
- [Obsidian](https://obsidian.md/)：本地优先知识库工具。
- 王树义老师、程序员老李、Tarek Sherif、Lex Fridman 等相关讨论与实践启发。

### 许可

本仓库的**结构、模板、脚本、插件与 AI 行为规范**（如 `AGENTS.md`、`CLAUDE.md`、`_template/`、`_scripts/`、`.obsidian/plugins/`、`*.base`）采用 [MIT License](LICENSE)。

**笔记正文内容**（如 `OPC/`、`DIARY/`、`INBOX/`）属于个人知识内容，未授权复制或再分发；如需引用请联系作者。

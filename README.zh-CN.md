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

## 知识管理的三次进化：从 PKM/KOS 到 LLM-Wiki，再到 LLM-FAST

每个认真学习过的人，都曾经历同一种挫败：笔记越记越多，却越来越难找到；系统越建越精密，却越来越不想维护。

这不是个人意志力的问题。这是范式的问题。

### 传统范式：两套系统，一个瓶颈

过去几十年，知识工作者依赖两个维度来管理自己的认知资产：

**个人知识管理（PKM - Personal Knowledge Management）**，以人为中心。随手记、日记、Todo、GTD工作流——捕捉流动的思绪；遗忘曲线驱动的间隔复习与提醒——对抗记忆的自然衰减。这一层回答的是：_我如何学习？_

**知识组织结构（KOS - Knowledge Organization Structure ）**，以知识为中心。大纲笔记、知识卡片、关系表格、知识图谱——将碎片锻造成可调用的结构。这一层回答的是：_知识如何存放？_

两套系统看似完备，瓶颈却始终卡在同一处——**人**。

### 两股力量的夹击

传统范式正在被两股力量同时撕裂。

一是**人的惰性**：记录、整理、关联、归档，每一个环节都在持续消耗意志力。系统越精密，维护成本越高。绝大多数知识库的命运，都是"建得认真，用得随意，荒废收场"。

二是**知识本身的失控**：信息以指数级膨胀，学科加速交叉迭代，任何领域的"最新认知"都在几个月后快速地被新知识所取代。

### AI 时代：[Andrej Karpathy 的 LLM Wiki 范式](https://karpathy.github.io/) 

AI 助手扮演**知识编译器**：摄取原始资料、编译 wiki 页面、维护索引与交叉链接。

传统的 `LLM-Wiki` 的优点是简单：`raw/` 放原始资料，`wiki/` 放 LLM 编译后的页面。

> 我的另一个仓库 [llm-wiki-skills](https://github.com/ibrainbook2544/llm-wiki-skills) ，实现了比较严格遵循了 [Andrej Karpathy 的 LLM Wiki 范式](https://karpathy.github.io/) 的 `LLM-Wiki`。

传统 `LLM-Wiki` 只注重知识本身、却不注重知识的使用者——**人**的认知和记忆过程。但本人经过长期使用后，发现几个问题：

1. **新知识没有挂载到层次分明的知识体系、明确与其它知识分支和节点的关系** 
   完全扁平的结构让资料的摄入很轻松，新增笔记时虽然不用纠结分类位置，但却丧失了一次知识树**挂载**的机会，容易形成 `知识孤岛`，这样就不容易看出新的知识点在整体知识树中的位置。

2. **不适合经常变化的内容**（比如随手记、日记、笔记、文章草稿等），只适合不经常变化的内容（比如网络文章视频的剪藏、论文或电子书、使用说明手册、存档的老旧文章等），否则每次内容变化都需要重新编译、重新生成十几个页面以及几十个相关链接，不仅耗时、更耗费 Token。

3. **缺乏有意义、高质量的产出**
   传统 `LLM-Wiki` 更注重摄入资料、沉淀概念、挖掘关联、来源引用，而不能洞察和生成高质量的内容，更不能辨别和确认知识的准确性和完整性。比如随便找了几个视频教程，放到 `LLM-Wiki` 系统后，几分钟后就能生成几十个文件，看着很热闹、很有成就感和学习的满足感，但真正让它生成一篇论文或教程的时候，由于过于依赖那些视频来源而很难保证知识的质量，你必须自己思索、重新搜集可靠的资料，甚至完全摆脱对于`LLM-Wiki`的依赖，才能撰写出一篇高质量、论文级别的知识教程。

4. 上面是关于 **KOS**，而 **PKM** 方面就更缺乏了。比如缺乏**按照遗忘曲线进行复习或间隔记忆法的提醒**，还有**随手记、日记、Todo、GTD** 等一系列 **PKM** 功能。

5. **无法完整地保留与AI的对话**
   `LLM-Wiki` 的 LOG 只有一些简单的操作信息，缺乏完整的上下文内容，很影响以后复盘和回顾。

### 第三次进化：LLM-FAST

**LLM-FAST** 是一个面向个人/小团队的**知识管理系统**+**知识组织结构**（**PKM**+**KOS**）：

- 在 **PKM** 方面，融合了 [Andrej Karpathy 的 LLM Wiki 范式](https://karpathy.github.io/) 与本人研究的 **FAST 分子笔记本**方法论，由于有了架构完整、逻辑严密的学习方法论和知识体系，使得在此基础上能够快速生成的高质量产出文章（针对`LLM-Wiki` #3 ）。

- 在 **KOS** 方面，采用了立体化目录层次结构（针对`LLM-Wiki` #1 ），还融合了**剪藏（Clippings）**、**随手记（Inbox）**、**日记（Diary）**（针对`LLM-Wiki` #2 ），同时加入了本人开发的多个 Obsidian 插件、脚本和模板，比如**间隔复习提醒（SR Reminder）**、**间隔复习评估脚本（sr-evaluate.js）**、**TASK 自动化脚本提醒（Shell Reminder）**（针对`LLM-Wiki` #4 ），最后是 **AI会话记录脚本（conversation-logger.js）**（针对`LLM-Wiki` #5 ）；

因此，`LLM-FAST` 不只是知识被**挂载**到有层次结构的知识树上，而是让你**主动关注**、更是给了你**被动提醒复习与复盘**的机会。

---

## 目录

- **[核心特性](#核心特性)**
- **[系统构成](#系统构成)**
  - [AI Agent](#ai-agent)
  - [Skills](#skills)
  - [脚本](#脚本)
  - [OB 插件](#ob-插件)
  - [OB 模板](#ob-模板)
  - [Dashboard / Base：视图层](#dashboard--base视图层)
- **[目录结构](#目录结构)**
- **[核心功能](#核心功能)**
  - [随手记（Inbox）](#随手记inbox)
  - [日记（Diary）：过程与记忆层](#日记diary过程与记忆层)
  - [【最佳实践】筛选 · 归类 · 定位挂载](#最佳实践筛选--归类--定位挂载)
  - [摄入（Ingest）—— 原子化、分析过程](#摄入ingest-原子化分析过程)
  - [【最佳实践】事实核查、清除矛盾、健康检查（Lint）](#最佳实践事实核查清除矛盾健康检查lint)
  - [`FAST 6+1` 维度扩展 —— 分子化、综合过程](#fast-61-维度扩展--分子化综合过程)
  - [知识树漫游：半随机游走（Half-Random Walk） —— 主动复习](#知识树漫游半随机游走half-random-walk--主动复习)
  - [记忆卡片（Card）与间隔复习提醒（SR Reminder）—— 被动复习](#记忆卡片card与间隔复习提醒sr-reminder-被动复习)
  - [三类任务（Task Subtype）](#三类任务task-subtype)
  - [日志归档（Logs）](#日志归档logs)
- **[前置要求](#前置要求)**
- **[安装](#安装)**
- **[配置](#配置)**
- **[常用命令与工作流](#常用命令与工作流)**
- **[最佳实践](#最佳实践)**
- **[贡献、致谢与许可](#贡献致谢与许可)**
  - [贡献](#贡献)
  - [致谢](#致谢)
  - [许可](#许可)

---

## 核心特性

- **AI 知识编译器** —— `LLM-Wiki` ：AI 负责摄取、拆解、摘要、索引与链接维护。
- **FAST 分子笔记**：每个 `FAST-*` 都是一个完整 `LLM-Wiki` ，可在 OBsidian 独立打开、迁移、组合或发布。
- **层次定位 + 扁平链接**：FAST 之间通过**目录树**定位；FAST 内部用**扁平 ZettelKasten 链接** —  `[[wikilink]]` 连接，不含路径，可跨 FAST 自由跳转。
- **记忆卡片（Card）** ：只保存简化提炼的 **FAST** 原子笔记 ，遵守**一卡一概念**，如 wiki 中的概念和实体。
- **间隔复习提醒（SR）**：按照简化的遗忘曲线（基于 `2^N` 间隔）自动设置记忆卡片中与复习相关的**属性（frontmatter）** 、并设置**间隔提醒（SR Reminder）**。用户可以通过记忆卡片上的记忆评估按钮 1–4 进行当日巩固、按钮 5 跨日推进，记忆状态即时写回 **属性（frontmatter）**。
- **日记（Diary）双层模型**：除了记录多而杂的日常流水之外，还可以鼠标选中关键内容后、使用 QuickAdd 快速创建一个 **日记卡片（Diary Card）** 来记录简单精炼但重要的知识卡片，以便进行**间隔复习（SR）**。
- **任务（Task）三分法**：`todo`、`reminder`、`shell` 分别对应人工待办、到点提醒用户去处理、到点提醒自动执行脚本。
- **Bases/Dataview 仪表盘**：`sr.base`、`diary.base`、`task.base` 与多个 Dashboard 统一提供入口，浏览统计、冷门笔记、本周访问一目了然。
- **健康检查**：`/sr-lint`、`/diary-lint`、`/task-lint` 只报告死链、矛盾、孤儿文件、schema 违规等问题，不自动修复。
-  **AI会话记录脚本（conversation-logger.js）**：可完整记录与 AI 的会话，你还可以快速归类整理，方便日后搜索和回顾。

---

## 系统构成

---

### AI Agent

-  [Codex](https://chatgpt.com/codex)、[Claude Code](https://claude.ai/code) ："知识编译器"，AI 行为规范请见 [`AGENTS.md`](AGENTS.md)。

---
### Skills

- `skill-creator`
- `obsidian-cli`、`obsidian-markdown`、`obsidian-bases`
- llm-wiki-skills：llm-wiki-init、llm-wiki-ingest、llm-wiki-lint等
- llm-fast-skills

---
### 脚本

| 文件                               | 用途                             |
| -------------------------------- | ------------------------------ |
| `_scripts/sr-evaluate.js`        | SR 按钮评分后写回 frontmatter，并跳转下一张卡 |
| `_script/conversation-logger.js` | AI 会话记录脚本，自动将对话完整存入 `logs/`    |

---
### OB 插件

| 插件                            | 用途                                 |
| ----------------------------- | ---------------------------------- |
| `Obsidian Git`                | 自动备份提交到 GitHub                     |
| `Dataview`                    | 索引页查询、统计、动态视图、仪表盘                  |
| `Claudian`                    | OB 中无缝使用 Claude / Codex / OpenCode |
| `Templater`                   | 笔记模板填充                             |
| `QuickAdd`                    | 配合 `Templater`，快速新建页面              |
| `Update Time on Edit Content` | （本人开发）自动维护 `updated` 字段            |
| `Reminder`                    | 普通提醒，`(@时间)`                       |
| `SR Reminder`                 | （本人开发）间隔复习提醒，扫描 SR 到期卡片并通知         |
| `Shell Reminder`              | （本人开发）脚本提醒，到点执行脚本 `[shell: ...]`   |
| `Obsidian Tasks`              | TASK 任务管理（目前未使用）                   |
| `Obsidian Dialy Notes`        | OB 日记                              |
| `Obsidian Calendar`           | OB 日历                              |

---
### OB 模板

| 模板                                                  | 用途                                            |
| --------------------------------------------------- | --------------------------------------------- |
| `_template/Diary Card Templater`                    | 新建记忆卡片的模板                                     |
| `_template/Diary Template`                          | 新建普通日记的模板                                     |
| `_template/SR Reminder Template`                    | 间隔复习提醒的模板，任何页面套用后可成为记忆卡片                      |
| `_template/Task Template`                           | 用QuickAdd新建任务的模板，任何页面可套用                      |
| `_template/templater-startup-template-view-counter` | Templater的启动脚本模板，用于打开页面后自动增加浏览次数（默认停留 15 秒防抖） |

---
### Dashboard / Base：视图层

**仪表盘**：

| 文件 | 类型 | 用途 |
|------|------|------|
| [`dashboard.md`](dashboard.md) | `type: dashboard` | 全库统计总览 |
| [`SR Dashboard.md`](SR%20Dashboard.md) | `type: dashboard` | SR 待复习入口 |
| [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md) | `type: dashboard` | DIARY 卡片与复习总览 |
| [`TASK/Task Dashboard.md`](TASK/Task%20Dashboard.md) | `type: dashboard` | 任务总览 |

**数据库**：

| 文件 | 扫描范围 | 用途 |
|------|----------|------|
| [`sr.base`](sr.base) | 全库带 `sr_next_review_datetime` 的笔记，排除 `_template/` | 全库 SR 待复习队列 |
| [`DIARY/diary.base`](DIARY/diary.base) | `DIARY` 根目录下 `type: diary` + `subtype: card` | DIARY 原子卡视图 |
| [`TASK/task.base`](TASK/task.base) | `TASK` 根目录下 `type: task` | 任务视图 |

---

## 目录结构

```text
INBOX/   随手记：先落地，后整理，保持清空   （使用 Syncthing 与手机上 Obsidian 同步）
    │  
    ├── Inbox.md    灵感、闪念
    │  
    └── Clippings   剪藏：网络视频、网页文章等（使用 Chrome 扩展 Obsidian Web Clipping）
        
        
DIARY/
    │
    ├── 日常日记 → DIARY/YYYY-MM-DD.md   （使用 Obsidian 日记插件、应用模板 _template/Diary Template）
    │
    └── 记忆卡片（Card） → DIARY/YYYY-MM-DD <slug>.md   （使用 Obsidian 插件 QuickAdd 和 Templater、应用模板 _template/Diary Card Templater）
                                  │
                                  ▼
                间隔复习提醒（SR Reminder）到点弹出记忆卡片   （OB 插件 SR Reminder）
                                  │
                                  ▼
                    用户点选记忆评估按钮   （使用脚本 sr-evaluate.js）
                                  
                                  
TASK/   （创建使用 OB 插件 QuickAdd、模板 _template/Task Template）
    │
    ├── 待办（todo）
    │
    ├── 提醒（reminder）   （使用 OB 插件 Reminder）
    │
    └── 脚本提醒（shell）   （使用 OB 插件 Shell Reminder）
    
    
<领域>/<子领域>/FAST-<分子笔记本>/      长期知识层：LLM-Wiki
        ├── raw/             原始资料，只读留存
        ├── wiki/sources/    来源誊抄大纲笔记
        ├── wiki/concepts/   概念卡
        ├── wiki/entities/   实体卡
        ├── wiki/synthesis/  综合合成
        └── wiki/outputs/    对外输出
        
index.md                     # LLM-FAST 总索引
        
        
logs/                        # 插件、实验与运行日志   （使用 AI 会话记录脚本 conversation-logger.js）

sr.base                      # SR 待复习队列
SR Dashboard.md              # SR 仪表盘
dashboard.md                 # 统计仪表盘
AGENTS.md                    # Codex 行为规范
CLAUDE.md                    # Claude 行为规范
README.md                    # 说明


注意：一键生成记忆卡片（Card）—— 在任何页面都可以用鼠标选中关键内容、然后使用 QuickAdd 快速创建。
```

---

## 核心功能

---

### 随手记（Inbox）

**用途：** 随时捕捉临时想法、灵感闪念、网页剪藏与待处理资料。

**核心原则：先落地，后整理。** 不纠结存放位置，专注快速记录；每晚集中整理，保持清空。

**目录结构**

- `INBOX/Inbox.md`— 快速文字记录，无需追求结构完整
- `INBOX/Clippings/`— 网页剪藏存放目录
- `INBOX/<待处理资料>— 其他临时文件暂存区

**整理流程**

需要长期留存时，有两条路径：

- 用 `QuickAdd` 一键生成记忆卡片
- 将剪藏文件移入对应 FAST 分子笔记本的 `raw/`，触发摄入（Ingest）流程，自动生成关联 `Wiki` 文件

**手机同步**

支持随时随地录入，包括语音速记：

- 付费方案：`OB Sync`（官方，稳定）
- 免费方案：`Syncthing`（局域网直连，零成本）

---
### 日记（Diary）：过程与记忆层

采用双层模型，所有文件平铺在 `DIARY/` 根目录，靠 `frontmatter` 区分：

| 类型 | frontmatter | 文件名 | 用途 |
|------|-------------|--------|------|
| 容器日志 | `type: diary`，无 `subtype` | `YYYY-MM-DD.md` | 当天流水账、临时记录；不进入复习 |
| 原子卡片 | `type: diary` + `subtype: card` | `YYYY-MM-DD <slug>.md` | 一念头/反思/教训/文摘；进入 SR |

关键入口：

- [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md)：DIARY 仪表盘。
- [`DIARY/diary.base`](DIARY/diary.base)：今日复习、逾期、高价值低曝光、新建未复习、全部卡片。
- [`_template/Diary Template.md`](_template/Diary%20Template.md)：每日容器日志模板。
- [`_template/Diary Card Templater.md`](_template/Diary%20Card%20Templater.md)：原子卡模板，内置 SR 按钮。


---
### 【最佳实践】筛选 · 归类 · 定位挂载

 🔍 **筛选**
 
> 不要什么都保留！有些信息看一遍就够了，不要让它占用笔记库。

 🗂️ **归类**
 
根据信息的**复用价值**决定去处：

| 价值           | 去处                                        |
| ------------ | ----------------------------------------- |
| 值得保留，但无需反复回忆 | 存入当天的普通**日记**                             |
| 值得日后回忆复习     | 存入**记忆卡片**，如 `DIARY/YYYY-MM-DD <slug>.md` |

 📌 **定位挂载**
 
对于值得深入整理的文件（如剪藏文件），按以下步骤处理：

1. 在**目录树**中定位到所属领域
2. 创建 **FAST 分子笔记本**
3. 将原始文件移动至 `raw/`

---
### 摄入（Ingest）—— 原子化、分析过程

每个 `FAST-*` 是一个**分子笔记本**，内部遵循` LLM-Wiki` 结构：

```text
FAST-<主题>/
├── raw/          # 原始资料，只读
├── asset/        # 附件
├── wiki/
│   ├── index.md
│   ├── sources/   # 誊抄笔记
│   ├── concepts/
│   ├── entities/
│   ├── synthesis/
│   └── outputs/
├── AGENTS.md
└── CLAUDE.md
```

典型 ingest 流程：

1. 把原始资料放入 `raw/`。
2. AI 全文阅读并与用户确认核心要点。
3. 生成 `wiki/sources/` 来源的誊抄笔记。
4. 拆分/更新 `concepts/`、`entities/`。
5. 更新 `wiki/index.md`。
6. 必要时生成 `synthesis/` 或 `outputs/`。

---
### 【最佳实践】事实核查、清除矛盾、健康检查（Lint）

`Ingest` 流程结束后，笔记本并非"完成态"——原始资料本身可能含有错误、过时信息，或与已有概念节点相悖。因此，每次**摄入**后需执行一轮**三层校验**。

**事实核查（Fact-Check）**：AI 对 `sources/` 中的关键断言逐条标注可信度，标记需要二次确认的内容（`[?]`），并在 `AGENTS.md` 中记录待核实任务，避免错误信息悄无声息地扩散至 `concepts/` 和 `synthesis/`。最后由人来亲自核查和

**清除矛盾（Conflict Resolution）**：新笔记与既有概念节点发生冲突时，不能简单覆盖，而应在对应 `concepts/*.md` 的 `## Conflicts` 区块中并列存档两种说法，附上来源与时间戳，待后续 Synthesis 阶段由用户裁决。

**健康检查（Lint）**：类比代码静态分析，定期扫描整个 `wiki/` 目录，检测：孤立节点（无反向链接的 `entities/`）、空白占位文件、`index.md` 中失效的内部链接、以及过度重复的概念条目。Lint 报告输出至 `outputs/lint-report-<date>.md`，作为下一次 `Ingest` 的前置清单。

三层校验共同保障笔记本的**信噪比** —— **摄入**的不只是信息，而是经过验证、自洽的知识。

---
### `FAST 6+1` 维度扩展 —— 分子化、综合过程

> 注意：这一步最重要！是 `LLM-FAST` 的核心步骤。它决定了整个**FAST 分子笔记本**的内容是否具备了**真实性**、**正确性**、**完整性**。

详细内容请看：[FAST（Full Area Stack Tree）](_doc/FAST（Full%20Area%20Stack%20Tree）.md)

### 知识树漫游：半随机游走（Half-Random Walk） —— 主动复习

**随机游走（Random Walk）** 是**个人知识管理（PKM）** 领域中一种用于主动复习与记忆巩固的经典方法。`Obsidian` 虽内置了`随机游走`功能，但其完全随机的特性在面对海量笔记时往往力不从心——命中率低、复习效率差，难以满足系统化知识管理的需求。

`LLM-FAST` 的**随机游走**对此做出了改进。它并非盲目随机，而是综合参考**记忆程度**、**重要程度**与**浏览次数**等维度，实现有目的、高效率的**半随机游走（Half-Random Walk）**。

**半随机游走的原理**：

在节点选取时引入加权机制：`浏览次数` 越低、`重要程度` 越高的笔记，被选中的概率越大。这意味着系统会优先将你引导至那些"重要但久未回顾"的知识节点，从而让每一次漫游都更有价值。

---
### 记忆卡片（Card）与间隔复习提醒（SR Reminder）—— 被动复习

核心目标：让值得长期留存的知识，沿**艾宾浩斯遗忘曲线**在恰当的时机反复浮现，以最小的复习成本换取最深的记忆留存。

**间隔复习（SR）算法**

记忆卡片通过以下属性与算法驱动复习节奏：

```text
初始状态：
  sr_review_count        = 0
  sr_next_review_datetime = now + 15min

按钮 1–4（当日反复巩固）：
  next = now + 15min × 2^(rating - 1)
  sr_review_count 不变

按钮 5（本轮完成，跨日推进）：
  base = max(sr_next_review_datetime, now)
  next = base + 24h × 2^sr_review_count
  sr_review_count += 1
```

> 按钮 1–4 用于**当日强化**，间隔在分钟级别内递增；按钮 5 代表**本轮掌握**，触发跨日的指数级推迟，间隔天数依次为 1、2、4、8、16…

**记忆评估按钮说明**

|按钮|掌握程度|下次复习间隔|
|---|---|---|
|1|忘记|+15 分钟|
|2|模糊|+30 分钟|
|3|还行|+60 分钟|
|4|牢记|+120 分钟|
|5|本轮完成|1 → 2 → 4 → 8 → 16… 天|

**💡 快速创建记忆卡片**

在任意页面中，用鼠标选中关键内容，通过 `QuickAdd` 即可一键生成记忆卡片，随手捕捉、零摩擦录入。

---
### 三类任务（Task Subtype）

`LLM-FAST` 将任务细分为三种子类型，覆盖从**人工手动**到**定时自动**的完整执行链路，满足不同场景下的任务管理需求。

|subtype|含义|触发方式|正文语法|
|---|---|---|---|
|`todo`|普通待办|人工执行|`- [ ] 内容`|
|`reminder`|到点提醒用户去处理|Obsidian Reminder 插件|`- [ ] 内容 (@YYYY-MM-DD HH:mm)`|
|`shell`|到点自动执行脚本|Shell Reminder 插件|`- [ ] 内容 (@时间) [shell: 脚本路径]`|

**`todo` —— 普通待办**

最基础的任务类型，用于记录需要人工介入、手动完成的事项。没有时间绑定，由用户自行决定何时处理。适合日常的行动清单、项目子任务、临时备忘等场景。

```markdown
- [ ] 整理本周会议记录
- [ ] 回复 Alice 的邮件
```

**`reminder` —— 定时提醒**

为任务绑定一个具体的时间点，到时由 **Obsidian Reminder 插件**推送通知，提醒用户去主动处理该事项。任务本身仍需人工完成，插件只负责"在对的时间叫你一声"。适合截止日期明确、需要定点跟进的任务。

```markdown
- [ ] 提交季度报告 (@2025-06-30 09:00)
- [ ] 给妈妈打电话 (@2025-06-01 20:00)
```

**`shell` —— 定时自动执行**

三类中自动化程度最高的任务类型。在 `reminder` 的基础上，进一步绑定一个可执行脚本，到达指定时间后由 **Shell Reminder 插件**自动触发运行，无需人工干预。适合周期性的数据同步、文件备份、自动化报告生成等场景。

```markdown
- [ ] 每日备份笔记库 (@2025-06-01 03:00) [shell: ~/scripts/backup.sh]
- [ ] 自动推送日报 (@2025-06-01 18:00) [shell: ~/scripts/send_report.py]
```

**三类任务对比一览**

|        | `todo` | `reminder`    | `shell`          |
| ------ | ------ | ------------- | ---------------- |
| 需要人工处理 | ✅      | ✅             | ❌                |
| 绑定时间点  | ❌      | ✅             | ✅                |
| 到时自动执行 | ❌      | ❌             | ✅                |
| 依赖插件   | ❌      | `OB Reminder` | `Shell Reminder` |

> **选型建议**：没有时间压力的事项用 `todo`；需要定点提醒但仍需人工处理的用 `reminder`；可以完全脚本化、无需人工介入的重复性操作用 `shell`。

---
### 日志归档（Logs）

`LLM-FAST` 内置了一套完整的日志归档体系，将**日常行为记录**与**AI 会话记录**统一纳入 `logs/` 目录管理，形成可检索、可回顾的个人知识轨迹。

**目录结构示例**

```
logs/
├── 2026-05-13                          ← 日常日志（按日期自动归档）
├── 2026-05-14
├── 2026-05-16 OB插件：Reminder         ← 带标题的日志（重要事项）
└── 2026-05-18 120708 添加按钮
```

日志文件名支持两种格式：

- **纯日期**（`YYYY-MM-DD`）：当日的通用记录，适合流水账式的日常归档
- **日期 + 时间戳 + 标题**（`YYYY-MM-DD HHmmss 标题`）：精确到秒的事件记录，适合标注重要节点、开发记录、灵感备忘等

**AI 会话记录脚本**

`conversation-logger.js` 负责将你与 AI 的每一次会话完整保存至 `logs/` 目录，生成结构化的归档文件。其核心价值在于：

- **完整留存上下文**：记录提问、回复的完整内容，而非碎片摘要，日后可原文回溯
- **快速归类整理**：会话记录与日常日志统一存放，支持按日期、关键词快速检索
- **沉淀可复用知识**：反复出现的问题与解法会在日志中自然积累，形成个人专属的 AI 问答知识库
- **辅助复盘与回顾**：结合间隔复习机制，重要的 AI 会话可二次加工为记忆卡片，进入长期记忆管理流程

> **使用场景举例**：调试某个脚本时与 AI 反复确认逻辑，会话结束后自动归档为 `2026-05-18 143022 调试 backup.sh`，下次遇到同类问题直接搜索日志即可找到完整的解题过程。

---
## 前置要求

| 工具                                    | 版本     | 用途       |
| ------------------------------------- | ------ | -------- |
| [Obsidian](https://obsidian.md/)      | ≥ 1.7  | 知识库管理    |
| [Git](https://git-scm.com/)           | ≥ 2.30 | 版本控制     |
| [Claude Code](https://claude.ai/code) | 最新     | AI 编译与维护 |
| [Codex](https://chatgpt.com/codex)    | 最新     | AI 编译与维护 |

---
## 安装

```bash
# 1. 克隆仓库
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. 用 Obsidian 打开
#    File → Open vault → 选择 LLM-FAST 目录

# 3. 关闭 Restricted mode，启用社区插件
#    Settings → Community plugins → 启用所需插件
```

---
## 配置

> 注意：Git 仓库已经包含了所有 OB 插件、模板、脚本，以及相关的配置，甚至还保留了开发日志和核心一些 **FAST 分子笔记本**，你可以自行修改和取舍。

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

---
## 最佳实践

---

？？？？？？？？？？？？？
### 剪藏（Clippings）

Youtube 视频（Chrome扩展： OB Web Clipper）=》OB：INBOX/Clippings/<YT视频标题>


1. 快速输入进入 `INBOX/` 或当天 `DIARY`。
2. 值得长期记住的内容拆成 DIARY 原子卡。
3. 通过 SR Dashboard 定期复习。
4. 多次复习后仍有价值的内容，晋升到对应 FAST。
5. 可执行事项进入 TASK，不塞进 DIARY。

---

## 贡献、致谢与许可

---

### 贡献

本仓库主要是个人知识库，原则上不接受外部 PR。但欢迎：

- 提 `Issue` 讨论 **FAST** 方法论；
- Fork 后搭建自己的 `LLM-FAST`。

---
### 致谢

- [Andrej Karpathy](https://karpathy.github.io/)：LLM Wiki 范式启发
- **Tiago Forte**：第二大脑 CODE（Capture-Organize-Distill-Express）
- **Zettelkasten**：Fleeting → Literature → Permanent

---
### 许可

本仓库的**结构、模板、脚本、插件与 AI 行为规范**（如 `AGENTS.md`、`CLAUDE.md`、`_template/`、`_scripts/`、`.obsidian/plugins/`、`*.base`）采用 [MIT License](LICENSE)。

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

## 特性

- 🧠 **AI 编译器范式** — Claudian 自动摄取 → 拆解 → 索引 → 维护，人类只做判断
- 📦 **FAST 分子封装** — 每个主题独立成"分子"，可单独打开、组合、出售
- 🃏 **遗忘曲线复习** — DIARY 原子卡基于 `2^N` 间隔自动调度
- 📋 **任务追踪** — TASK 用 [Obsidian Bases](https://obsidian.md/bases) 构建看板视图
- 🔗 **扁平 ZettelKasten 链接** — `[[wikilink]]` 不含路径，跨 FAST 自由跳转
- 🩺 **健康检查** — `lint` 命令检测死链、矛盾、孤儿文件、schema 违规
- 📊 **Dataview 仪表板** — 浏览统计、冷门笔记、本周访问一目了然

## 前置要求

| 工具 | 版本 | 用途 |
|------|------|------|
| [Obsidian](https://obsidian.md/) | ≥ 1.7 | 知识库主体 |
| [Git](https://git-scm.com/) | ≥ 2.30 | 版本控制 |
| [Claude Code](https://claude.ai/claude-code) | 最新 | AI 编译与维护（可选但强烈推荐） |

## 快速开始

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

## 使用

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

### 常用命令（在 Claude Code 会话中）

| 命令 | 说明 |
|------|------|
| `ingest [文件]` | 摄取 `raw/` 中的新来源，生成 sources / concepts / entities 页面 |
| `query <主题>` | 基于 wiki 综合回答，可保存为 output |
| `lint` | 健康检查：死链、矛盾、孤儿文件，结果写入 `logs/` |
| `/diary-review` | 间隔复习流程：逐张呈现卡片，即时写入 frontmatter |
| `/todo-lint` | 任务库健康检查 |

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

## 当前 FAST 子库

| FAST | 主题 | 状态 | 入口 |
|------|------|------|------|
| **FAST-FAST** | FAST 方法论定义与说明 | 🟢 活跃 | [`OPC/学/FAST-FAST/wiki/index.md`](OPC/学/FAST-FAST/wiki/index.md) |
| **FAST-LLM-Wiki** | LLM Wiki 范式研究（Karpathy 方法论） | 🟢 活跃 | [`OPC/学/FAST-LLM-Wiki/wiki/index.md`](OPC/学/FAST-LLM-Wiki/wiki/index.md) |
| **FAST-CLAUDE** | Claude AI 深度研究 | 🟢 活跃 | [`OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md`](OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md) |

## 配置

### 必需的 Obsidian 插件

| 插件 | 用途 |
|------|------|
| **Dataview** | 索引页查询、统计、动态视图 |
| **Templater** | 笔记模板填充 |
| **QuickAdd** | 快速新建 atom / task |
| **Obsidian Git** | 自动备份提交到 GitHub |
| **Obsidian Tasks** | TASK 任务管理 |
| **Reminder** | atom 卡复习提醒 |
| **Update Time on Edit** | 自动维护 `updated` 字段 |
| **Calendar** | 日历视图打开 diary-log |

### Frontmatter 规范

参见 [`AGENTS.md`](AGENTS.md) §4.2（FAST wiki / INBOX）和 §5.2（DIARY atom）。

## AI 助手（Claudian）

本库由 [Claude Code](https://claude.ai/claude-code) 作为"知识编译器"维护。完整的行为规范、命名规则、frontmatter schema、复习算法、健康检查项见 [`AGENTS.md`](AGENTS.md)。

**关键约束**：
- ❌ 不修改 `raw/` 中的原始文件
- ❌ 不删除已有 wiki 页面（只追加/更新）
- ❌ `lint` 命令只报告，不自动修复
- ✅ `/diary-review` 每张卡评分后**立即**写入 frontmatter，不允许批量延后

## 路线图

来源：[`AGENTS.md`](AGENTS.md) §八「待确认事项」

- [ ] `SCHEMA.md` — 为每个 FAST 创建独立的编译规则文件
- [ ] `log.md` — 追加式操作日志
- [ ] **HTML 展示层** — `outputs/` 生成可交互的 HTML 报告
- [ ] **晋升触发器** — INBOX → FAST 的自动/半自动建议机制

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

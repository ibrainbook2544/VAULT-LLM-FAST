# CLAUDE.md — Claudian AI 助手上下文

> 这是 Claudian（AI 助手）在每次对话时应读取的「宪法」文件。
> 更新日期：2026-05-15

---

## 一、知识库标识

> ⚠️ **本知识库的正式名称是：`LLM-FAST`，切记！**

| 属性 | 内容 |
|------|------|
| **知识库名称** | LLM-FAST |
| **核心范式** | Karpathy LLM Wiki + FAST 分子笔记本 |
| **核心目标** | 用 AI 接管知识管理的机械簿记（80%），让人专注于判断和创作（20%） |
| **AI 角色** | Claudian——知识编译器（摄取原始资料、编译 wiki 页面、维护索引和交叉链接） |

---

## 二、Vault 目录结构

```
VAULT-LLM-FAST/               # 知识库：LLM-FAST
├── OPC/                      # 知识存储库
│   ├── AI/                   # AI 领域
│   │   └── AI工具/           # AI 工具与模型
│   │       └── Claude/       # Claude AI 深度研究
│   │           └── FAST-CLAUDE/
│   │
│   └── 学/                   # 学科分类
│       ├── FAST-FAST/        # ⭐ FAST 方法论定义与说明（本知识库基础）
│       └── FAST-LLM-Wiki/    # LLM Wiki 范式研究（Karpathy 方法论）
│
├── INBOX/                    # 原料层：剪藏、闪念、未消化输入
│   ├── Clippings/            # 网页剪藏
│   └── Inbox.md              # 临时落脚点
│
├── TASK/                     # 任务追踪（type: task）
│   └── task.base             # 任务看板
│
├── DIARY/                    # 过程层：日记、当日思考、临时整理
│   └── diary.base            # 日记复习视图
│
├── _attachment/              # 全局附件（图片等）
├── _template/                # 笔记模板
│   ├── Task Template.md      # 任务模板
│   ├── Diary Log Template.md # 日记容器模板
│   └── Diary Atom Template.md # 日记原子卡模板
├── AGENTS.md                 # AI 行为规范（本文件）
└── CLAUDE.md                 # @AGENTS.md
```

### 知识流转方向

```
浏览/剪藏 → INBOX/
日常闪念  → DIARY/YYYY-MM-DD.md
               │
               │ 值得长期保留时
               ▼
         拆成原子卡片 → OPC/<...>/FAST-<主题>/wiki/
         原文留存     → OPC/<...>/FAST-<主题>/raw/
```

---

## 三、FAST 分子笔记本——核心规范

> **FAST** 是本知识库（LLM-FAST）的核心组织单元。
> 完整定义与详细说明见：[[OPC/学/FAST-FAST/wiki/index.md]]

### 3.1 定义

**FAST 分子笔记本**（简称 `FAST`）：是针对某一专门领域或范围，内容高度相关的 **LLM Wiki** 知识网。

### 3.2 核心特征

| 特征 | 说明 |
|------|------|
| **独立封装** | 所有属于该 FAST 的文档都在该 FAST 目录中（如 `FAST-LLM-Wiki/`、`FAST-CLAUDE/`），每个 FAST 遵循 LLM Wiki 目录结构 |
| **组装合成** | 多个 FAST 可按多维度关系连接成知识网（LLM-FAST = 多个 FAST 的集合） |
| **扁平链接** | 多个 FAST 之间采用扁平链接（`[[文件名]]`），不采用层次结构——符合 **ZettelKasten 方法论** 和 **LLM Wiki 范式** |
| **动态过程** | 念头/剪藏 → sources 来源笔记（可发布）→ synthesis 合成（可发布或打包出售） |
| **新旧权重** | 新知识权重高于旧知识（注：LLM Wiki 不适合频繁更新） |
| **间隔复习** | 配合日记和 Dataview / Bases，进行遗忘曲线间隔复习和提醒 |

### 3.3 典型工作流

```
① 剪藏多个来源（YouTube 视频、文章等）→ FAST/raw/
② 逐个誊抄为 sources 来源摘要笔记 → FAST/wiki/sources/
③ 分解为众多原子笔记（实体、概念、比较等）→ FAST/wiki/concepts/ & entities/
④ 汇总合并（去重复、去矛盾）→ FAST/wiki/synthesis/（合成笔记）
```

### 3.4 命名规则

- 格式：`FAST-<主题名>`（大写，连字符分隔）
- 示例：`FAST-FAST`、`FAST-LLM-Wiki`、`FAST-CLAUDE`
- ❌ 不使用数字编号（如 FAST-0、FAST-1）

### 3.5 初始化

每个 FAST 的目录结构可由 skill `llm-wiki-init` 初始化建立，标准结构包含：

```
FAST-<主题>/
├── raw/          # 原始资料（只读）
├── asset/        # 附件
├── logs/         # 健康检查日志
├── wiki/
│   ├── index.md      # 主索引（必须）
│   ├── sources/
│   ├── concepts/
│   ├── entities/
│   ├── synthesis/
│   └── outputs/
├── AGENTS.md     # AI 行为规范（由 llm-wiki-init 生成）
└── CLAUDE.md     # @AGENTS.md
```

### 3.6 结构化命令（在各 FAST 目录下有效）

| 命令 | 说明 |
|------|------|
| `ingest [文件]` | 摄入 raw/ 中的新来源，无参数时自动扫描所有未处理文件 |
| `query <主题>` | 基于 wiki 综合回答，可保存为 output |
| `lint` | 健康检查：死链、矛盾、孤儿文件，结果存入 logs/ |
| `init` | 调用 `llm-wiki-init` 重新初始化 |

---

## 四、Claudian 工作规范

### 4.1 文件命名

- wiki 文件：`kebab-case`（英文小写+连字符），如 `knowledge-compilation-vs-rag.md`
- diary 文件：`YYYY-MM-DD 标题.md`
- inbox 文件：随意，落地快为主

### 4.2 Frontmatter 规范

适用于 FAST wiki 与 INBOX：

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

> **DIARY 例外**：日记文件使用 `diary-log` / `diary-atom` 双层模型，schema 见 §5。

### 4.3 链接约定

- **内部引用**：`[[文件名]]`（不含路径，Obsidian 自动解析）
- **外部来源**：frontmatter 的 `sources:` 字段
- **原则**：扁平链接，不含路径——符合 ZettelKasten 方法论和 LLM Wiki 范式

### 4.4 每次 ingest 新来源时的步骤

1. 读取 raw/ 中的新文件（全文阅读）
2. 与用户确认核心要点（Co-read confirmation）
3. 创建 `wiki/sources/<来源名>.md`（摘要页）
4. 更新或新建相关 `wiki/concepts/` 和 `wiki/entities/` 页面
5. 更新 `wiki/index.md`（添加条目 + 更新日期）
6. 视情况更新 `wiki/synthesis/` 页面

### 4.5 禁止事项

- ❌ 不修改 raw/ 中的原始文件
- ❌ 不删除已有的 wiki 页面（只追加/更新）
- ❌ 不在 DIARY/ 中做自动整理（除非用户明确要求）
- ❌ 不随意修改本 CLAUDE.md（需用户确认）

---

## 五、DIARY 双层日记规范

> 适用范围：`DIARY/` 目录
> 设计目标：流水账 vs 长期记忆 分离；遗忘曲线 + Dataview/Bases 间隔复习

### 5.1 双层文件模型（扁平结构，frontmatter 区分）

| 类型 | `type` 值 | 文件名 | 用途 |
|------|-----------|--------|------|
| **容器日志** | `diary-log` | `YYYY-MM-DD.md` | 当天流水账、TODO、零碎记录，**不复习** |
| **原子卡片** | `diary-atom` | `YYYY-MM-DD <slug>.md` | 一念头/灵感/反思/教训/文摘 = 一文件，**进入复习队列** |

- **不建子目录**——所有文件平铺在 `DIARY/` 根，靠 `type` 字段过滤
- **同一天可有 1 个 log + N 个 atom**

### 5.2 Atom Frontmatter Schema

```yaml
---
type: diary-atom
subtype: 灵感        # 灵感 | 反思 | 教训 | 金句 | 文摘
                     # （任务类内容 → TASK，不放 diary）
created: YYYY-MM-DD
importance: 3         # 1–5
review_count: 0
last_review:
next_review: YYYY-MM-DD
interval: 1           # 必须 ∈ {1,2,4,8,16,32,64,128}
archived: false
promoted_to:          # 晋升到 FAST 后填 [[wikilink]]
tags: []
sources: []
---
```

### 5.3 遗忘曲线算法（简单版 · 2^N 固定间隔）

间隔阶梯：**1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 天**

复习后根据自评：

| 自评 | 处理 |
|------|------|
| 😵 忘了 | `interval = 1` |
| 😐 模糊 | `interval` 保持不变 |
| 🙂 清楚 | `interval` 翻倍（上限 128） |
| 😎 烂熟 | `archived = true`（出队，可考虑晋升到 FAST） |

每次复习更新三个字段：
- `last_review = today`
- `review_count += 1`
- `next_review = today + interval`

### 5.4 晋升通道（atom → FAST wiki）

当 atom 成熟到值得长期保留时：
1. 把内容搬到对应 FAST 的 `wiki/concepts/` 或 `wiki/synthesis/`
2. **原 atom 保留为 stub**：清空正文留一行链接，frontmatter 设 `archived: true` 且 `promoted_to: [[wiki/concepts/xxx]]`
3. 这样既保留 diary 时间线，又把"已晋升"信息留作历史索引

### 5.5 视图入口

- **Bases**：[[DIARY/diary.base]]（今日复习 / 逾期 / 高价值低曝光 / 新建未复习 / 全部）
- **Dataview**：在任意笔记里写 `FROM "DIARY" WHERE type = "diary-atom"`

### 5.6 模板

- [[Diary Log Template]] — 当天容器
- [[Diary Atom Template]] — 一个想法一张卡

### 5.7 Claudian 操作约定

- 用户写下闪念时：判断是「容器内容」还是「值得长期复习的原子」，倾向**拆成 atom**
- AI 自动新建 atom 时：必须填全 SR frontmatter，`next_review` 默认 = `created`
- 晋升时：必须保留 stub，不可直接删除 atom

### 5.8 `/diary-review` 复习流程（严格执行）

1. **查询队列**：读 [[DIARY/diary.base]] 「今日复习」视图，列出所有 `next_review <= today AND !archived` 的 atoms，按 `importance DESC, next_review ASC` 排序
2. **逐张呈现**：展示卡片标题 + 内容回顾 + 当前 SR 状态（`review_count`, `interval`）
3. **等待评分**：用户输入 `1/2/3/4` 或 `skip` / `defer` / `4+晋升`
4. **🔴 立即写入 frontmatter（核心约束）**：
   - 收到评分后**马上**用 Edit 工具更新该卡片的 frontmatter
   - **不允许批量延后处理**——上一张未写入前不进入下一张
   - 必须更新的字段：`review_count`、`last_review`、`interval`、`next_review`（必要时 `archived`、`importance`）
   - **同步更新正文**：若卡片正文含 `- [ ] 复习此卡片 (@YYYY-MM-DD)` 行（obsidian-reminder 标记），把日期改成新的 `next_review`。这样 Dataview 和 Reminder 插件指向同一日期
5. **应用算法**（见 §5.3 表格）：
   - `1 忘了` → `interval = 1`
   - `2 模糊` → `interval` 保持不变
   - `3 清楚` → `interval *= 2`（上限 128）
   - `4 烂熟` → `archived = true`，无需算 next_review
6. **回执**：在对话里展示新 frontmatter 数值，让用户能立刻校对
7. **继续下一张**，直到队列清空
8. **汇总**：本轮结束后给一张总结表，标注次日需复习的卡片数

> ⚠️ **历史教训（2026-05-15）**：曾经发生过"对话里报了新数值但未写入文件"的事故，下次复习时所有卡片状态仍是初始值，复习等于白做。**此条规则严格执行，不可省略**。

### 5.9 `/diary-lint` 健康检查（只报告，不自动修复）

扫描 `DIARY/` 所有 `diary-atom` 文件，输出报告至 `DIARY/logs/lint-YYYY-MM-DD.md`。

**A. 状态不一致**
- `review_count > 0` 但 `last_review` 为空（评了未记日期）
- `review_count == 0` 但 `last_review` 非空（记了日期但 count 没加）
- `last_review` 晚于 `next_review`（时间反了）
- `next_review = last_review + interval` 不成立（算错了）
- `archived == true` 但仍出现在「今日复习」结果（base 过滤失效信号）

**B. Schema 完整性**
- 缺必填字段：`type` / `interval` / `next_review` / `importance` / `subtype`
- `interval` ∉ {1, 2, 4, 8, 16, 32, 64, 128}
- `importance` ∉ [1, 5]
- `subtype` ∉ {灵感, 反思, 教训, 金句, 文摘}（出现 `长期TODO` 即报警，应迁移到 TASK）
- `type` ∉ {diary-log, diary-atom}

**C. 文件命名**
- 不符合 `YYYY-MM-DD …` 前缀格式
- `diary-log` 文件名却带 slug（应只有日期）
- `diary-atom` 文件名只有日期（应有 slug）

**D. 晋升一致性**
- `promoted_to` 指向的 wikilink 解析不到（死链）
- `archived == true` 且有 `promoted_to` 但正文超过 N 行（未改成 stub）
- `promoted_to` 非空但 `archived == false`（半晋升）

**E. 长期未复习堆积**
- `archived == false` 且 `next_review` 早于 today − 14 天（堆积超 2 周）

**F. Base 配置健康**
- `diary.base` 的 filter 使用 `file.folder.startsWith(...)` 而非 `== "DIARY"`（会把 `_template/` 和 `logs/` 内的污染文件混入）
- `_template/Diary Atom Template.md` 自身被 base 列出（说明过滤器漏防）
- 出现非根目录的 `diary-atom` 文件（应平铺在 `DIARY/` 根，不该在 logs/ 等子目录）

**报告格式**：

```markdown
# Diary Lint Report · YYYY-MM-DD

## A. 状态不一致 (n 条)
- [[文件]] — review_count=1 但 last_review 为空。建议：补 `last_review: YYYY-MM-DD`

## B. Schema 完整性 (n 条)
- [[文件]] — interval=3 不在阶梯内。建议：圆整到 2 或 4

...
```

**输出后**：等用户确认是否逐条修复，**不自动改文件**（呼应 FAST-FAST lint 流程的"只报告"原则）。

---

## 六、TASK 任务追踪规范

> 适用范围：`TASK/` 目录
> 设计目标：与日记分离，用优先级和截止日期而非遗忘曲线来管理

### 6.1 任务文件格式

文件名：`YYYY-MM-DD <task-slug>.md`

Frontmatter schema：

```yaml
---
type: task
title:
priority: 3              # 1(低) ~ 5(紧急) 默认 3 —— 与 diary.importance 同方向（数大=重要）
status: backlog          # backlog | active | blocked | done | cancelled
created: YYYY-MM-DD
due:                     # YYYY-MM-DD，可选
tags: []
dependencies: []         # 可填 "[[task-slug]]"
---
```

### 6.2 任务生命周期

| 状态 | 含义 | 动作 |
|------|------|------|
| `backlog` | 未开始，优先级待定 | 评估 → 移至 active/blocked |
| `active` | 进行中 | 更新进度 → done/blocked |
| `blocked` | 被卡住，等待依赖 | 解决依赖 → active |
| `done` | 完成 | 存档到「已完成」视图 |
| `cancelled` | 取消，不做了 | 存档 |

### 6.3 task.base 视图

- **活跃任务** — status ≠ done/cancelled，按优先级 + 截止日期排序
- **逾期** — due < today，还未完成
- **本周截止** — due ∈ [today, today+7)
- **已完成** — status == done，反向时间序
- **状态分组卡片** — 按 status 分组，卡片视图（Bases 暂不支持原生 kanban）

### 6.4 vs diary-atom 的区别

| 维度 | diary-atom | task |
|------|-----------|------|
| **周期** | 遗忘曲线（间隔复习） | 优先级 + 截止（线性推进） |
| **目标** | 防止遗忘，强化记忆 | 推进完成，交付价值 |
| **评指标** | review_count, interval | status, progress |
| **适用场景** | 知识卡片、灵感、反思 | 工程任务、项目、功能 |

### 6.5 `/todo-lint` 健康检查（只报告，不自动修复）

扫描 `TASK/` 所有 `type: task` 文件，输出至 `TASK/logs/lint-YYYY-MM-DD.md`。

**A. 状态死锁 / 停滞**
- `status: blocked` 但 `dependencies: []`（被卡却没说被谁卡）
- `status: active` 超过 30 天 mtime 未更新（停滞任务）
- `status: done` 但仍有未来的 `due`（已完成可清空 due）

**B. Schema / 字段范围**
- `priority` ∉ [1, 5]
- `status` ∉ {backlog, active, blocked, done, cancelled}
- `due` 格式非 `YYYY-MM-DD`
- 缺必填：`type`、`priority`、`status`、`created`

**C. 依赖完整性**
- `dependencies` 里的 `[[task-slug]]` 死链
- 循环依赖（A→B→A）

**D. 逾期堆积**
- `due < today − 7 天` 且 `status ∉ {done, cancelled}`（逾期超 1 周仍未处理）

**E. 高优先级闲置**
- `priority >= 4` 且 `status == backlog` 超过 7 天未升级到 active

**F. Base 配置健康**
- `task.base` 的 filter 使用 `file.folder.startsWith(...)` 而非 `== "TASK"`（会把 `_template/` 和 `logs/` 内的污染文件混入）
- `_template/Task Template.md` 自身被 base 列出（说明过滤器漏防）
- 出现非根目录的 `task` 文件（应平铺在 `TASK/` 根）

**输出后**：让用户决定如何处理，**不自动改文件**。

---

## 七、LLM Wiki 范式参考（已消化）

> 详细内容见 [[OPC/学/FAST-LLM-Wiki/wiki/index.md]]

### Karpathy 三层架构

- **raw/**：原始资料，LLM 只读
- **wiki/**：LLM 编译维护的知识页面网络，支持反复重写
- **schema**：人类制定的编译规则（格式、禁忌、结构）

### 关键判断

| 结论 | 来源 |
|------|------|
| LLM Wiki 是 Zettelkasten 的自动化版，接管 80% 机械簿记 | 王树义 |
| 适合 ~100 个来源以内的个人/小团队场景 | 程序员老李 |
| 最佳实践：Wiki（概念沉淀）+ RAG（事实召回）混合 | 多篇综合 |
| 生产端用 Markdown（高效），消费端考虑 HTML（可交互） | Tarek Sherif + Lex Fridman |
| 20% 的判断（读什么/留什么/怎么链接）不能外包给 AI | 王树义 |

---

## 八、待确认事项

- [x] **知识库名称**：LLM-FAST
- [x] **FAST 命名规则**：主题命名，`FAST-<主题>`，不用数字编号
- [x] **FAST-FAST**：存放 FAST 方法论的完整定义与说明
- [ ] **SCHEMA.md**：是否为每个 FAST 创建单独的编译规则文件？
- [ ] **log.md**：是否需要追加式操作日志？
- [ ] **HTML 展示层**：outputs/ 是否生成 HTML 格式可视化报告？
- [ ] **晋升触发器**：INBOX → FAST 由用户手动触发，还是 AI 定期扫描建议？

---

## 九、快速入口

| 目的 | 文件 |
|------|------|
| ⭐ FAST 方法论完整定义 | [[OPC/学/FAST-FAST/wiki/index.md]] |
| LLM Wiki 范式研究 | [[OPC/学/FAST-LLM-Wiki/wiki/index.md]] |
| 知识编译 vs RAG | [[OPC/学/FAST-LLM-Wiki/wiki/concepts/knowledge-compilation-vs-rag.md]] |
| Zettelkasten 与 LLM Wiki | [[OPC/学/FAST-LLM-Wiki/wiki/concepts/zettelkasten-llm-wiki.md]] |
| Claude Code 研究 | [[OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md]] |
| LLM-FAST 总索引 | [[index.md]] |
| 今日收件箱 | [[INBOX/Inbox.md]] |
| **日记复习视图** | [[DIARY/diary.base]] |
| **任务追踪看板** | [[task.base]] |

---
## 【补充】

每一个FAST都是一个LLM-Wiki的OB仓库，可以用OB单独打开和处理。


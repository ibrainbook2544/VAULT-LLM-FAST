---
title: 总索引
type: index
tags:
  - index
  - fast
  - knowledge-base
created: 2026-05-16T16:37
updated: 2026-05-20 16:03:56
contentHash: 6ba77eaec7b67a1663e69c7cdf057805905697433a3b55febf3f866f86f1d6f8
---

# 总索引

> 多个 FAST 子知识库的全局入口。
> 每个 FAST-* 保留自己的
>  AGENTS.md 和 CLAUDE.md。

---

## 当前 FAST 列表

| FAST          | 主题                               | 状态    | 索引入口                                    | 规范文件                                |
| ------------- | -------------------------------- | ----- | --------------------------------------- | ----------------------------------- |
| FAST-FAST     | FAST 方法论定义与说明（本知识库/LLM-FAST 的基础） | 🟢 活跃 | [[OPC/学/FAST-FAST/wiki/index]]     | [[OPC/学/FAST-FAST/AGENTS]]     |
| FAST-LLM-Wiki | LLM Wiki 范式研究（Karpathy 方法论等）     | 🟢 活跃 | [[OPC/学/FAST-LLM-Wiki/wiki/index]] | [[OPC/学/FAST-LLM-Wiki/AGENTS]] |
| FAST-CLAUDE   | Claude AI 深度研究（能力、提示工程、工具生态）     | 🟢 活跃 | [[OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index]]   | [[OPC/AI/AI工具/Claude/FAST-CLAUDE/AGENTS]]   |

---

## 操作日志

| 时间 | 操作 | 说明 |
| --- | --- | --- |
| 2026-05-14 | 初始化 | 将 FAST-0 重命名为 FAST-LLM-Wiki |
| 2026-05-14 | 新增 | 创建 FAST-CLAUDE |
| 2026-05-14 | 重命名 | FAST-1 → FAST-FAST |
| 2026-05-14 | ingest | FAST-FAST 首次摄入，生成 1 source + 5 concepts + 1 entity |
| 2026-05-14 | undo | 撤回共享 AGENTS.md 方案，恢复每个 FAST 独立 AGENTS.md |
| 2026-05-15 | 移动 | FAST-FAST 从 VAULT-FAST/FAST-FAST 迁移到 OPC/学/FAST-FAST，更新所有引用链接 |
| 2026-05-15 | 移动 | FAST-LLM-Wiki 从 VAULT-FAST/FAST-LLM-Wiki 迁移到 OPC/学/FAST-LLM-Wiki，更新所有引用链接 |
| 2026-05-15 | 移动 | FAST-CLAUDE 从 VAULT-FAST/FAST-CLAUDE 迁移到 OPC/AI/AI工具/Claude/FAST-CLAUDE，更新所有引用链接 |
| 2026-05-15 | 迁移 | VAULT-FAST/index.md 迁移至 VAULT-LLM-FAST/index.md，VAULT-FAST 目录简化 |

---

## 快速导航

### 📚 按主题浏览
- **基础理论** → [[OPC/学/FAST-FAST/wiki/index]]
- **知识管理范式** → [[OPC/学/FAST-LLM-Wiki/wiki/index]]
- **AI 工具研究** → [[OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index]]

### ⚙️ 系统配置
- **AI 助手上下文** → [[CLAUDE.md]]
- **全局收件箱** → [[VAULT-INBOX/Inbox.md]]
- **日记与笔记** → [[VAULT-DIARY/]]

### 📊 统计与可视化
- **统计仪表板** → [[dashboard]]（类型/标签/创建分布、FAST 对比、访问状态）

---

## 📊 最多阅读的笔记 Top 20

```dataview
TABLE views AS "👁️ 浏览", last_visited AS "最近阅读", type AS "类型"
WHERE views > 0
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
  AND type != "diary-log"
SORT views DESC
LIMIT 20
```

---

## ❄️ 冷门笔记 Top 20

> 浏览少 + 久未访问 → 值得重新看看，或考虑归档/晋升
> 全库扫描，仅排除：VAULT-TODO / 模板 / 附件 / raw / logs / Inbox.md / 已归档 cards

```dataview
TABLE views AS "👁️ 浏览", last_visited AS "最近阅读", type AS "类型", file.mtime AS "最后修改"
WHERE file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
  AND type != "diary-log"
  AND archived != true
SORT views ASC, last_visited ASC, file.mtime ASC
LIMIT 20
```

---

## 🗓️ 本周访问的笔记

> 最近 7 天内阅读过的笔记（按最近优先）

```dataview
TABLE views AS "👁️ 浏览", last_visited AS "最近阅读", type AS "类型"
WHERE last_visited
  AND date(last_visited) >= date(today) - dur(7 days)
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
SORT last_visited DESC, views DESC
```

---

---
title: LLM-FAST 知识库统计仪表板
type: dashboard
created: 2026-05-16
tags:
  - dashboard
  - analytics
views: 5
updated: 2026-05-16T20:03
last_visited: 2026-05-16
---

# 📊 LLM-FAST 知识库仪表板

> 全库内容分布、活跃度与思考重心。返回 [[index]] 主入口。

---

## A. 笔记类型分布

> 按 `type` 字段统计——`synthesis`/`concept`/`entity`/`source`/`diary-atom` 等各多少篇

```dataview
TABLE WITHOUT ID
  type AS "类型",
  length(rows) AS "数量"
WHERE type
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
GROUP BY type
SORT length(rows) DESC
```

---

## B. 标签热度排行 Top 30

> 哪些主题占据了你的思考重心

```dataview
TABLE WITHOUT ID
  tag AS "标签",
  length(rows) AS "出现次数"
FLATTEN file.tags AS tag
WHERE tag
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
GROUP BY tag
SORT length(rows) DESC
LIMIT 30
```

---

## C. 创建日期分布（按月）

> 每月新建笔记数——反映写作节奏与活跃期

```dataview
TABLE WITHOUT ID
  month AS "月份",
  length(rows) AS "新建数"
WHERE file.cday
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
GROUP BY dateformat(file.cday, "yyyy-MM") AS month
SORT month DESC
```

---

## D. 各 FAST 笔记数对比

> 每个 FAST 知识库的体量

```dataview
TABLE WITHOUT ID
  fast AS "FAST",
  length(rows) AS "笔记数"
FLATTEN choice(contains(file.folder, "FAST-FAST"), "FAST-FAST",
       choice(contains(file.folder, "FAST-LLM-Wiki"), "FAST-LLM-Wiki",
       choice(contains(file.folder, "FAST-CLAUDE"), "FAST-CLAUDE", "OTHER"))) AS fast
WHERE contains(file.folder, "FAST-")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND !contains(file.folder, "_template")
  AND file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
GROUP BY fast
SORT length(rows) DESC
```

---

## E. 总览数字

```dataview
TABLE WITHOUT ID
  "全部笔记（除排除项）" AS "指标",
  length(rows) AS "数量"
WHERE file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
GROUP BY true
```

---

## F. 已访问 vs 未访问

```dataview
TABLE WITHOUT ID
  status AS "状态",
  length(rows) AS "数量"
FLATTEN choice(views > 0, "✅ 已访问", "⏳ 未访问") AS status
WHERE file.name != "index"
  AND file.name != "AGENTS"
  AND file.name != "CLAUDE"
  AND !startswith(file.folder, "VAULT-TODO")
  AND !contains(file.folder, "_template")
  AND !contains(file.folder, "_attachment")
  AND !contains(file.folder, "raw")
  AND !contains(file.folder, "logs")
  AND file.path != "VAULT-INBOX/Inbox.md"
GROUP BY status
SORT status DESC
```

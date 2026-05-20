---
type: diary-log
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
tags: []
---

## 🔔 今日提醒

### 📚 待复习卡片

```dataview
TABLE WITHOUT ID
  file.link AS "卡片",
  subtype AS "类型",
  importance AS "重要",
  review_count AS "次数",
  interval AS "间隔"
FROM "VAULT-DIARY"
WHERE type = "diary-atom"
  AND !archived
  AND next_review <= date(today)
SORT importance DESC, next_review ASC
```

### ⏰ 逾期任务（VAULT-TODO）

```dataview
TABLE WITHOUT ID
  file.link AS "任务",
  priority AS "优先级",
  status AS "状态",
  due AS "截止"
FROM "VAULT-TODO"
WHERE type = "task"
  AND status != "done"
  AND status != "cancelled"
  AND due
  AND due < date(today)
SORT priority DESC, due ASC
```

### 🎯 今日 / 本周截止

```dataview
TABLE WITHOUT ID
  file.link AS "任务",
  priority AS "优先级",
  status AS "状态",
  due AS "截止"
FROM "VAULT-TODO"
WHERE type = "task"
  AND status != "done"
  AND status != "cancelled"
  AND due
  AND due >= date(today)
  AND due <= date(today) + dur(7 days)
SORT due ASC, priority DESC
```

> 💡 看到上述列表？直接 `/diary-review` 启动复习。

---

## 记录


## TODO


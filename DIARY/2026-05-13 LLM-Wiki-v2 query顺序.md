---
type: diary-atom
subtype: 灵感
created: 2026-05-13
importance: 4
review_count: 1
last_review: 2026-05-15
next_review: 2026-05-16
interval: 1
archived: false
promoted_to:
tags:
  - LLM-Wiki
  - query
  - 检索顺序
sources: []
updated: 2026-05-16T16:37
---

# LLM-Wiki v2：query 查找顺序

query 查找顺序：

1. 首先 **outputs**（含 query 结果、比较、FAST 原子大纲笔记等）
2. 然后 **concepts** / **entities** 等原子
3. 然后 **sources**（誊抄笔记）
4. 最后 **raw**

每一步骤都需要**分步选择确认**，找到足够结果就终止——可减少 token 消耗。

~~目录结构改进：加比较，减 log，移动外面 lint 报告~~（已废弃）

---

## 📅 复习提醒

- [ ] 复习此卡片 (@2026-05-16)

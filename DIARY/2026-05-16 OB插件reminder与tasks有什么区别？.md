---
type: diary-atom
subtype: 灵感
created: 2026-05-16
importance: 3
review_count: 0
last_review:
next_review: 2026-05-16
interval: 1
archived: false
promoted_to:
tags: []
sources: []
views: 2
last_visited: 2026-05-16
updated: 2026-05-16T17:30
---

# 2026-05-16 OB插件Reminder与Tasks有什么区别？

## Reminder vs Tasks 对比

|维度|**Reminder**（uphy）|**Tasks**（schemar）|
|---|---|---|
|**核心定位**|主动**推送通知**|任务**查询管理**|
|**语法**|`- [ ] 事项 (@2026-05-16 09:00)`|`- [ ] 事项 📅 2026-05-16 🔼`|
|**桌面通知**|✅ 到点弹系统通知|❌ 不弹（要靠别的插件）|
|**侧栏面板**|✅ 列出未来提醒|✅ 查询块面板|
|**过滤/分组**|❌ 基本没有|✅ 强大查询语言|
|**优先级/标签**|❌|✅ emoji 元数据|
|**递归任务**|❌|✅ 完成后自动创建下一个|
|**统计**|❌|✅ 完成进度|

---

## 你的场景分析

|需求|已用|解决|
|---|---|---|
|到点弹通知|Reminder ✅|已覆盖|
|查询「今日复习」「逾期」「本周截止」|Dataview + Bases ✅|已覆盖|
|任务优先级/状态|frontmatter + Bases ✅|已覆盖|
|递归任务 / GTD|❌ 暂无需求|—|

---

## 我的建议

**只用 Reminder，不加 Tasks。**

理由：

1. **你已经走 frontmatter + Dataview/Bases 路线**——Tasks 是 inline 元数据 + 查询块路线，两套并行会乱
2. 你的 `diary-atom` 和 `task` 已经用 YAML frontmatter 管 priority/status/due，比 Tasks 的 emoji 语法更结构化
3. Bases 的视图能力已经覆盖 Tasks 的查询场景
4. Reminder 只承担「弹通知」这一件事，分工清晰

**什么情况下再加 Tasks：**

- 想要正文内联 `- [ ] 写文章 📅 2026-05-20 🔼`（不开新文件）
- 需要递归任务（每周一例会）
- 项目级 GTD 而不是知识 SR

目前都不需要——保持 Reminder 单飞即可。


---

## Reminder 插件内置自动补全

**已经配好了**，不需要额外设置。

触发方式：

1. 任意笔记里写 `- [ ] 要提醒的事情 (`
2. 紧接着输入 `@`
3. **自动弹出日期时间选择器**（日历 UI）
4. 点选日期 + 时间 → 自动填入 `(@2026-05-16 14:00)`

---

从你的 `data.json` 看，触发符已经设好：

```json
"autoCompleteTrigger": "(@"
```

json

所以输入 `(@` 就会弹选择器，不需要手敲日期格式。

---

## 📅 复习提醒

- [ ] OB Reminder与Tasks区别 (@2026-05-16)

<!--
  上面是 obsidian-reminder 插件的内联语法，到日期会自动通知。
  /diary-review 流程会同时更新 frontmatter.next_review 和上方括号内日期。
-->

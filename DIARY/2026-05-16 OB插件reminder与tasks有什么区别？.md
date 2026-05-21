---
type: diary
subtype: card
created: 2026-05-16
importance: 3
sr_review_count: 10
sr_next_review_datetime: 2026-05-19 19:49:49
tags:
  - 灵感
sources: []
views: 10
last_visited: 2026-05-19 22:11:13
updated: 2026-05-20 16:25:41
contentHash: 36b94a7088d5c6dde202f1f565038e6f94f3d3a4eccc0cea0668116abf786ae9
---


```dataviewjs
const RATINGS = [
    { n: 1, label: "1 忘记", color: "#c0392b" },
    { n: 2, label: "2 模糊", color: "#d68910" },
    { n: 3, label: "3 还行", color: "#f1c40f" },
    { n: 4, label: "4 牢记", color: "#2980b9" },
    { n: 5, label: "5 完成", color: "#27ae60" },
];

const box = dv.el("div", "", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:8px;padding:10px 14px;margin:8px 0 16px;background:var(--background-secondary);" } });

const title = box.createEl("div", { text: "🧠 SR 记忆评估" });
title.style.cssText = "font-weight:700;font-size:14px;color:var(--text-accent);margin-bottom:8px;letter-spacing:1px;text-transform:uppercase;";

const row = box.createEl("div");
row.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;";

for (const r of RATINGS) {
    const btn = row.createEl("button", { text: r.label });
    btn.style.cssText = `background:${r.color};color:#fff;padding:6px 16px;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:500;`;
    btn.onmouseenter = () => btn.style.opacity = "0.8";
    btn.onmouseleave = () => btn.style.opacity = "1";
    btn.onclick = async () => {
        globalThis.__srRating = r.n;
        globalThis.__srFilePath = dv.current().file.path;
        const code = await app.vault.adapter.read("_scripts/sr-evaluate.js");
        try {
            await eval(code);
        } finally {
            delete globalThis.__srRating;
            delete globalThis.__srFilePath;
        }
    };
}
```

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

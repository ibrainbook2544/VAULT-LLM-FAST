---
type: task
subtype: todo
title:
priority: 3
status: backlog
due:
tags: []
dependencies: []
---

> **subtype**: todo（自己执行） | reminder（OB Reminder 到点提醒） | shell（Shell Reminder 到点自动跑脚本）
> **priority**: 1(低) ~ 5(紧急)
> **status**: backlog | active | blocked | done | cancelled
>
> reminder 任务：正文写 `- [ ] 内容 (@YYYY-MM-DD HH:mm)`，可选 frontmatter `remind_at:`
> shell 任务：正文写 `- [ ] 内容 (@时间) [shell: 脚本路径]`，可选 frontmatter `schedule:` / `script:`

<%* /* ↓↓↓ 下面的属性按钮面板仅存在于模板预览；用 Templater 新建笔记时会被剥离，不写入新任务 */ if (false) { %>
```dataviewjs
const file = app.vault.getAbstractFileByPath(dv.current().file.path);
async function setProp(key, val) {
    await app.fileManager.processFrontMatter(file, fm => {
        fm[key] = val;
        fm.updated = window.moment().format("YYYY-MM-DDTHH:mm");
    });
    new Notice(`${key} → ${val}`);
}

const GROUPS = [
    { key: "subtype", title: "🏷️ 任务类型 subtype", def: "todo", opts: [
        { v: "todo",     label: "📝 todo",     color: "#7f8c8d" },
        { v: "reminder", label: "⏰ reminder", color: "#2980b9" },
        { v: "shell",    label: "⚙️ shell",    color: "#8e44ad" },
    ]},
    { key: "priority", title: "🔥 优先级 priority", def: 3, opts: [
        { v: 1, label: "1 低",   color: "#95a5a6" },
        { v: 2, label: "2",      color: "#7fb3d5" },
        { v: 3, label: "3 中",   color: "#f1c40f" },
        { v: 4, label: "4",      color: "#e67e22" },
        { v: 5, label: "5 紧急", color: "#c0392b" },
    ]},
    { key: "status", title: "📊 状态 status", def: "backlog", opts: [
        { v: "backlog",   label: "backlog",   color: "#7f8c8d" },
        { v: "active",    label: "active",    color: "#27ae60" },
        { v: "blocked",   label: "blocked",   color: "#c0392b" },
        { v: "done",      label: "done",      color: "#2980b9" },
        { v: "cancelled", label: "cancelled", color: "#566573" },
    ]},
];

const box = dv.el("div", "", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:8px;padding:10px 14px;margin:8px 0 16px;background:var(--background-secondary);" } });

for (const g of GROUPS) {
    const title = box.createEl("div", { text: g.title });
    title.style.cssText = "font-weight:700;font-size:13px;color:var(--text-accent);margin:8px 0 6px;letter-spacing:1px;text-transform:uppercase;";
    const row = box.createEl("div");
    row.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;";
    for (const o of g.opts) {
        const btn = row.createEl("button", { text: o.label });
        const isActive = () => o.v === (dv.current()[g.key] ?? g.def);
        btn.style.cssText = `background:${o.color};color:#fff;padding:6px 14px;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:500;opacity:${isActive() ? "1" : "0.45"};outline:${isActive() ? "2px solid var(--text-accent)" : "none"};`;
        btn.onmouseenter = () => btn.style.opacity = "0.8";
        btn.onmouseleave = () => btn.style.opacity = isActive() ? "1" : "0.45";
        btn.onclick = () => setProp(g.key, o.v);
    }
}
```
<%* } %>

## 目标

<!-- 一句话描述这个任务的 WHY -->

## 清单

- [ ]

## 进度

## 备注

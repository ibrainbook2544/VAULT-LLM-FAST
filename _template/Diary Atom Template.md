<%*
const triggerFile = tp.config.active_file?.basename ?? "untitled";
const raw = tp.file.selection()?.trim() ?? "";
const sanitized = raw
  .split(/\r?\n/)                      // 多行 → 拆分
  .map(l => l.replace(/^>+\s*/,"").trim()) // 去掉 blockquote ">" 前缀
  .filter(l => l.length > 0)          // 移除空行
  .join(" ")                           // 合并为一行
  .replace(/[\\/:*?"<>|#\[\]\^`]/g,"") // 去除文件名非法字符
  .replace(/\s+/g," ")                 // 折叠多余空格
  .trim()
  .slice(0, 80);                       // 限制最大长度
const slug = sanitized.length > 0 ? sanitized : triggerFile;
const date = tp.date.now("YYYY-MM-DD");
await tp.file.rename(`${date} ${slug}`);
-%>
---
type: diary-atom
subtype: 灵感
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
importance: 3
sr_review_count: 0
sr_next_review_datetime: <% moment().add(15, "minutes").format("YYYY-MM-DD HH:mm:ss") %>
tags: []
sources:
  - "[[<% triggerFile %>]]"
views: 0
last_visited:
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
        const code = await app.vault.adapter.read("_scripts/sr-evaluate.js");
        eval(code);
        delete globalThis.__srRating;
    };
}
```

# <% slug %>

<!-- 一句话讲清楚核心，再展开 -->

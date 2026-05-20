---
type: diary-atom
subtype: 灵感
created: 2026-05-13
importance: 4
sr_review_count: 3
sr_next_review_datetime: 2026-05-23 22:04:40
tags:
  - LLM-Wiki
  - query
  - 检索顺序
sources: []
updated: 2026-05-19T22:04
views: 7
last_visited: 2026-05-19 20:41:50
contentHash: bfc748e83757d6a86b5b6aaad55afb16d0ac4fcd45f82350a4887f4bad3a351b
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


# LLM-Wiki v2：query 查找顺序

query 查找顺序：

1. 首先 **outputs**（含 query 结果、比较、FAST 原子大纲笔记等）
2. 然后 **concepts** / **entities** 等原子
3. 然后 **sources**（誊抄笔记）
4. 最后 **raw**

每一步骤都需要**分步选择确认**，找到足够结果就终止——可减少 token 消耗。

~~目录结构改进：加比较，减 log，移动外面 lint 报告~~（已废弃）


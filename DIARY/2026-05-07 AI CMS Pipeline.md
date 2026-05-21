---
type: diary
subtype: card
created: 2026-05-18 15:39:34
importance: 2
sr_review_count: 3
sr_next_review_datetime: 2026-05-19 22:04:54
tags:
  - 文摘
  - AI
  - CMS
  - Pipeline
  - 架构
sources: []
updated: 2026-05-19T20:59
views: 31
last_visited: 2026-05-19 22:08:47
contentHash: f391f70d7829ed4b5c4d15ea5e9f65e51873da405c162d309da2c8b27e7bb4a0
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


# AI CMS Pipeline


```
OB Vault (Markdown)
│
├── Markdown 内容资产
├── Frontmatter 元数据
├── WikiLink
├── Dataview
└── Attachments
        ↓
OB CLI / Dataview
        ↓
Vault语义解析 / 获取内容 & 元数据
        ↓
markdown-it-py（职责既能“渲染html”又可“理解内容”）
        ↓
AST处理 / token
        ↓
Python Pipeline（AI处理层：自定义 Obsidian兼容）
│
├── Vault扫描
├── Wikilink解析 + 文件映射
├── URL映射
├── 自动摘要
├── 标签分类
├── 图片上传
├── Markdown预处理
├── AI增强
├── SEO
├── chunk
└── metadata
        ↓
输出和上传“增强后的Markdown” (Markdown原文保留)
        ↓
WordPress（可扩展多平台发布！！！）
        ↓
WP Editor.md / Jetpack （渲染）
        ↓
最终HTML

---------------多平台发布---------------

    - WordPress
    - Ghost
    - Notion
    - Medium
    - 静态站

-----------wikilink + 文件映射------------

OB CLI
   ↓
建立 Vault 索引！！！！！！！！！！！！
   ↓
wikilink → 文件映射
   ↓
markdown-it-py
   ↓
遇到 [[AI]]
   ↓
查询映射表！！！！！！！！！！
   ↓
生成真实URL

=================================

最终推荐架构（终极版）
Markdown
↓
AST
↓
Transform Plugins
│
├── Wikilink
├── Image
├── SEO
├── Normalize
├── Metadata
└── Chunk
↓
Enhanced Markdown
+
metadata.json
↓
Distribution Adapters
↓
WordPress / Ghost / Static Site


```

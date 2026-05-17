---
type: diary-atom
subtype: 反思
created: 2026-05-07
importance: 4
review_count: 1
last_review: 2026-05-15
next_review: 2026-05-17
interval: 2
archived: false
promoted_to:
tags:
  - AI
  - CMS
  - Pipeline
  - 架构
sources: []
updated: 2026-05-16T16:37
views: 1
last_visited: 2026-05-16
---

# AI CMS Pipeline

```

Obsidian Vault (Markdown)
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
---

## 📅 复习提醒

- [ ] 复习此卡片 (@2026-05-17)

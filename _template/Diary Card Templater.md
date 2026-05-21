<%*
const triggerFile = tp.config.active_file?.basename ?? "";
let raw = "";
try {
  raw = tp.file.selection()?.trim() ?? "";
} catch (e) {
  // QuickAdd 从命令面板新建文件时可能没有 active editor，
  // 此时 tp.file.selection() 会抛出 "Active editor is null"。
  raw = "";
}
const sanitized = raw
  .split(/\r?\n/)                      // 多行 → 拆分
  .map(l => l.replace(/^>+\s*/,"").trim()) // 去掉 blockquote ">" 前缀
  .filter(l => l.length > 0)          // 移除空行
  .join(" ")                           // 合并为一行
  .replace(/[\\/:*?"<>|#\[\]\^`]/g,"") // 去除文件名非法字符
  .replace(/\s+/g," ")                 // 折叠多余空格
  .trim()
  .slice(0, 80);                       // 限制最大长度
const slug = sanitized || triggerFile || "untitled";
const date = tp.date.now("YYYY-MM-DD");
await tp.file.rename(`${date} ${slug}`);
-%>
---
type: diary
subtype: card
importance: 3
sr_review_count: 0
sr_next_review_datetime: <% moment().add(15, "minutes").format("YYYY-MM-DD HH:mm:ss") %>
tags: []
<%* if (triggerFile) { -%>
sources:
  - "[[<% triggerFile %>]]"
<%* } else { -%>
sources: []
<%* } -%>
views: 0
last_visited:
---

```dataviewjs
(async () => {
    const code = await app.vault.adapter.read("_scripts/sr-evaluate.js");
    await eval(code);
})();
```

# <% slug %>

<!-- 一句话讲清楚核心，再展开 -->

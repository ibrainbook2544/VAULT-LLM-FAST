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
created: <% tp.date.now("YYYY-MM-DD") %>
importance: 3
review_count: 0
last_review:
next_review: <% tp.date.now("YYYY-MM-DD") %>
interval: 1
archived: false
promoted_to:
tags: []
sources:
  - "[[<% triggerFile %>]]"
views: 0
last_visited:
---

# <% slug %>

<!-- 一句话讲清楚核心，再展开 -->

---

## 📅 复习提醒

- [ ] 复习此卡片「<% slug %>」(@<% tp.date.now("YYYY-MM-DD") %>)

<!--
  上面是 obsidian-reminder 插件的内联语法，到日期会自动通知。
  /diary-review 流程会同时更新 frontmatter.next_review 和上方括号内日期。
-->

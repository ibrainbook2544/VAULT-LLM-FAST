---
created: 2026-05-19T17:05
updated: 2026-05-19T17:44
contentHash: fad738eff99eaaa93a67858671f2569ce0372fe17dc58027e9963f5077d733f7
---

## SR算法用到的SR插件设置栏目

```
SR触发间隔：默认15分钟
```


## SR相关模板：/_template/Diary Atom Template.md

> 注意：假设SR只针对 `Diary Atom`

当用QuickAdd（New Diary Atom）新建一个SR页面时，自动套用此模板。

模板包括：SR相关属性、SR记忆评估按钮

### SR相关属性（SR Frontmatter）

```yaml
sr_review_count: 0
sr_next_review_datetime: YYYY-MM-DD HH:mm:ss
```

### SR记忆评估按钮（数字代表记忆程度）

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


## SR数据库：`sr.base`

> 注意：假设SR只针对 `Diary Atom`

在 `DIARY` 文件夹内所有 `diary-atom`，按照 `sr_next_review_datetime` 倒序排列，列出 `sr_next_review_datetime` 小于当前日期时间之前的20个记录。

其它字段：复习次数（sr_review_count）、下次复习时间（sr_next_review_datetime）、逾期天数重要程度、浏览次数


## SR算法

### 初始状态

```
sr_review_count：0
sr_next_review_datetime：<当前日期时间> + SR触发间隔（默认15分钟）
```

### 点击按钮 `5 完成`（本轮复习完成，跨日推进）

```
base = max(sr_next_review_datetime, 当前日期时间)   ← 钳制到未来，避免逾期堆积
sr_next_review_datetime = base + 24小时 * 2 ^ sr_review_count
sr_review_count = sr_review_count + 1
最后，自动打开 sr.base 首行记录的页面；若无记录则关闭当前页面
```

间隔阶梯（按钮 5 第 N 次点击）：1, 2, 4, 8, 16, 32, 64, 128 … 天

### 点击按钮 `1-4`（本轮未完成，今日内反复巩固）

```
sr_next_review_datetime = 当前日期时间 + SR触发间隔 * 2 ^ (记忆程度 - 1)
sr_review_count 保持不变   ← 本轮尚未结束
最后，自动打开 sr.base 首行记录的页面；若无记录则关闭当前页面
```

间隔表（默认 SR触发间隔 = 15min）：

| 按钮 | 记忆程度 | 增量 |
|------|---------|------|
| 1 忘记 | 1 | +15min |
| 2 模糊 | 2 | +30min |
| 3 还行 | 3 | +60min |
| 4 牢记 | 4 | +120min |




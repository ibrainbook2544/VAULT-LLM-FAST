---
type: diary
subtype: card
created: 2026-05-08
importance: 1
sr_review_count: 2
sr_next_review_datetime: 2026-05-19 19:04:55
tags:
  - 文摘
  - OPC
  - ClawBot
  - agents
  - 一人公司
sources:
  - https://www.superlinear.academy/c/share-your-projects/clawbot-x-opc-1b-token-18-30-agents
updated: 2026-05-19T22:10
views: 11
last_visited: 2026-05-19 17:55:00
contentHash: c375a6c71bd96d387f511164ae9e4b6bdcdaabe49e638089b968d5e1304b3a59
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

# 【文摘】我用 ClawBot × OPC 跑一人公司一年了 — 现在每天烧 1B token / 18 个产品 / 30+ agents

https://www.superlinear.academy/c/share-your-projects/clawbot-x-opc-1b-token-18-30-agents

我赌这个范式一年了。今天的进度：

• 30+ agents 在跑，每天烧 1B tokens

• 18 个产品 ship 了（[ai-nate.com](https://ai-nate.com/) 都有 live URL）

• 7,500+ subscribers / 4,000+ active users，跨 10 个平台

![](https://app.circle.so/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSnRrSUFvPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b6c6bcea6256d6c2f60199cbab2878e7feb80c28/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJNEJEQTZDbk5oZG1WeWV3WTZDbk4wY21sd1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--7535ef66ff04b52d1ea165e904a77a64f9cc7389/clawbot-crew-agents-4cards.png)

🔍 Research Agent — 调查研究 / fact check / 信息搜集，个人知识库会随你长。我每天用它做行业调研、同行追踪、社区调查，一个 agent 干一周的活。

🎯 GTM Agent — OPC 自己 GTM 最大的坑是 voice + 节奏。这个 agent 帮你设计 ICP + positioning + persona，然后跑 phase ladder engagement engine——observation 先，没验证前不会 auto-post。找你前 100 个对的用户，不靠 spam。

📈 Trading Agent — 做 OPC 没时间自己炒股，我直接交给 agent。跑了 3 个月，总收益率 9.7%。不多，但是 OPC 的续命金丹——补贴家用，让你能继续 explore。

📣 Content Agent — 跨平台发布（X / LinkedIn / YouTube / 小红书 / 视频号 / B 站）。这是我 7,500 subs 怎么来的——不靠某一个平台死磕，靠 per-channel 一致性。

---
sr_review_count: 0
sr_next_review_datetime:
---

```dataviewjs
(async () => {
    const DT_FMT = "YYYY-MM-DD HH:mm:ss";
    const file = app.vault.getAbstractFileByPath(dv.current().file.path);

    // 护栏：在 _template/ 里（即打开模板本身）时不执行，避免污染模板
    if (file.path.startsWith("_template/")) {
        dv.paragraph("📋 模板预览：基于此模板新建笔记后，SR 属性会自动补齐。");
        return;
    }

    async function ensureSrFields() {
        const fm = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
        const needsInit =
            fm.sr_review_count == null ||
            !fm.sr_next_review_datetime;

        if (!needsInit) return;

        await app.fileManager.processFrontMatter(file, m => {
            if (m.sr_review_count == null) m.sr_review_count = 0;
            if (!m.sr_next_review_datetime) m.sr_next_review_datetime = moment().add(15, "minutes").format(DT_FMT);
        });
        new Notice(`🧠 已为 ${file.basename} 补齐 SR 属性`);
    }

    await ensureSrFields();

    const code = await app.vault.adapter.read("_scripts/sr-evaluate.js");
    await eval(code);
})();
```

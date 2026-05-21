/**
 * SR Evaluate — single shared SR script.
 *
 * One file owns both responsibilities:
 * 1) render the SR rating panel when called without globalThis.__srRating;
 * 2) evaluate/write SR frontmatter when called with globalThis.__srRating = 1..5.
 *
 * Template usage:
 * ```dataviewjs
 * (async () => {
 *   const code = await app.vault.adapter.read("_scripts/sr-evaluate.js");
 *   await eval(code);
 * })();
 * ```
 *
 * Button/evaluation usage is internal:
 *   globalThis.__srRating = n;
 *   globalThis.__srFilePath = dv.current().file.path;
 *   eval(await app.vault.adapter.read("_scripts/sr-evaluate.js"));
 *
 * Algorithm:
 * - rating 1-4: same-day reinforcement
 *     next = now + 15min * 2^(rating - 1)
 *     sr_review_count unchanged
 * - rating 5: cross-day promotion
 *     base = max(old_next, now)
 *     next = base + 24h * 2^sr_review_count
 *     sr_review_count += 1
 */
(async () => {
    const TRIGGER_INTERVAL_MIN = 15;
    const DT_FMT = "YYYY-MM-DD HH:mm:ss";

    function getTargetFile() {
        const requestedPath = globalThis.__srFilePath;
        return requestedPath
            ? app.vault.getAbstractFileByPath(requestedPath)
            : (typeof dv !== "undefined" && dv.current?.()?.file?.path
                ? app.vault.getAbstractFileByPath(dv.current().file.path)
                : app.workspace.getActiveFile());
    }

    async function renderPanel() {
        if (typeof dv === "undefined") {
            new Notice("⚠️ SR 按钮只能在 DataviewJS 中渲染");
            return;
        }

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
    }

    async function evaluateRating() {
        if (globalThis.__srEvaluating) {
            new Notice("⏳ SR 正在写入，请勿重复点击");
            return;
        }
        globalThis.__srEvaluating = true;

        const activeLeaf = app.workspace.activeLeaf;

        try {
            const rating = globalThis.__srRating;
            if (!rating || rating < 1 || rating > 5) {
                new Notice("⚠️ 评分无效");
                return;
            }

            const file = getTargetFile();
            if (!file) { new Notice("⚠️ 找不到当前文件"); return; }
            if (!file.extension || file.extension !== "md") {
                new Notice("⚠️ SR 目标不是 Markdown 文件");
                return;
            }

            const fm = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
            if (fm.sr_next_review_datetime == null) {
                new Notice("⚠️ 不是 SR 卡片（缺 sr_next_review_datetime），跳过");
                return;
            }

            const now = moment();
            const oldNextStr = fm.sr_next_review_datetime;
            const oldNext = oldNextStr ? moment(oldNextStr, DT_FMT) : null;

            let nextMoment;
            let newCount = fm.sr_review_count ?? 0;

            if (rating <= 4) {
                const minutes = TRIGGER_INTERVAL_MIN * Math.pow(2, rating - 1);
                nextMoment = now.clone().add(minutes, "minutes");
            } else {
                const base = (oldNext && oldNext.isValid() && oldNext.isAfter(now))
                    ? oldNext.clone()
                    : now.clone();
                const days = Math.pow(2, newCount);
                nextMoment = base.add(days, "days");
                newCount += 1;
            }

            const nextStr = nextMoment.format(DT_FMT);

            await app.fileManager.processFrontMatter(file, m => {
                m.sr_review_count = newCount;
                m.sr_next_review_datetime = nextStr;
            });

            const LABELS = { 1: "忘记", 2: "模糊", 3: "还行", 4: "牢记", 5: "完成" };
            new Notice(`🧠 ${rating} ${LABELS[rating]} → ${nextStr}`);
            console.log("[SR]", {
                rating, file: file.path,
                old: oldNextStr, next: nextStr, count: newCount,
            });

            const nowMs = Date.now();
            const candidates = [];
            for (const f of app.vault.getMarkdownFiles()) {
                if (f.parent?.path === "_template") continue;
                if (f.path === file.path) continue;
                const c = app.metadataCache.getFileCache(f)?.frontmatter;
                if (!c || c.sr_next_review_datetime == null) continue;
                const nrStr = c.sr_next_review_datetime;
                if (!nrStr) continue;
                const nr = moment(nrStr, DT_FMT);
                if (!nr.isValid()) continue;
                if (nr.valueOf() >= nowMs) continue;
                candidates.push({
                    file: f,
                    next: nr.valueOf(),
                    count: c.sr_review_count ?? 0,
                    imp: c.importance ?? 0,
                    views: c.views ?? 0,
                });
            }

            candidates.sort((a, b) =>
                b.next - a.next ||
                a.count - b.count ||
                b.imp - a.imp ||
                a.views - b.views
            );

            const nextFile = candidates[0]?.file;
            if (nextFile) {
                await app.workspace.getLeaf(false).openFile(nextFile);
            } else {
                new Notice("✅ SR 队列已清空");
                activeLeaf?.detach();
            }
        } catch (err) {
            console.error("[SR] evaluate failed", err);
            new Notice(`❌ SR 写入失败：${err?.message ?? err}`);
        } finally {
            globalThis.__srEvaluating = false;
        }
    }

    if (globalThis.__srRating != null) {
        await evaluateRating();
    } else {
        await renderPanel();
    }
})();

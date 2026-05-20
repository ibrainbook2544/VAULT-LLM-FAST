/**
 * SR Evaluate Handler — shared script for all diary-atom pages
 *
 * 调用方：DIARY/*.md 内 dataviewjs 按钮块
 *   globalThis.__srRating = n;       // 1-5
 *   globalThis.__srFilePath = path;  // 推荐：按钮所在文件路径
 *   eval(await app.vault.adapter.read("_scripts/sr-evaluate.js"));
 *
 * 算法（与 INBOX/SR算法.md 一致）：
 *
 *   - 按钮 1-4 = 本轮未完成，今日内反复巩固：
 *       next = now + TRIGGER_INTERVAL_MIN(15) * 2^(rating - 1)  (分钟)
 *       sr_review_count 不变
 *
 *   - 按钮 5   = 本轮完成，跨日推进（基准钳制到未来 — Q1 方案 A）：
 *       base = max(old_next, now)
 *       next = base + 24h * 2^sr_review_count                   (天)
 *       sr_review_count += 1
 *
 * 写完后跳到 sr.base 首行（同筛选 + 同排序），队列为空则关闭触发本次复习的页面。
 *
 * sr.base 筛选 / 排序约定（必须与 DIARY/sr.base 保持同步）：
 *   filter: file.folder == "DIARY" && type == "diary-atom"
 *           && sr_next_review_datetime < now()
 *   sort  : sr_next_review_datetime DESC, sr_review_count ASC,
 *           importance DESC, views ASC
 *   limit : 20  （此处取首条即可）
 */

(async () => {
    if (globalThis.__srEvaluating) {
        new Notice("⏳ SR 正在写入，请勿重复点击");
        return;
    }
    globalThis.__srEvaluating = true;

    const activeLeaf = app.workspace.activeLeaf;
    const TRIGGER_INTERVAL_MIN = 15;   // SR 触发间隔（分钟），与模板里一致
    const DT_FMT = "YYYY-MM-DD HH:mm:ss";

    try {
        const rating = globalThis.__srRating;
        if (!rating || rating < 1 || rating > 5) {
            new Notice("⚠️ 评分无效");
            return;
        }

        // 新模板会传入按钮所在文件路径；旧卡片未传入时，兼容 fallback 到 active file。
        const requestedPath = globalThis.__srFilePath;
        const file = requestedPath
            ? app.vault.getAbstractFileByPath(requestedPath)
            : app.workspace.getActiveFile();

        if (!file) { new Notice("⚠️ 找不到当前文件"); return; }
        if (!file.extension || file.extension !== "md") {
            new Notice("⚠️ SR 目标不是 Markdown 文件");
            return;
        }

        const fm = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
        if (fm.type !== "diary-atom") {
            new Notice("⚠️ 不是 diary-atom，跳过");
            return;
        }

        // ── 计算 next datetime ──────────────────────────────────────
        const now = moment();
        const oldNextStr = fm.sr_next_review_datetime;
        const oldNext = oldNextStr ? moment(oldNextStr, DT_FMT) : null;

        let nextMoment;
        let newCount = fm.sr_review_count ?? 0;

        if (rating <= 4) {
            // 按钮 1-4：分钟级，本轮未完成
            const minutes = TRIGGER_INTERVAL_MIN * Math.pow(2, rating - 1);
            nextMoment = now.clone().add(minutes, "minutes");
            // sr_review_count 保持不变
        } else {
            // 按钮 5：天级，本轮完成（Q1 方案 A — 基准钳制到 now）
            const base = (oldNext && oldNext.isValid() && oldNext.isAfter(now))
                ? oldNext.clone()
                : now.clone();
            const days = Math.pow(2, newCount);   // 用旧 count
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

        // ── 跳到 sr.base 首条记录 ────────────────────────────────────
        const nowMs = Date.now();
        const candidates = [];
        for (const f of app.vault.getMarkdownFiles()) {
            if (f.parent?.path !== "DIARY") continue;       // 平铺在 DIARY/ 根
            if (f.path === file.path) continue;             // 跳过自己
            const c = app.metadataCache.getFileCache(f)?.frontmatter;
            if (!c || c.type !== "diary-atom") continue;
            const nrStr = c.sr_next_review_datetime;
            if (!nrStr) continue;
            const nr = moment(nrStr, DT_FMT);
            if (!nr.isValid()) continue;
            if (nr.valueOf() >= nowMs) continue;            // 未到期
            candidates.push({
                file: f,
                next: nr.valueOf(),
                count: c.sr_review_count ?? 0,
                imp: c.importance ?? 0,
                views: c.views ?? 0,
            });
        }

        // 与 sr.base 同序：next DESC, count ASC, imp DESC, views ASC
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
})();

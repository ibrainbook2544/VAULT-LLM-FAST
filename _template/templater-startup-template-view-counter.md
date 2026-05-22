<%*
// ============================================================
// View Counter Startup — auto increment note views
// ============================================================
// 打开 .md 并停留 15 秒，frontmatter 的 views +1，last_visited 改为今天
// 由 Templater 的 Startup Template 在 Obsidian 启动时执行一次
// ============================================================

if (window._viewCounterRegistered) { return; }
window._viewCounterRegistered = true;

const DWELL_MS = 15 * 1000;

// 精确路径排除（整个文件名匹配）
const EXCLUDE_EXACT_PATHS = new Set([
]);

const EXCLUDE_FOLDERS = [
  "_doc/",
  "_template/",
  "_attachment/",
  "logs/",
  "INBOX/",
  "TASK/",
];

const EXCLUDE_PATH_CONTAINS = [
  "/_template/",
  "/_attachment/",
  "/logs/",
  "/asset/",
  "/raw/",
];

const EXCLUDE_BASENAMES = new Set([
  "AGENTS",
  "CLAUDE",
  "index",
  "dashboard",
  "README",
  "README.zh-CN",
]);

function shouldSkip(file) {
  if (!file) return true;
  if (file.extension !== "md") return true;
  if (EXCLUDE_EXACT_PATHS.has(file.path)) return true;
  if (EXCLUDE_FOLDERS.some(p => file.path.startsWith(p))) return true;
  if (EXCLUDE_PATH_CONTAINS.some(p => file.path.includes(p))) return true;
  if (EXCLUDE_BASENAMES.has(file.basename)) return true;
  return false;
}

let dwellTimer = null;
let pendingFile = null;

app.workspace.on("file-open", (file) => {
  if (dwellTimer) {
    clearTimeout(dwellTimer);
    dwellTimer = null;
    pendingFile = null;
  }

  if (shouldSkip(file)) return;

  pendingFile = file;
  dwellTimer = setTimeout(async () => {
    if (pendingFile !== file) return;
    const active = app.workspace.getActiveFile();
    if (!active || active.path !== file.path) return;

    try {
      await app.fileManager.processFrontMatter(file, (fm) => {
        fm.views = (fm.views || 0) + 1;
        fm.last_visited = window.moment().format("YYYY-MM-DD HH:mm:ss");
      });
    } catch (e) {
      console.error("[view-counter]", file.path, e);
    }
  }, DWELL_MS);
});

new Notice("View counter armed (30s dwell)");
-%>

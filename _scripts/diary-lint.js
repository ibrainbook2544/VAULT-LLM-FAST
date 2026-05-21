#!/usr/bin/env node
/**
 * Diary Lint 健康检查（Node.js 原生实现）
 * 依据 AGENTS.md §5.7（2026-05-20 v3 schema）。
 *
 * 当前 schema：
 *   - 容器日志：type: diary（无 subtype），文件名仅 YYYY-MM-DD
 *   - 原子卡片：type: diary + subtype: card，文件名 YYYY-MM-DD <slug>
 *   - SR 字段：sr_review_count / sr_next_review_datetime（格式 YYYY-MM-DD HH:mm:ss）
 *
 * 检查分节：A 时间逻辑 / B Schema 完整性 / C 文件命名 / D 浏览统计 / E Base 配置健康。
 * 只写报告，不修改任何文件。
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── 配置 ────────────────────────────────────────────────────
const VAULT_PATH = path.resolve(__dirname, '..');
const DIARY_DIR  = path.join(VAULT_PATH, 'DIARY');
const LOGS_DIR   = path.join(DIARY_DIR, 'logs');
const RUNNER_LOG = path.join(VAULT_PATH, '_scripts', 'task-runner.log');

const REQUIRED_FIELDS = ['type', 'subtype', 'created', 'importance', 'sr_review_count', 'sr_next_review_datetime'];
// 2026-05-19 v2 之前的废弃字段，出现即为残留
const LEGACY_FIELDS   = ['sr_interval', 'sr_archived', 'sr_last_review', 'promoted_to',
                         'review_count', 'next_review', 'interval', 'last_review', 'archived'];
const DT_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;   // sr_next_review_datetime 标准格式

// ─── YAML Frontmatter 简易解析 ──────────────────────────────
function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { fm: {}, hasFm: false };

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { endIdx = i; break; }
  }
  if (endIdx === -1) return { fm: {}, hasFm: false };

  const fm = {};
  let currentKey = null;
  for (let i = 1; i < endIdx; i++) {
    const line = lines[i];
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(stripQuotes(listMatch[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let raw = kv[2].trim();
    currentKey = key;
    if (raw === '') { fm[key] = null; continue; }
    if (raw === 'true')  { fm[key] = true;  continue; }
    if (raw === 'false') { fm[key] = false; continue; }
    if (raw === '[]')    { fm[key] = [];    continue; }
    if (/^-?\d+$/.test(raw))        { fm[key] = parseInt(raw, 10); continue; }
    if (/^-?\d+\.\d+$/.test(raw))   { fm[key] = parseFloat(raw);   continue; }
    fm[key] = stripQuotes(raw);
  }
  return { fm, hasFm: true };
}

function stripQuotes(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// ─── 日期工具 ────────────────────────────────────────────────
function parseDateTime(v) {
  if (v == null) return null;
  const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m) return null;
  return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
}
function startOfToday() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function diffDays(a, b) { return Math.floor((a - b) / 86400000); }
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function fmtTs(d) {
  return `${fmtDate(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

// ─── Issue ───────────────────────────────────────────────────
class LintIssue {
  constructor(section, file, msg, suggestion = '') {
    this.section = section; this.file = file; this.msg = msg; this.suggestion = suggestion;
  }
  render() {
    const stem = path.basename(this.file, '.md');
    let out = `- [[${stem}]] — ${this.msg}`;
    if (this.suggestion) out += `\n  - 建议：${this.suggestion}`;
    return out;
  }
}

// ─── 原子卡检查（subtype: card）──────────────────────────────
function checkCard(file, fm) {
  const issues = [];
  const today  = startOfToday();
  const stem   = path.basename(file, '.md');

  // ── A. 时间逻辑 ──
  const nrRaw = fm.sr_next_review_datetime;
  if (nrRaw != null) {
    if (!DT_RE.test(String(nrRaw))) {
      issues.push(new LintIssue('A', file,
        `sr_next_review_datetime=\`${nrRaw}\` 格式不可解析（应为 YYYY-MM-DD HH:mm:ss）`,
        '改为 `YYYY-MM-DD HH:mm:ss`'));
    } else {
      const nr = parseDateTime(nrRaw);
      const overdue = diffDays(today, nr);   // > 0 表示逾期天数
      const rc = fm.sr_review_count;
      if ((rc === 0 || rc == null) && overdue > 14) {
        issues.push(new LintIssue('A', file,
          `新建后从未复习（sr_review_count=0），sr_next_review_datetime 已逾期 ${overdue} 天（>2 周）`,
          '尽快复习或调整 sr_next_review_datetime'));
      }
      if (overdue > 30) {
        issues.push(new LintIssue('A', file,
          `sr_next_review_datetime 已逾期 ${overdue} 天（>30 天，长期未处理）`,
          '执行 SR 复习清队列'));
      }
    }
  }

  // ── B. Schema 完整性 ──
  for (const f of REQUIRED_FIELDS) {
    if (fm[f] == null) issues.push(new LintIssue('B', file, `缺必填字段 \`${f}\``, `补充 ${f}`));
  }
  const imp = fm.importance;
  if (imp != null && (!Number.isInteger(imp) || imp < 1 || imp > 5)) {
    issues.push(new LintIssue('B', file, `importance=${imp} 不在 [1,5]`, '修正为 1–5 的整数'));
  }
  if (fm.type != null && fm.type !== 'diary') {
    issues.push(new LintIssue('B', file, `type=${fm.type} 不在 {diary}`, '改为 `type: diary`'));
  }
  if (fm.subtype != null && fm.subtype !== 'card') {
    issues.push(new LintIssue('B', file, `subtype=${fm.subtype} 不在 {card}（旧 灵感/反思/… 应迁至 tags）`,
      '改为 `subtype: card`，原分类移入 tags'));
  }
  for (const lf of LEGACY_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(fm, lf)) {
      issues.push(new LintIssue('B', file, `遗留旧字段 \`${lf}\`（2026-05-19 v2 前残留）`, '迁移到 sr_* 字段或删除'));
    }
  }

  // ── C. 文件命名 ──
  if (!/^\d{4}-\d{2}-\d{2}/.test(stem)) {
    issues.push(new LintIssue('C', file, `文件名 \`${stem}\` 不符合 YYYY-MM-DD 前缀`, '加日期前缀'));
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(stem)) {
    issues.push(new LintIssue('C', file, '原子卡文件名只有日期，缺 slug', '在日期后追加描述性 slug'));
  }

  // ── D. 浏览统计 ──
  const views = fm.views;
  const lv = fm.last_visited;
  if (views != null && !Number.isInteger(views)) {
    issues.push(new LintIssue('D', file, `views=${views} 非整数`, '改为整数'));
  }
  if ((typeof views === 'number' && views > 0) && (lv == null)) {
    issues.push(new LintIssue('D', file, `views=${views} 但 last_visited 为空`, '补 last_visited 或核对 views'));
  }
  if (lv != null && (views == null || views === 0)) {
    issues.push(new LintIssue('D', file, `last_visited=${lv} 但 views 为 0/空`, '核对 views 计数'));
  }

  return issues;
}

// ─── 容器日志检查（type: diary，无 subtype）──────────────────
function checkLog(file) {
  const issues = [];
  const stem = path.basename(file, '.md');
  if (!/^\d{4}-\d{2}-\d{2}/.test(stem)) {
    issues.push(new LintIssue('C', file, `文件名 \`${stem}\` 不符合 YYYY-MM-DD 前缀`, '加日期前缀'));
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(stem)) {
    issues.push(new LintIssue('C', file, `容器日志文件名 \`${stem}\` 带 slug（应只有日期）`,
      '去除 slug，或确认是否应为原子卡（加 subtype: card）'));
  }
  return issues;
}

// ─── E. Base 配置健康 ────────────────────────────────────────
function checkBases() {
  const issues = [];
  const nameAs = (name) => path.join(DIARY_DIR, name + '.md');  // 仅用于 render 显示名

  // diary.base
  const diaryBase = path.join(DIARY_DIR, 'diary.base');
  if (fs.existsSync(diaryBase)) {
    const t = fs.readFileSync(diaryBase, 'utf8');
    if (/file\.folder\.startsWith/.test(t)) {
      issues.push(new LintIssue('E', nameAs('diary.base'),
        'diary.base 用 `file.folder.startsWith(...)`（会混入 _template/、logs/ 内的污染文件）',
        '改为 `file.folder == "DIARY"`'));
    } else if (!/file\.folder\s*==\s*"DIARY"/.test(t)) {
      issues.push(new LintIssue('E', nameAs('diary.base'),
        'diary.base 缺少 `file.folder == "DIARY"` 过滤', '加上目录精确过滤'));
    }
    if (!/note\.subtype\s*==\s*"card"/.test(t)) {
      issues.push(new LintIssue('E', nameAs('diary.base'),
        'diary.base 缺少 `note.subtype == "card"` 过滤（会把容器日志混入复习视图）', '加上 subtype 过滤'));
    }
  } else {
    issues.push(new LintIssue('E', nameAs('diary.base'), 'diary.base 不存在', '检查文件路径'));
  }

  // sr.base（根目录，全库扫描）
  const srBase = path.join(VAULT_PATH, 'sr.base');
  if (fs.existsSync(srBase)) {
    const t = fs.readFileSync(srBase, 'utf8');
    if (/file\.folder\s*==\s*"DIARY"/.test(t)) {
      issues.push(new LintIssue('E', nameAs('sr.base'),
        'sr.base 退回 `file.folder == "DIARY"`（失去 FAST 原子笔记的扩展能力）',
        '改为全库扫描：sr_next_review_datetime 存在 + < now() + file.folder != "_template"'));
    }
    if (!/sr_next_review_datetime/.test(t) || !/<\s*now\(\)/.test(t) || !/file\.folder\s*!=\s*"_template"/.test(t)) {
      issues.push(new LintIssue('E', nameAs('sr.base'),
        'sr.base 过滤不完整（应为 sr_next_review_datetime 存在 + < now() + file.folder != "_template"）',
        '修正 filter'));
    }
  } else {
    issues.push(new LintIssue('E', nameAs('sr.base'), 'sr.base（根目录）不存在', '检查文件路径'));
  }

  // 模板自防护：Diary Card Templater 应含 <% %> 使其不匹配日期过滤
  const tpl = path.join(VAULT_PATH, '_template', 'Diary Card Templater.md');
  if (fs.existsSync(tpl)) {
    const t = fs.readFileSync(tpl, 'utf8');
    if (!/<%/.test(t)) {
      issues.push(new LintIssue('E', nameAs('Diary Card Templater'),
        '模板缺少 `<% %>` 表达式，可能被 base 当作普通卡片列出', '保留 Templater 占位语法'));
    }
  }

  // 非根目录的原子卡（应平铺在 DIARY/ 根）
  for (const stray of findStrayCards(DIARY_DIR)) {
    const rel = path.relative(VAULT_PATH, stray);
    issues.push(new LintIssue('E', stray,
      `原子卡出现在子目录 \`${rel}\`（应平铺在 DIARY/ 根）`, '移回 DIARY/ 根目录'));
  }

  return issues;
}

// 递归扫描 DIARY 子目录里 subtype: card 的文件
function findStrayCards(root) {
  const found = [];
  const stack = fs.readdirSync(root, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(root, e.name));
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) { stack.push(full); continue; }
      if (!ent.isFile() || !ent.name.endsWith('.md')) continue;
      try {
        const { fm } = parseFrontmatter(fs.readFileSync(full, 'utf8'));
        if (fm.subtype === 'card') found.push(full);
      } catch { /* ignore */ }
    }
  }
  return found;
}

// ─── 主流程 ──────────────────────────────────────────────────
function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function appendLog(msg) { ensureDir(path.dirname(RUNNER_LOG)); fs.appendFileSync(RUNNER_LOG, msg + '\n', 'utf8'); }

function main() {
  const today = startOfToday();
  const todayStr = fmtDate(today);
  ensureDir(LOGS_DIR);
  appendLog(`[${fmtTs(new Date())}] diary-lint.js 启动`);

  const allIssues = [];
  let cardCount = 0, logCount = 0, otherCount = 0, totalCount = 0;

  const files = fs.readdirSync(DIARY_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => path.join(DIARY_DIR, e.name));

  for (const file of files) {
    totalCount++;
    let content;
    try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }
    const { fm, hasFm } = parseFrontmatter(content);
    if (!hasFm) { otherCount++; continue; }

    if (fm.subtype === 'card') {
      cardCount++;
      allIssues.push(...checkCard(file, fm));
    } else if (fm.type === 'diary' && fm.subtype == null) {
      logCount++;
      allIssues.push(...checkLog(file));
    } else {
      otherCount++;
    }
  }

  // E. Base 配置健康（全局，跑一次）
  allIssues.push(...checkBases());

  // 分组
  const sections = { A: [], B: [], C: [], D: [], E: [] };
  for (const iss of allIssues) (sections[iss.section] = sections[iss.section] || []).push(iss);

  const titles = {
    A: '时间逻辑', B: 'Schema 完整性', C: '文件命名', D: '浏览统计', E: 'Base 配置健康',
  };

  const ts = fmtTs(new Date());
  const lines = [
    '---',
    `created: ${todayStr}`,
    'generated_by: diary-lint.js',
    '---',
    `# Diary Lint Report · ${todayStr}`,
    '',
    '## 汇总',
    '',
    '| 项目 | 数值 |',
    '|------|------|',
    `| 扫描文件总数（DIARY/ 根目录） | ${totalCount} 个 |`,
    `| 其中 原子卡（subtype: card） | ${cardCount} 个 |`,
    `| 其中 容器日志（无 subtype） | ${logCount} 个 |`,
    `| 其中 其他类型 | ${otherCount} 个 |`,
    `| 发现问题 | ${allIssues.length} 条 |`,
    `| 生成时间 | ${ts}（Node.js 原生） |`,
    '',
    '---',
    '',
  ];

  for (const sec of ['A', 'B', 'C', 'D', 'E']) {
    const list = sections[sec];
    lines.push(`## ${sec}. ${titles[sec]} (${list.length} 条)`, '');
    if (list.length) for (const iss of list) lines.push(iss.render());
    else lines.push('✅ 无问题');
    lines.push('', '---', '');
  }

  lines.push('*报告由 diary-lint.js 自动生成 · 仅供参考 · 不自动修复任何文件*');

  const reportPath = path.join(LOGS_DIR, `lint-${todayStr}.md`);
  fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
  appendLog(`[${fmtTs(new Date())}] diary-lint.js 完成（${allIssues.length} 条问题，报告：${path.basename(reportPath)}）`);

  console.log(`✅ Diary lint 完成：${allIssues.length} 条问题`);
  console.log(`📄 报告：${reportPath}`);
}

main();

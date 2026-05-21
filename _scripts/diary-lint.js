#!/usr/bin/env node
/**
 * Diary Lint 健康检查（Node.js 原生实现）
 * 依据 AGENTS.md §5.9 编写。
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── 配置 ────────────────────────────────────────────────────
const VAULT_PATH = path.resolve(__dirname, '..');        // _scripts/ 的上一级
const DIARY_DIR  = path.join(VAULT_PATH, 'DIARY');
const LOGS_DIR   = path.join(DIARY_DIR, 'logs');
const RUNNER_LOG = path.join(VAULT_PATH, '_scripts', 'task-runner.log');

const VALID_INTERVALS = new Set([1, 2, 4, 8, 16, 32, 64, 128]);
const VALID_SUBTYPES  = new Set(['card']);
const VALID_TYPES     = new Set(['diary']);
const REQUIRED_FIELDS = ['type', 'interval', 'next_review', 'importance', 'subtype'];

// ─── YAML Frontmatter 简易解析 ──────────────────────────────

function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { fm: {}, bodyStart: 0 };

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { endIdx = i; break; }
  }
  if (endIdx === -1) return { fm: {}, bodyStart: 0 };

  const fm = {};
  let currentKey = null;

  for (let i = 1; i < endIdx; i++) {
    const line = lines[i];
    // list item
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(listMatch[1].trim());
      continue;
    }
    const kvMatch = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kvMatch) continue;

    const key = kvMatch[1];
    let raw = kvMatch[2].trim();
    currentKey = key;

    if (raw === '') { fm[key] = null; continue; }
    if (raw === 'true') { fm[key] = true; continue; }
    if (raw === 'false') { fm[key] = false; continue; }
    if (raw === 'null' || raw === '~') { fm[key] = null; continue; }

    // 数字？
    if (/^-?\d+$/.test(raw)) { fm[key] = parseInt(raw, 10); continue; }
    if (/^-?\d+\.\d+$/.test(raw)) { fm[key] = parseFloat(raw); continue; }

    // 移除引号
    if ((raw.startsWith('"') && raw.endsWith('"')) ||
        (raw.startsWith("'") && raw.endsWith("'"))) {
      raw = raw.slice(1, -1);
    }
    fm[key] = raw;
  }

  return { fm, bodyStart: endIdx + 1 };
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
}

function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function fmtTimestamp(d) {
  return `${fmtDate(d)} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}

function diffDays(a, b) {
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// ─── Issue 类 ────────────────────────────────────────────────

class LintIssue {
  constructor(section, file, msg, suggestion = '') {
    this.section    = section;
    this.file       = file;
    this.msg        = msg;
    this.suggestion = suggestion;
  }
  render() {
    const stem = path.basename(this.file, '.md');
    let out = `- [[${stem}]] — ${this.msg}`;
    if (this.suggestion) out += `\n  - 建议：${this.suggestion}`;
    return out;
  }
}

// ─── 检查器 ──────────────────────────────────────────────────

function checkAtom(file, fm, bodyLines) {
  const issues = [];
  const today  = new Date();
  today.setHours(0,0,0,0);

  const rc  = fm.review_count;
  const lr  = parseDate(fm.last_review);
  const nr  = parseDate(fm.next_review);
  const iv  = fm.interval;
  const imp = fm.importance;
  const st  = fm.subtype;
  const tp  = fm.type;
  const arc = fm.archived === true;
  const pt  = fm.promoted_to;

  // A. 状态不一致
  if (rc && rc > 0 && !lr) {
    issues.push(new LintIssue('A', file, `review_count=${rc} 但 last_review 为空`, '补 `last_review: YYYY-MM-DD`'));
  }
  if ((rc === 0 || rc == null) && lr) {
    issues.push(new LintIssue('A', file, `review_count=0 但 last_review=${fmtDate(lr)}`, '确认 review_count 或清空 last_review'));
  }
  if (lr && nr && lr > nr) {
    issues.push(new LintIssue('A', file, `last_review(${fmtDate(lr)}) 晚于 next_review(${fmtDate(nr)})`, '检查时间顺序'));
  }
  if (lr && nr && VALID_INTERVALS.has(iv)) {
    const expected = addDays(lr, iv);
    if (expected.getTime() !== nr.getTime()) {
      issues.push(new LintIssue('A', file,
        `next_review(${fmtDate(nr)}) ≠ last_review(${fmtDate(lr)}) + interval(${iv}天) = ${fmtDate(expected)}`,
        `修正为 ${fmtDate(expected)}`));
    }
  }
  if (arc && nr && nr <= today) {
    issues.push(new LintIssue('A', file, `archived=true 但 next_review=${fmtDate(nr)} ≤ 今日`, '已归档卡片不应出现在复习队列'));
  }

  // B. Schema 完整性
  for (const f of REQUIRED_FIELDS) {
    if (fm[f] == null) issues.push(new LintIssue('B', file, `缺必填字段 \`${f}\``, `补充 ${f} 字段`));
  }
  if (iv != null && !VALID_INTERVALS.has(iv)) {
    issues.push(new LintIssue('B', file, `interval=${iv} 不在阶梯 {1,2,4,8,16,32,64,128}`, '圆整到最接近的合法值'));
  }
  if (imp != null && (imp < 1 || imp > 5)) {
    issues.push(new LintIssue('B', file, `importance=${imp} 不在 [1,5]`, '修正范围'));
  }
  if (st && !VALID_SUBTYPES.has(st)) {
    issues.push(new LintIssue('B', file, `subtype=${st} 不在 {灵感,反思,教训,金句,文摘}`, '改为合法 subtype'));
  }
  if (tp && !VALID_TYPES.has(tp)) {
    issues.push(new LintIssue('B', file, `type=${tp} 不在 {diary}`, '改为合法 type'));
  }

  // C. 文件命名
  const stem = path.basename(file, '.md');
  if (!/^\d{4}-\d{2}-\d{2}/.test(stem)) {
    issues.push(new LintIssue('C', file, `文件名 \`${stem}\` 不符合 YYYY-MM-DD 前缀`, '重命名加日期前缀'));
  } else if (st === 'card' && /^\d{4}-\d{2}-\d{2}$/.test(stem)) {
    issues.push(new LintIssue('C', file, 'diary card 文件名只有日期，缺 slug', '在日期后追加描述性 slug'));
  } else if (tp === 'diary-log' && !/^\d{4}-\d{2}-\d{2}$/.test(stem)) {
    issues.push(new LintIssue('C', file, `diary-log 文件名 \`${stem}\` 带 slug，应只有日期`, '去除 slug'));
  }

  // D. 晋升一致性
  if (pt) {
    const m = String(pt).match(/\[\[([^\]]+)\]\]/);
    const target = m ? m[1] : String(pt);
    const found = findFileInVault(VAULT_PATH, `${target}.md`);
    if (!found) {
      issues.push(new LintIssue('D', file, `promoted_to=\`${target}\` 死链`, '确认目标文件存在或修正路径'));
    }
    const nonEmpty = bodyLines.filter(l => l.trim()).length;
    if (arc && nonEmpty > 5) {
      issues.push(new LintIssue('D', file, `archived=true + promoted_to，但正文 ${nonEmpty} 行非空（应为 stub）`, '删减正文，仅留 `详见 [[target]]`'));
    }
    if (!arc) {
      issues.push(new LintIssue('D', file, '有 promoted_to 但 archived=false（半晋升）', '设 archived: true'));
    }
  }

  // E. 长期未复习堆积
  if (!arc && nr && diffDays(today, nr) > 14) {
    issues.push(new LintIssue('E', file, `next_review=${fmtDate(nr)} 已逾期 ${diffDays(today, nr)} 天`, '执行 /diary-review 清队列'));
  }

  return issues;
}

function findFileInVault(root, fileName) {
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { continue; }
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
        stack.push(full);
      } else if (ent.isFile() && ent.name === fileName) {
        return full;
      }
    }
  }
  return null;
}

// ─── 主流程 ──────────────────────────────────────────────────

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function appendLog(message) {
  ensureDir(path.dirname(RUNNER_LOG));
  fs.appendFileSync(RUNNER_LOG, message + '\n', 'utf8');
}

function main() {
  const today    = new Date();
  today.setHours(0,0,0,0);
  const todayStr = fmtDate(today);

  ensureDir(LOGS_DIR);
  appendLog(`[${fmtTimestamp(new Date())}] diary-lint.js 启动`);

  const allIssues = [];
  let atomCount = 0, logCount = 0, otherCount = 0, totalCount = 0;

  const files = fs.readdirSync(DIARY_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => path.join(DIARY_DIR, e.name));

  for (const file of files) {
    totalCount++;
    let content;
    try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }
    const { fm, bodyStart } = parseFrontmatter(content);
    if (!Object.keys(fm).length) { otherCount++; continue; }
    if (fm.type === 'diary' && fm.subtype === 'card') {
      atomCount++;
      const bodyLines = content.split(/\r?\n/).slice(bodyStart);
      allIssues.push(...checkAtom(file, fm, bodyLines));
    } else if (fm.type === 'diary' && !fm.subtype) {
      logCount++;
    } else {
      otherCount++;
    }
  }

  // 分组
  const sections = { A: [], B: [], C: [], D: [], E: [], F: [] };
  for (const iss of allIssues) sections[iss.section].push(iss);

  const titles = {
    A: '状态不一致', B: 'Schema 完整性', C: '文件命名',
    D: '晋升一致性', E: '长期未复习堆积', F: 'Base 配置健康'
  };

  const ts = fmtTimestamp(new Date());
  const lines = [
    '---',
    `created: ${todayStr}T${ts.slice(-8,-3)}`,
    'generated_by: diary-lint.js',
    '---',
    `# Diary Lint Report · ${todayStr}`,
    '',
    '## 汇总',
    '',
    '| 项目 | 数值 |',
    '|------|------|',
    `| 扫描文件总数（DIARY/ 根目录） | ${totalCount} 个 |`,
    `| 其中 diary card | ${atomCount} 个 |`,
    `| 其中 diary-log | ${logCount} 个 |`,
    `| 其中其他类型 | ${otherCount} 个 |`,
    `| 发现问题 | ${allIssues.length} 条 |`,
    `| 生成时间 | ${ts}（Node.js 原生） |`,
    '',
    '---',
    ''
  ];

  for (const sec of ['A','B','C','D','E','F']) {
    const list = sections[sec];
    lines.push(`## ${sec}. ${titles[sec]} (${list.length} 条)`);
    lines.push('');
    if (list.length) {
      for (const iss of list) lines.push(iss.render());
    } else {
      lines.push('✅ 无问题');
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('*报告由 diary-lint.js 自动生成 · 仅供参考 · 不自动修复任何文件*');

  const reportPath = path.join(LOGS_DIR, `lint-${todayStr}.md`);
  fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');

  appendLog(`[${fmtTimestamp(new Date())}] diary-lint.js 完成（${allIssues.length} 条问题，报告：${path.basename(reportPath)}）`);

  console.log(`✅ Diary lint 完成：${allIssues.length} 条问题`);
  console.log(`📄 报告：${reportPath}`);
}

main();

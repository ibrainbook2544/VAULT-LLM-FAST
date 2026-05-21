#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Diary Lint 健康检查（Python 实现）

依据 AGENTS.md §5.7（2026-05-20 v3 schema）。

当前 schema：
  - 容器日志：type: diary（无 subtype），文件名仅 YYYY-MM-DD
  - 原子卡片：type: diary + subtype: card，文件名 YYYY-MM-DD <slug>
  - SR 字段：sr_review_count / sr_next_review_datetime（格式 YYYY-MM-DD HH:mm:ss）

检查分节：A 时间逻辑 / B Schema 完整性 / C 文件命名 / D 浏览统计 / E Base 配置健康。
只写报告，不修改任何文件。
"""

from __future__ import annotations

import re
from datetime import datetime, date
from pathlib import Path

# ─── 配置 ────────────────────────────────────────────────────
VAULT_PATH = Path(__file__).resolve().parent.parent
DIARY_DIR  = VAULT_PATH / "DIARY"
LOGS_DIR   = DIARY_DIR / "logs"
RUNNER_LOG = VAULT_PATH / "_scripts" / "task-runner.log"

REQUIRED_FIELDS = ["type", "subtype", "created", "importance",
                   "sr_review_count", "sr_next_review_datetime"]
# 2026-05-19 v2 之前的废弃字段，出现即为残留
LEGACY_FIELDS   = ["sr_interval", "sr_archived", "sr_last_review", "promoted_to",
                   "review_count", "next_review", "interval", "last_review", "archived"]
DT_RE = re.compile(r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$")


# ─── YAML Frontmatter 简易解析 ──────────────────────────────
def parse_frontmatter(content: str) -> tuple[dict, bool]:
    lines = content.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, False
    end_idx = -1
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx == -1:
        return {}, False

    fm: dict = {}
    current_key = None
    for i in range(1, end_idx):
        line = lines[i]
        m_list = re.match(r"^\s+-\s+(.*)$", line)
        if m_list and current_key is not None:
            fm.setdefault(current_key, [])
            if isinstance(fm[current_key], list):
                fm[current_key].append(_strip_quotes(m_list.group(1).strip()))
            continue
        m_kv = re.match(r"^([A-Za-z_][\w-]*)\s*:\s*(.*)$", line)
        if not m_kv:
            continue
        key = m_kv.group(1)
        raw = m_kv.group(2).strip()
        current_key = key
        if raw == "":
            fm[key] = None
        elif raw == "true":
            fm[key] = True
        elif raw == "false":
            fm[key] = False
        elif raw == "[]":
            fm[key] = []
        elif re.fullmatch(r"-?\d+", raw):
            fm[key] = int(raw)
        elif re.fullmatch(r"-?\d+\.\d+", raw):
            fm[key] = float(raw)
        else:
            fm[key] = _strip_quotes(raw)
    return fm, True


def _strip_quotes(s: str) -> str:
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1]
    return s


# ─── 日期工具 ────────────────────────────────────────────────
def parse_datetime(v):
    if v is None:
        return None
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?", str(v))
    if not m:
        return None
    y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
    hh = int(m.group(4) or 0)
    mm = int(m.group(5) or 0)
    ss = int(m.group(6) or 0)
    return datetime(y, mo, d, hh, mm, ss)


def overdue_days(nr: datetime, today: date) -> int:
    return (today - nr.date()).days


# ─── Issue ───────────────────────────────────────────────────
class LintIssue:
    def __init__(self, section: str, file: Path, msg: str, suggestion: str = ""):
        self.section = section
        self.file = file
        self.msg = msg
        self.suggestion = suggestion

    def render(self) -> str:
        stem = self.file.stem
        out = f"- [[{stem}]] — {self.msg}"
        if self.suggestion:
            out += f"\n  - 建议：{self.suggestion}"
        return out


# ─── 原子卡检查（subtype: card）──────────────────────────────
def check_card(file: Path, fm: dict) -> list:
    issues: list = []
    today = date.today()
    stem = file.stem

    # ── A. 时间逻辑 ──
    nr_raw = fm.get("sr_next_review_datetime")
    if nr_raw is not None:
        if not DT_RE.match(str(nr_raw)):
            issues.append(LintIssue("A", file,
                f"sr_next_review_datetime=`{nr_raw}` 格式不可解析（应为 YYYY-MM-DD HH:mm:ss）",
                "改为 `YYYY-MM-DD HH:mm:ss`"))
        else:
            nr = parse_datetime(nr_raw)
            od = overdue_days(nr, today)
            rc = fm.get("sr_review_count")
            if (rc == 0 or rc is None) and od > 14:
                issues.append(LintIssue("A", file,
                    f"新建后从未复习（sr_review_count=0），sr_next_review_datetime 已逾期 {od} 天（>2 周）",
                    "尽快复习或调整 sr_next_review_datetime"))
            if od > 30:
                issues.append(LintIssue("A", file,
                    f"sr_next_review_datetime 已逾期 {od} 天（>30 天，长期未处理）",
                    "执行 SR 复习清队列"))

    # ── B. Schema 完整性 ──
    for f in REQUIRED_FIELDS:
        if fm.get(f) is None:
            issues.append(LintIssue("B", file, f"缺必填字段 `{f}`", f"补充 {f}"))
    imp = fm.get("importance")
    if imp is not None and (not isinstance(imp, int) or imp < 1 or imp > 5):
        issues.append(LintIssue("B", file, f"importance={imp} 不在 [1,5]", "修正为 1–5 的整数"))
    if fm.get("type") is not None and fm.get("type") != "diary":
        issues.append(LintIssue("B", file, f"type={fm.get('type')} 不在 {{diary}}", "改为 `type: diary`"))
    if fm.get("subtype") is not None and fm.get("subtype") != "card":
        issues.append(LintIssue("B", file,
            f"subtype={fm.get('subtype')} 不在 {{card}}（旧 灵感/反思/… 应迁至 tags）",
            "改为 `subtype: card`，原分类移入 tags"))
    for lf in LEGACY_FIELDS:
        if lf in fm:
            issues.append(LintIssue("B", file,
                f"遗留旧字段 `{lf}`（2026-05-19 v2 前残留）", "迁移到 sr_* 字段或删除"))

    # ── C. 文件命名 ──
    if not re.match(r"^\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, f"文件名 `{stem}` 不符合 YYYY-MM-DD 前缀", "加日期前缀"))
    elif re.fullmatch(r"\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, "原子卡文件名只有日期，缺 slug", "在日期后追加描述性 slug"))

    # ── D. 浏览统计 ──
    views = fm.get("views")
    lv = fm.get("last_visited")
    if views is not None and not isinstance(views, int):
        issues.append(LintIssue("D", file, f"views={views} 非整数", "改为整数"))
    if isinstance(views, int) and views > 0 and lv is None:
        issues.append(LintIssue("D", file, f"views={views} 但 last_visited 为空", "补 last_visited 或核对 views"))
    if lv is not None and (views is None or views == 0):
        issues.append(LintIssue("D", file, f"last_visited={lv} 但 views 为 0/空", "核对 views 计数"))

    return issues


# ─── 容器日志检查（type: diary，无 subtype）──────────────────
def check_log(file: Path) -> list:
    issues: list = []
    stem = file.stem
    if not re.match(r"^\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, f"文件名 `{stem}` 不符合 YYYY-MM-DD 前缀", "加日期前缀"))
    elif not re.fullmatch(r"\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file,
            f"容器日志文件名 `{stem}` 带 slug（应只有日期）",
            "去除 slug，或确认是否应为原子卡（加 subtype: card）"))
    return issues


# ─── E. Base 配置健康 ────────────────────────────────────────
def _name_as(name: str) -> Path:
    return DIARY_DIR / f"{name}.md"  # 仅用于 render 显示名


def check_bases() -> list:
    issues: list = []

    # diary.base
    diary_base = DIARY_DIR / "diary.base"
    if diary_base.exists():
        t = diary_base.read_text(encoding="utf-8")
        if "file.folder.startsWith" in t:
            issues.append(LintIssue("E", _name_as("diary.base"),
                "diary.base 用 `file.folder.startsWith(...)`（会混入 _template/、logs/ 内的污染文件）",
                '改为 `file.folder == "DIARY"`'))
        elif not re.search(r'file\.folder\s*==\s*"DIARY"', t):
            issues.append(LintIssue("E", _name_as("diary.base"),
                'diary.base 缺少 `file.folder == "DIARY"` 过滤', "加上目录精确过滤"))
        if not re.search(r'note\.subtype\s*==\s*"card"', t):
            issues.append(LintIssue("E", _name_as("diary.base"),
                'diary.base 缺少 `note.subtype == "card"` 过滤（会把容器日志混入复习视图）', "加上 subtype 过滤"))
    else:
        issues.append(LintIssue("E", _name_as("diary.base"), "diary.base 不存在", "检查文件路径"))

    # sr.base（根目录，全库扫描）
    sr_base = VAULT_PATH / "sr.base"
    if sr_base.exists():
        t = sr_base.read_text(encoding="utf-8")
        if re.search(r'file\.folder\s*==\s*"DIARY"', t):
            issues.append(LintIssue("E", _name_as("sr.base"),
                'sr.base 退回 `file.folder == "DIARY"`（失去 FAST 原子笔记的扩展能力）',
                '改为全库扫描：sr_next_review_datetime 存在 + < now() + file.folder != "_template"'))
        if ("sr_next_review_datetime" not in t
                or not re.search(r"<\s*now\(\)", t)
                or not re.search(r'file\.folder\s*!=\s*"_template"', t)):
            issues.append(LintIssue("E", _name_as("sr.base"),
                'sr.base 过滤不完整（应为 sr_next_review_datetime 存在 + < now() + file.folder != "_template"）',
                "修正 filter"))
    else:
        issues.append(LintIssue("E", _name_as("sr.base"), "sr.base（根目录）不存在", "检查文件路径"))

    # 模板自防护：Diary Card Templater 应含 <% %> 使其不匹配日期过滤
    tpl = VAULT_PATH / "_template" / "Diary Card Templater.md"
    if tpl.exists():
        if "<%" not in tpl.read_text(encoding="utf-8"):
            issues.append(LintIssue("E", _name_as("Diary Card Templater"),
                "模板缺少 `<% %>` 表达式，可能被 base 当作普通卡片列出", "保留 Templater 占位语法"))

    # 非根目录的原子卡（应平铺在 DIARY/ 根）
    for stray in find_stray_cards(DIARY_DIR):
        rel = stray.relative_to(VAULT_PATH)
        issues.append(LintIssue("E", stray,
            f"原子卡出现在子目录 `{rel}`（应平铺在 DIARY/ 根）", "移回 DIARY/ 根目录"))

    return issues


def find_stray_cards(root: Path) -> list:
    found: list = []
    for sub in root.iterdir():
        if not sub.is_dir():
            continue
        for p in sub.rglob("*.md"):
            try:
                fm, _ = parse_frontmatter(p.read_text(encoding="utf-8"))
            except Exception:
                continue
            if fm.get("subtype") == "card":
                found.append(p)
    return found


# ─── 主流程 ──────────────────────────────────────────────────
def append_log(msg: str) -> None:
    RUNNER_LOG.parent.mkdir(parents=True, exist_ok=True)
    with RUNNER_LOG.open("a", encoding="utf-8") as f:
        f.write(msg + "\n")


def main() -> None:
    today_str = date.today().strftime("%Y-%m-%d")
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    append_log(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] diary-lint.py 启动")

    all_issues: list = []
    card_count = log_count = other_count = total_count = 0

    for file in sorted(DIARY_DIR.glob("*.md")):
        total_count += 1
        try:
            content = file.read_text(encoding="utf-8")
        except Exception:
            continue
        fm, has_fm = parse_frontmatter(content)
        if not has_fm:
            other_count += 1
            continue
        if fm.get("subtype") == "card":
            card_count += 1
            all_issues.extend(check_card(file, fm))
        elif fm.get("type") == "diary" and fm.get("subtype") is None:
            log_count += 1
            all_issues.extend(check_log(file))
        else:
            other_count += 1

    # E. Base 配置健康（全局，跑一次）
    all_issues.extend(check_bases())

    sections: dict = {k: [] for k in "ABCDE"}
    for iss in all_issues:
        sections.setdefault(iss.section, []).append(iss)

    titles = {
        "A": "时间逻辑", "B": "Schema 完整性", "C": "文件命名",
        "D": "浏览统计", "E": "Base 配置健康",
    }

    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines = [
        "---",
        f"created: {today_str}",
        "generated_by: diary-lint.py",
        "---",
        f"# Diary Lint Report · {today_str}",
        "",
        "## 汇总",
        "",
        "| 项目 | 数值 |",
        "|------|------|",
        f"| 扫描文件总数（DIARY/ 根目录） | {total_count} 个 |",
        f"| 其中 原子卡（subtype: card） | {card_count} 个 |",
        f"| 其中 容器日志（无 subtype） | {log_count} 个 |",
        f"| 其中 其他类型 | {other_count} 个 |",
        f"| 发现问题 | {len(all_issues)} 条 |",
        f"| 生成时间 | {ts}（Python） |",
        "",
        "---",
        "",
    ]

    for sec in "ABCDE":
        lst = sections[sec]
        lines.append(f"## {sec}. {titles[sec]} ({len(lst)} 条)")
        lines.append("")
        if lst:
            lines.extend(iss.render() for iss in lst)
        else:
            lines.append("✅ 无问题")
        lines.extend(["", "---", ""])

    lines.append("*报告由 diary-lint.py 自动生成 · 仅供参考 · 不自动修复任何文件*")

    report_path = LOGS_DIR / f"lint-{today_str}.md"
    report_path.write_text("\n".join(lines), encoding="utf-8")
    append_log(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] diary-lint.py 完成"
               f"（{len(all_issues)} 条问题，报告：{report_path.name}）")

    print(f"[OK] Diary lint 完成：{len(all_issues)} 条问题")
    print(f"[报告] {report_path}")


if __name__ == "__main__":
    main()

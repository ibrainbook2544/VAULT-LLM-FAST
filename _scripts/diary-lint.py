#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Diary Lint 健康检查（Python 原生实现）
依据 AGENTS.md §5.9 编写。
"""

import io
import re
import sys

# Windows 控制台编码兼容
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from pathlib import Path
from datetime import date, datetime, timedelta

# ─── 配置 ────────────────────────────────────────────────────
VAULT_PATH    = Path(__file__).resolve().parent.parent  # 脚本在 _scripts/ 下
DIARY_DIR     = VAULT_PATH / "DIARY"
LOGS_DIR      = DIARY_DIR / "logs"
RUNNER_LOG    = VAULT_PATH / "_scripts" / "task-runner.log"

VALID_INTERVALS = {1, 2, 4, 8, 16, 32, 64, 128}
VALID_SUBTYPES  = {"灵感", "反思", "教训", "金句", "文摘"}
VALID_TYPES     = {"diary-log", "diary-atom"}
REQUIRED_FIELDS = ["type", "interval", "next_review", "importance", "subtype"]

# ─── YAML Frontmatter 简易解析 ──────────────────────────────

def parse_frontmatter(content: str) -> tuple[dict, int]:
    """返回 (frontmatter dict, 正文起始行索引)"""
    lines = content.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, 0
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        return {}, 0

    fm = {}
    current_key = None
    for line in lines[1:end_idx]:
        if re.match(r"^\s+-\s+", line):
            # list item
            if current_key:
                if not isinstance(fm.get(current_key), list):
                    fm[current_key] = []
                fm[current_key].append(line.strip().lstrip("- ").strip())
            continue
        m = re.match(r"^([A-Za-z_][\w-]*)\s*:\s*(.*)$", line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            current_key = key
            if val == "":
                fm[key] = None  # 等待下一行（list 或保持空）
            else:
                # 解析值
                if val.lower() == "true":
                    fm[key] = True
                elif val.lower() == "false":
                    fm[key] = False
                elif val.lower() in ("null", "~", ""):
                    fm[key] = None
                else:
                    # 试着按数字解析
                    try:
                        fm[key] = int(val)
                    except ValueError:
                        try:
                            fm[key] = float(val)
                        except ValueError:
                            # 移除引号
                            if (val.startswith('"') and val.endswith('"')) or (
                                val.startswith("'") and val.endswith("'")
                            ):
                                val = val[1:-1]
                            fm[key] = val
    return fm, end_idx + 1


def parse_date(value) -> date | None:
    """解析 YYYY-MM-DD 字符串为 date 对象"""
    if not value:
        return None
    if isinstance(value, (date, datetime)):
        return value.date() if isinstance(value, datetime) else value
    s = str(value).strip()
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", s)
    if m:
        try:
            return date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        except ValueError:
            return None
    return None


# ─── 检查器 ──────────────────────────────────────────────────

class LintIssue:
    def __init__(self, section: str, file: Path, msg: str, suggestion: str = ""):
        self.section = section
        self.file = file
        self.msg = msg
        self.suggestion = suggestion

    def render(self) -> str:
        link = f"[[{self.file.stem}]]"
        out = f"- {link} — {self.msg}"
        if self.suggestion:
            out += f"\n  - 建议：{self.suggestion}"
        return out


def check_atom(file: Path, fm: dict, body_lines: list[str]) -> list[LintIssue]:
    issues = []
    today = date.today()

    rc = fm.get("review_count")
    lr = parse_date(fm.get("last_review"))
    nr = parse_date(fm.get("next_review"))
    iv = fm.get("interval")
    imp = fm.get("importance")
    st = fm.get("subtype")
    tp = fm.get("type")
    arc = fm.get("archived") or False
    pt = fm.get("promoted_to")

    # ─── A. 状态不一致 ───
    if rc and rc > 0 and not lr:
        issues.append(LintIssue("A", file, f"review_count={rc} 但 last_review 为空",
                                "补 `last_review: YYYY-MM-DD`"))
    if (rc == 0 or rc is None) and lr:
        issues.append(LintIssue("A", file, f"review_count=0 但 last_review={lr}",
                                "确认 review_count 或清空 last_review"))
    if lr and nr and lr > nr:
        issues.append(LintIssue("A", file, f"last_review({lr}) 晚于 next_review({nr})",
                                "检查时间顺序"))
    if lr and nr and iv in VALID_INTERVALS:
        expected = lr + timedelta(days=iv)
        if expected != nr:
            issues.append(LintIssue("A", file,
                f"next_review({nr}) ≠ last_review({lr}) + interval({iv}天) = {expected}",
                f"修正为 {expected}"))
    if arc and nr and nr <= today:
        issues.append(LintIssue("A", file, f"archived=true 但 next_review={nr} ≤ 今日",
                                "已归档卡片不应出现在复习队列，确认 archived 字段"))

    # ─── B. Schema 完整性 ───
    for f in REQUIRED_FIELDS:
        if fm.get(f) is None:
            issues.append(LintIssue("B", file, f"缺必填字段 `{f}`", f"补充 {f} 字段"))
    if iv is not None and iv not in VALID_INTERVALS:
        issues.append(LintIssue("B", file, f"interval={iv} 不在阶梯 {{1,2,4,8,16,32,64,128}}",
                                f"圆整到最接近的合法值"))
    if imp is not None and not (1 <= imp <= 5):
        issues.append(LintIssue("B", file, f"importance={imp} 不在 [1,5]", "修正范围"))
    if st and st not in VALID_SUBTYPES:
        issues.append(LintIssue("B", file, f"subtype={st} 不在 {VALID_SUBTYPES}",
                                "改为合法 subtype"))
    if tp and tp not in VALID_TYPES:
        issues.append(LintIssue("B", file, f"type={tp} 不在 {VALID_TYPES}", "改为合法 type"))

    # ─── C. 文件命名 ───
    stem = file.stem
    if not re.match(r"^\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, f"文件名 `{stem}` 不符合 YYYY-MM-DD 前缀",
                                "重命名加日期前缀"))
    elif tp == "diary-atom" and re.fullmatch(r"\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, "diary-atom 文件名只有日期，缺 slug",
                                "在日期后追加描述性 slug"))
    elif tp == "diary-log" and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", stem):
        issues.append(LintIssue("C", file, f"diary-log 文件名 `{stem}` 带 slug，应只有日期",
                                "去除 slug"))

    # ─── D. 晋升一致性 ───
    if pt:
        # 提取 wikilink 目标
        m = re.match(r"\[\[([^\]]+)\]\]", str(pt))
        target = m.group(1) if m else str(pt)
        # 在整个 vault 中搜索
        found = list(VAULT_PATH.rglob(f"{target}.md"))
        if not found:
            issues.append(LintIssue("D", file, f"promoted_to=`{target}` 死链",
                                    "确认目标文件存在或修正路径"))
        non_empty = [l for l in body_lines if l.strip()]
        if arc and len(non_empty) > 5:
            issues.append(LintIssue("D", file,
                f"archived=true + promoted_to，但正文 {len(non_empty)} 行非空（应为 stub）",
                "删减正文，仅留 `详见 [[target]]`"))
        if not arc:
            issues.append(LintIssue("D", file, "有 promoted_to 但 archived=false（半晋升）",
                                    "设 archived: true"))

    # ─── E. 长期未复习堆积 ───
    if not arc and nr and nr < today - timedelta(days=14):
        days = (today - nr).days
        issues.append(LintIssue("E", file, f"next_review={nr} 已逾期 {days} 天",
                                "执行 /diary-review 清队列"))

    return issues


# ─── 主流程 ──────────────────────────────────────────────────

def main():
    today = date.today()
    today_str = today.isoformat()

    # 写运行日志
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    RUNNER_LOG.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(RUNNER_LOG, "a", encoding="utf-8") as f:
        f.write(f"[{ts}] diary-lint.py 启动\n")

    all_issues: list[LintIssue] = []
    atom_count = 0
    log_count = 0
    other_count = 0
    total_count = 0

    # 只扫描 DIARY/ 根目录，不进 logs/
    for path in DIARY_DIR.glob("*.md"):
        total_count += 1
        try:
            content = path.read_text(encoding="utf-8")
        except Exception as e:
            continue
        fm, body_start = parse_frontmatter(content)
        if not fm:
            other_count += 1
            continue
        tp = fm.get("type")
        if tp == "diary-atom":
            atom_count += 1
            body_lines = content.splitlines()[body_start:]
            all_issues.extend(check_atom(path, fm, body_lines))
        elif tp == "diary-log":
            log_count += 1
        else:
            other_count += 1

    # 按 section 分组
    sections = {"A": [], "B": [], "C": [], "D": [], "E": [], "F": []}
    for issue in all_issues:
        sections[issue.section].append(issue)

    section_titles = {
        "A": "状态不一致",
        "B": "Schema 完整性",
        "C": "文件命名",
        "D": "晋升一致性",
        "E": "长期未复习堆积",
        "F": "Base 配置健康",
    }

    # 生成报告
    report_lines = [
        "---",
        f"created: {today.strftime('%Y-%m-%dT%H:%M')}",
        f"generated_by: diary-lint.py",
        "---",
        f"# Diary Lint Report · {today_str}",
        "",
        "## 汇总",
        "",
        "| 项目 | 数值 |",
        "|------|------|",
        f"| 扫描文件总数（DIARY/ 根目录） | {total_count} 个 |",
        f"| 其中 diary-atom | {atom_count} 个 |",
        f"| 其中 diary-log | {log_count} 个 |",
        f"| 其中其他类型 | {other_count} 个 |",
        f"| 发现问题 | {len(all_issues)} 条 |",
        f"| 生成时间 | {ts}（Python 原生） |",
        "",
        "---",
        "",
    ]

    for sec in ["A", "B", "C", "D", "E", "F"]:
        issues = sections[sec]
        report_lines.append(f"## {sec}. {section_titles[sec]} ({len(issues)} 条)")
        report_lines.append("")
        if issues:
            for issue in issues:
                report_lines.append(issue.render())
        else:
            report_lines.append("✅ 无问题")
        report_lines.append("")
        report_lines.append("---")
        report_lines.append("")

    report_lines.append("*报告由 diary-lint.py 自动生成 · 仅供参考 · 不自动修复任何文件*")

    report_path = LOGS_DIR / f"lint-{today_str}.md"
    report_path.write_text("\n".join(report_lines), encoding="utf-8")

    ts2 = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(RUNNER_LOG, "a", encoding="utf-8") as f:
        f.write(f"[{ts2}] diary-lint.py 完成（{len(all_issues)} 条问题，报告：{report_path.name}）\n")

    print(f"✅ Diary lint 完成：{len(all_issues)} 条问题")
    print(f"📄 报告：{report_path}")


if __name__ == "__main__":
    main()

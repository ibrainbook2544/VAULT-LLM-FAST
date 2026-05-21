<div align="center">

# LLM-FAST

**AI-assisted Obsidian knowledge base** · Karpathy LLM Wiki × FAST molecular notebooks

[![Obsidian](https://img.shields.io/badge/Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?logo=anthropic&logoColor=white)](https://claude.ai/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ibrainbook2544/VAULT-LLM-FAST)](https://github.com/ibrainbook2544/VAULT-LLM-FAST/commits/main)

**English** · [简体中文](README.zh-CN.md)

</div>

---

> Let AI take over the mechanical bookkeeping of knowledge management (80%) so humans can focus on judgment and creation (20%).

LLM-FAST is an Obsidian vault that combines [Andrej Karpathy's LLM Wiki paradigm](https://karpathy.github.io/) with a self-developed **FAST molecular notebook** methodology. It treats the AI assistant (Claudian) as a "knowledge compiler" — ingesting raw material, generating structured wiki pages, and maintaining indexes and cross-links — while humans handle only the high-value judgments (what to read, what to keep, how to link).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Current FAST Sub-vaults](#current-fast-sub-vaults)
- [Configuration](#configuration)
- [AI Assistant (Claudian)](#ai-assistant-claudian)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- 🧠 **AI compiler paradigm** — Claudian auto-ingests → decomposes → indexes → maintains; humans only judge
- 📦 **FAST molecular encapsulation** — each topic is a self-contained "molecule" that can be opened, combined, or sold independently
- 🃏 **Spaced-repetition review** — DIARY atom cards scheduled on `2^N` intervals
- 📋 **Task tracking** — TASK uses [Obsidian Bases](https://obsidian.md/bases) for kanban-style views
- 🔗 **Flat ZettelKasten linking** — `[[wikilink]]` without paths, free jumps across FASTs
- 🩺 **Health checks** — `lint` command detects dead links, contradictions, orphans, schema violations
- 📊 **Dataview dashboards** — browsing stats, cold notes, weekly access at a glance

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Obsidian](https://obsidian.md/) | ≥ 1.7 | Knowledge base host |
| [Git](https://git-scm.com/) | ≥ 2.30 | Version control |
| [Claude Code](https://claude.ai/claude-code) | latest | AI compilation & maintenance (optional but strongly recommended) |

## Quick Start

```bash
# 1. Clone the repo
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. Open with Obsidian
#    File → Open vault → select the LLM-FAST directory

# 3. Install required plugins (see "Configuration")
#    Obsidian → Settings → Community plugins → Browse

# 4. (Optional) Start Claude Code in the repo root
claude
```

Once open, start from [`index.md`](index.md), or jump straight into [`DIARY/diary.base`](DIARY/diary.base) for today's review queue.

## Usage

### Core workflow

```
Browsing / clipping ──→ INBOX/Clippings/
Daily thoughts      ──→ DIARY/YYYY-MM-DD.md  (diary-log)
                              │
                              │  split when worth long-term retention
                              ▼
                       Atom cards (diary-card)
                              │
                              │  ─→ spaced-repetition queue (1/2/4/8/16/32/64/128 days)
                              │
                              │  promoted when mature
                              ▼
               FAST/wiki/concepts/  or  synthesis/
```

### Common commands (within a Claude Code session)

| Command | Description |
|---------|-------------|
| `ingest [file]` | Ingest new sources from `raw/`; generate sources / concepts / entities pages |
| `query <topic>` | Synthesize an answer from the wiki; can be saved as output |
| `lint` | Health check: dead links, contradictions, orphans; result written to `logs/` |
| `/diary-review` | Spaced-repetition flow: present cards one by one, write frontmatter immediately |
| `/todo-lint` | Health check for the task vault |

## Directory Structure

```
LLM-FAST/
├── OPC/                  # Knowledge store (FAST sub-vault aggregation)
│   ├── AI/AI工具/Claude/
│   │   └── FAST-CLAUDE/  # Claude AI in-depth research
│   └── 学/
│       ├── FAST-FAST/    # The FAST methodology itself
│       └── FAST-LLM-Wiki/ # Karpathy LLM Wiki paradigm
├── INBOX/                # Raw input layer
│   ├── Clippings/        # Web clippings
│   └── Inbox.md          # Temporary landing spot
├── TASK/                 # Task board (task.base)
├── DIARY/                # Process layer
│   └── diary.base        # Diary + spaced-repetition views
├── _template/            # Note templates (Task / Diary Log / Diary Card)
├── _attachment/          # Global attachments
├── index.md              # Master index
├── dashboard.md          # Stats dashboard
├── AGENTS.md             # AI behavior spec (constitution)
├── CLAUDE.md             # @AGENTS.md (AI context entry point)
├── README.md             # This file (English, default)
└── README.zh-CN.md       # Simplified Chinese version
```

> Each `FAST-*` sub-directory is a complete LLM Wiki and can be opened standalone as its own Obsidian vault.

## Current FAST Sub-vaults

| FAST | Topic | Status | Entry |
|------|-------|--------|-------|
| **FAST-FAST** | Definition and explanation of the FAST methodology | 🟢 Active | [`OPC/学/FAST-FAST/wiki/index.md`](OPC/学/FAST-FAST/wiki/index.md) |
| **FAST-LLM-Wiki** | LLM Wiki paradigm research (Karpathy methodology) | 🟢 Active | [`OPC/学/FAST-LLM-Wiki/wiki/index.md`](OPC/学/FAST-LLM-Wiki/wiki/index.md) |
| **FAST-CLAUDE** | Claude AI in-depth research | 🟢 Active | [`OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md`](OPC/AI/AI工具/Claude/FAST-CLAUDE/wiki/index.md) |

## Configuration

### Required Obsidian plugins

| Plugin | Purpose |
|--------|---------|
| **Dataview** | Index queries, stats, dynamic views |
| **Templater** | Note template filling |
| **QuickAdd** | Quick creation of atoms / tasks |
| **Obsidian Git** | Auto-backup commits to GitHub |
| **Obsidian Tasks** | Task management for TASK |
| **Reminder** | Atom card review reminders |
| **Update Time on Edit** | Automatic `updated` field maintenance |
| **Calendar** | Calendar view for opening diary-logs |

### Frontmatter spec

See [`AGENTS.md`](AGENTS.md) §4.2 (FAST wiki / INBOX) and §5.2 (DIARY atom).

## AI Assistant (Claudian)

This vault is maintained by [Claude Code](https://claude.ai/claude-code) acting as a "knowledge compiler". The full behavior spec, naming rules, frontmatter schema, review algorithm, and health-check items live in [`AGENTS.md`](AGENTS.md).

**Key constraints**:
- ❌ Never modify original files in `raw/`
- ❌ Never delete existing wiki pages (append/update only)
- ❌ `lint` only reports, never auto-fixes
- ✅ `/diary-review` writes frontmatter **immediately** after each card is rated — batching is forbidden

## Roadmap

Source: [`AGENTS.md`](AGENTS.md) §8 "Pending items"

- [ ] `SCHEMA.md` — separate compilation-rule file for each FAST
- [ ] `log.md` — append-only operation log
- [ ] **HTML presentation layer** — `outputs/` generates interactive HTML reports
- [ ] **Promotion trigger** — automatic / semi-automatic suggestions for INBOX → FAST

## Contributing

This is a personal knowledge base and does not accept external PRs in general. However, you are welcome to:

- Open issues to discuss the FAST methodology
- Fork and build your own LLM-FAST on top of this structure
- Use the [`llm-wiki-init`](skill://llm-wiki-init) skill to bootstrap the same structure in your own Obsidian vault

## Acknowledgements

- [Andrej Karpathy](https://karpathy.github.io/) — inspiration for the LLM Wiki paradigm
- [Anthropic Claude](https://www.anthropic.com/) — the capability source behind Claudian
- [Obsidian](https://obsidian.md/) — excellent local-first knowledge base tool
- [王树义 (Prof. Wang Shuyi)](https://www.bilibili.com/) — Chinese LLM Wiki practice methodology
- 程序员老李, Tarek Sherif, Lex Fridman — various discussions and surveys

## License

The **structure, templates, and AI behavior spec** (AGENTS.md / CLAUDE.md / `_template/` / `*.base`) of this repo are licensed under [MIT License](LICENSE).

**Note content** (`OPC/`, `DIARY/`, `INBOX/`) is personal knowledge and is **not** licensed for copying or redistribution — please contact the author for citation.

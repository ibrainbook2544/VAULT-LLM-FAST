<div align="center">

# LLM-FAST

**AI-Assisted Obsidian Knowledge Base** · Karpathy LLM Wiki × FAST Molecular Notebook

[![Obsidian](https://img.shields.io/badge/Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?logo=anthropic&logoColor=white)](https://claude.ai/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ibrainbook2544/VAULT-LLM-FAST)](https://github.com/ibrainbook2544/VAULT-LLM-FAST/commits/main)

**English** · [简体中文](README.zh-CN.md)

</div>

---

## Three Evolutions of Knowledge Management: From PKM/KOS to LLM-Wiki, then to LLM-FAST

Everyone who has studied seriously has experienced the same frustration: the more notes you take, the harder they are to find; the more elaborate the system you build, the less you want to maintain it.

This is not a problem of personal willpower. It is a problem of paradigm.

### The Traditional Paradigm: Two Systems, One Bottleneck

Over the past few decades, knowledge workers have relied on two dimensions to manage their cognitive assets:

**Personal Knowledge Management (PKM)**, human-centered. Quick notes, journals, todos, and GTD workflows capture the flow of thoughts; forgetting-curve-driven spaced review and reminders fight the natural decay of memory. This layer answers: _How do I learn?_

**Knowledge Organization Structure (KOS)**, knowledge-centered. Outline notes, knowledge cards, relational tables, and knowledge graphs forge fragments into a callable structure. This layer answers: _How is knowledge stored?_

The two systems look complete, yet the bottleneck always lands in the same place — **the human**.

### Squeezed by Two Forces

The traditional paradigm is being torn apart by two forces at once.

First, **human inertia**: recording, organizing, linking, and archiving each continuously drain willpower. The more elaborate the system, the higher the maintenance cost. The fate of most knowledge bases is "built diligently, used carelessly, abandoned in the end."

Second, **the runaway nature of knowledge itself**: information swells exponentially, disciplines cross-pollinate and iterate faster, and any field's "latest understanding" is rapidly replaced by new knowledge within a few months.

### The AI Era: [Andrej Karpathy's LLM Wiki Paradigm](https://karpathy.github.io/)

The AI assistant plays the role of a **knowledge compiler**: ingesting raw material, compiling wiki pages, and maintaining indexes and cross-links.

The strength of the traditional `LLM-Wiki` is its simplicity: `raw/` holds raw material, `wiki/` holds the pages compiled by the LLM.

> My other repository, [llm-wiki-skills](https://github.com/ibrainbook2544/llm-wiki-skills), fairly strictly follows [Andrej Karpathy's LLM Wiki paradigm](https://karpathy.github.io/) and implements an `LLM-Wiki`.

The traditional `LLM-Wiki` focuses only on knowledge itself, and not on the cognition and memory process of the knowledge user — **the human**. But after long-term use, I have found several problems:

1. **New knowledge is not mounted onto a clearly layered knowledge system, and its relationship to other branches and nodes is not made explicit.**
   A fully flat structure makes ingesting material very easy — when adding a note you needn't agonize over where to file it — but you lose a chance to **mount** it onto the knowledge tree, easily forming `knowledge islands`, which makes it hard to see where a new knowledge point sits within the overall knowledge tree.

2. **Not suited to frequently changing content** (such as quick notes, journals, notes, article drafts, etc.), only to content that rarely changes (such as clippings of web articles and videos, papers or e-books, user manuals, archived old articles, etc.); otherwise every content change requires recompiling and regenerating a dozen pages and dozens of related links — not only time-consuming, but also token-hungry.

3. **Lacks meaningful, high-quality output.**
   The traditional `LLM-Wiki` focuses more on ingesting material, distilling concepts, mining connections, and citing sources, but cannot derive insight or generate high-quality content, and even less can it discern and confirm the accuracy and completeness of knowledge. For example, after casually grabbing a few video tutorials and dropping them into the `LLM-Wiki` system, within minutes it generates dozens of files — looking lively and giving a sense of accomplishment and learning satisfaction — but when you actually ask it to produce a paper or tutorial, it over-relies on those video sources and struggles to guarantee knowledge quality. You must think for yourself, re-gather reliable material, and even fully shed your dependence on the `LLM-Wiki` before you can write a high-quality, paper-grade knowledge tutorial.

4. The above concerns **KOS**, while the **PKM** side is even more lacking. For instance, it lacks **reminders for forgetting-curve-based review or spaced repetition**, as well as a whole set of **PKM** features such as **quick notes, journals, todos, and GTD**.

5. **Cannot fully preserve conversations with the AI.**
   The `LLM-Wiki` LOG contains only some simple operational information and lacks complete contextual content, which greatly hampers later review and retrospection.

### The Third Evolution: LLM-FAST

**LLM-FAST** is a combined **Personal Knowledge Management system** + **Knowledge Organization Structure** (**PKM** + **KOS**) aimed at individuals / small teams:

- On the **PKM** side, it fuses [Andrej Karpathy's LLM Wiki paradigm](https://karpathy.github.io/) with my own **FAST Molecular Notebook** methodology. Because there is now a complete-architecture, rigorously-logical learning methodology and knowledge system, it becomes possible to rapidly generate high-quality output articles on this foundation (addressing `LLM-Wiki` #3).

- On the **KOS** side, it adopts a three-dimensional hierarchical directory structure (addressing `LLM-Wiki` #1), and also integrates **Clippings**, **Inbox (quick notes)**, and **Diary** (addressing `LLM-Wiki` #2), while adding multiple Obsidian plugins, scripts, and templates I developed myself — such as **Spaced-Review Reminder (SR Reminder)**, the **spaced-review evaluation script (sr-evaluate.js)**, and **TASK automated script reminders (Shell Reminder)** (addressing `LLM-Wiki` #4) — and finally the **AI conversation logging script (conversation-logger.js)** (addressing `LLM-Wiki` #5).

Therefore, `LLM-FAST` does not merely **mount** knowledge onto a hierarchical knowledge tree; it lets you **actively focus** and, moreover, gives you the chance to be **passively reminded to review and reflect**.

---

## Table of Contents

- **[Core Features](#core-features)**
- **[System Composition](#system-composition)**
  - [AI Agent](#ai-agent)
  - [Skills](#skills)
  - [Scripts](#scripts)
  - [OB Plugins](#ob-plugins)
  - [OB Templates](#ob-templates)
  - [Dashboard / Base: The View Layer](#dashboard--base-the-view-layer)
- **[Directory Structure](#directory-structure)**
- **[Core Functions](#core-functions)**
  - [Inbox (Quick Notes)](#inbox-quick-notes)
  - [Diary: The Process & Memory Layer](#diary-the-process--memory-layer)
  - [\[Best Practice\] Filter · Categorize · Locate & Mount](#best-practice-filter--categorize--locate--mount)
  - [Ingest — Atomization & Analysis](#ingest--atomization--analysis)
  - [\[Best Practice\] Fact-Check, Conflict Resolution, Health Check (Lint)](#best-practice-fact-check-conflict-resolution-health-check-lint)
  - [`FAST 6+1` Dimensional Expansion — Molecularization & Synthesis](#fast-61-dimensional-expansion--molecularization--synthesis)
  - [Knowledge-Tree Roaming: Half-Random Walk — Active Review](#knowledge-tree-roaming-half-random-walk--active-review)
  - [Memory Cards & Spaced-Review Reminder (SR Reminder) — Passive Review](#memory-cards--spaced-review-reminder-sr-reminder--passive-review)
  - [The Three Task Subtypes](#the-three-task-subtypes)
  - [Log Archiving (Logs)](#log-archiving-logs)
- **[Prerequisites](#prerequisites)**
- **[Installation](#installation)**
- **[Configuration](#configuration)**
- **[Common Commands & Workflows](#common-commands--workflows)**
- **[Best Practices](#best-practices)**
- **[Contributing, Acknowledgements & License](#contributing-acknowledgements--license)**
  - [Contributing](#contributing)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

---

## Core Features

- **AI Knowledge Compiler** — `LLM-Wiki`: the AI handles ingestion, decomposition, summarization, indexing, and link maintenance.
- **FAST Molecular Notes**: each `FAST-*` is a complete `LLM-Wiki` that can be independently opened, migrated, combined, or published in Obsidian.
- **Hierarchical locating + flat linking**: FASTs are located through the **directory tree**; inside a FAST, **flat ZettelKasten links** are used — `[[wikilink]]` connections without paths, allowing free jumps across FASTs.
- **Memory Cards**: store only simplified, distilled **FAST** atomic notes, observing **one card, one concept**, such as the concepts and entities in the wiki.
- **Spaced-Review Reminder (SR)**: following a simplified forgetting curve (based on `2^N` intervals), it automatically sets the review-related **properties (frontmatter)** in memory cards and configures an **interval reminder (SR Reminder)**. Via the memory-evaluation buttons on a card, the user uses buttons 1–4 for same-day consolidation and button 5 to advance across days, with the memory state written back to **properties (frontmatter)** instantly.
- **Diary's two-layer model**: besides recording the abundant, miscellaneous daily stream, you can also select key content with the mouse and use QuickAdd to quickly create a **Diary Card** to record a concise yet important knowledge card, ready for **spaced review (SR)**.
- **Task threefold split**: `todo`, `reminder`, and `shell` correspond respectively to manual to-dos, timed reminders for the user to act, and timed automatic script execution.
- **Bases/Dataview dashboards**: `sr.base`, `diary.base`, `task.base`, and several Dashboards provide unified entry points — browse statistics, neglected notes, and this week's visits at a glance.
- **Health checks**: `/sr-lint`, `/diary-lint`, and `/task-lint` only report problems such as dead links, conflicts, orphan files, and schema violations; they do not fix them automatically.
- **AI conversation logging script (conversation-logger.js)**: fully records conversations with the AI, which you can also quickly categorize and organize for easy future search and retrospection.

---

## System Composition

---

### AI Agent

- [Codex](https://chatgpt.com/codex), [Claude Code](https://claude.ai/code): the "knowledge compiler." See [`AGENTS.md`](AGENTS.md) for AI behavior specifications.

---
### Skills

- `skill-creator`
- `obsidian-cli`, `obsidian-markdown`, `obsidian-bases`
- llm-wiki-skills: llm-wiki-init, llm-wiki-ingest, llm-wiki-lint, etc.
- llm-fast-skills

---
### Scripts

| File                               | Purpose                             |
| -------------------------------- | ------------------------------ |
| `_scripts/sr-evaluate.js`        | After an SR button rating, writes back to frontmatter and jumps to the next card |
| `_scripts/conversation-logger.js` | AI conversation logging script; automatically saves the full conversation into `logs/`    |

---
### OB Plugins

| Plugin                            | Purpose                                 |
| ----------------------------- | ---------------------------------- |
| `Obsidian Git`                | Auto-backup and commit to GitHub                     |
| `Dataview`                    | Index-page queries, statistics, dynamic views, dashboards                  |
| `Claudian`                    | Use Claude / Codex / OpenCode seamlessly within OB |
| `Templater`                   | Note template filling                             |
| `QuickAdd`                    | Works with `Templater` to quickly create pages              |
| `Update Time on Edit Content` | (self-developed) automatically maintains the `updated` field            |
| `Reminder`                    | Ordinary reminders, `(@time)`                       |
| `SR Reminder`                 | (self-developed) spaced-review reminder; scans due SR cards and notifies         |
| `Shell Reminder`              | (self-developed) script reminder; runs a script on time `[shell: ...]`   |
| `Obsidian Tasks`              | TASK management (currently unused)                   |
| `Obsidian Daily Notes`        | OB daily notes                              |
| `Obsidian Calendar`           | OB calendar                              |

---
### OB Templates

| Template                                                  | Purpose                                            |
| --------------------------------------------------- | --------------------------------------------- |
| `_template/Diary Card Templater`                    | Template for creating a new memory card                                     |
| `_template/Diary Template`                          | Template for creating an ordinary diary entry                                     |
| `_template/SR Reminder Template`                    | Template for a spaced-review reminder; any page that applies it becomes a memory card                      |
| `_template/Task Template`                           | Template for creating tasks via QuickAdd; applicable to any page                      |
| `_template/templater-startup-template-view-counter` | Templater startup-script template; automatically increments the view count after opening a page (15-second debounce dwell by default) |

---
### Dashboard / Base: The View Layer

**Dashboards**:

| File | Type | Purpose |
|------|------|------|
| [`dashboard.md`](dashboard.md) | `type: dashboard` | Vault-wide statistics overview |
| [`SR Dashboard.md`](SR%20Dashboard.md) | `type: dashboard` | SR review entry point |
| [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md) | `type: dashboard` | DIARY cards & review overview |
| [`TASK/Task Dashboard.md`](TASK/Task%20Dashboard.md) | `type: dashboard` | Task overview |

**Databases**:

| File | Scan Scope | Purpose |
|------|----------|------|
| [`sr.base`](sr.base) | Vault-wide notes carrying `sr_next_review_datetime`, excluding `_template/` | Vault-wide SR review queue |
| [`DIARY/diary.base`](DIARY/diary.base) | `type: diary` + `subtype: card` directly under `DIARY` | DIARY atomic-card view |
| [`TASK/task.base`](TASK/task.base) | `type: task` directly under `TASK` | Task view |

---

## Directory Structure

```text
INBOX/   Quick notes: land first, organize later, keep it empty   (synced with mobile Obsidian via Syncthing)
    │  
    ├── Inbox.md    Ideas, fleeting thoughts
    │  
    └── Clippings   Clippings: web videos, web articles, etc. (via the Chrome extension Obsidian Web Clipping)
        
        
DIARY/
    │
    ├── Daily journal → DIARY/YYYY-MM-DD.md   (via the Obsidian daily-notes plugin, applying template _template/Diary Template)
    │
    └── Memory Card → DIARY/YYYY-MM-DD <slug>.md   (via the Obsidian plugins QuickAdd and Templater, applying template _template/Diary Card Templater)
                                  │
                                  ▼
                Spaced-Review Reminder (SR Reminder) pops up the memory card on time   (OB plugin SR Reminder)
                                  │
                                  ▼
                    User clicks a memory-evaluation button   (via the script sr-evaluate.js)
                                  
                                  
TASK/   (created via the OB plugin QuickAdd and template _template/Task Template)
    │
    ├── todo
    │
    ├── reminder   (via the OB plugin Reminder)
    │
    └── shell reminder   (via the OB plugin Shell Reminder)
    
    
<domain>/<subdomain>/FAST-<molecular notebook>/      Long-term knowledge layer: LLM-Wiki
        ├── raw/             Raw material, read-only retention
        ├── wiki/sources/    Source transcription / outline notes
        ├── wiki/concepts/   Concept cards
        ├── wiki/entities/   Entity cards
        ├── wiki/synthesis/  Synthesis
        └── wiki/outputs/    External output
        
index.md                     # LLM-FAST master index
        
        
logs/                        # Plugin, experiment, and runtime logs   (via the AI conversation logging script conversation-logger.js)

sr.base                      # SR review queue
SR Dashboard.md              # SR dashboard
dashboard.md                 # Statistics dashboard
AGENTS.md                    # Codex behavior specification
CLAUDE.md                    # Claude behavior specification
README.md                    # Documentation


Note: One-click memory card (Card) creation — on any page you can select key content with the mouse and quickly create one via QuickAdd.
```

---

## Core Functions

---

### Inbox (Quick Notes)

**Purpose:** capture temporary thoughts, flashes of inspiration, web clippings, and pending material at any time.

**Core principle: land first, organize later.** Don't agonize over storage location; focus on quick recording, then consolidate each evening to keep it empty.

**Directory structure**

- `INBOX/Inbox.md` — quick text notes, no need to pursue structural completeness
- `INBOX/Clippings/` — directory for web clippings
- `INBOX/<pending material>` — staging area for other temporary files

**Organizing workflow**

When long-term retention is needed, there are two paths:

- Use `QuickAdd` to create a memory card in one click
- Move the clipping file into the `raw/` of the corresponding FAST molecular notebook to trigger the Ingest workflow, which automatically generates the associated `Wiki` files

**Mobile sync**

Supports input anytime, anywhere, including voice memos:

- Paid option: `OB Sync` (official, stable)
- Free option: `Syncthing` (direct LAN connection, zero cost)

---
### Diary: The Process & Memory Layer

It uses a two-layer model; all files lie flat under the `DIARY/` root, distinguished by `frontmatter`:

| Type | frontmatter | Filename | Purpose |
|------|-------------|--------|------|
| Container log | `type: diary`, no `subtype` | `YYYY-MM-DD.md` | Same-day stream, temporary records; not subject to review |
| Atomic card | `type: diary` + `subtype: card` | `YYYY-MM-DD <slug>.md` | A single idea / reflection / lesson / excerpt; enters SR |

Key entry points:

- [`DIARY/Diary Dashboard.md`](DIARY/Diary%20Dashboard.md): the DIARY dashboard.
- [`DIARY/diary.base`](DIARY/diary.base): today's review, overdue, high-value low-exposure, newly created not-yet-reviewed, and all cards.
- [`_template/Diary Template.md`](_template/Diary%20Template.md): the daily container-log template.
- [`_template/Diary Card Templater.md`](_template/Diary%20Card%20Templater.md): the atomic-card template, with built-in SR buttons.


---
### [Best Practice] Filter · Categorize · Locate & Mount

 🔍 **Filter**
 
> Don't keep everything! Some information is enough to read once — don't let it clutter your note library.

 🗂️ **Categorize**
 
Decide its destination based on the information's **reuse value**:

| Value           | Destination                                        |
| ------------ | ----------------------------------------- |
| Worth keeping, but no need to recall repeatedly | Store in the day's ordinary **diary**                             |
| Worth recalling and reviewing later     | Store in a **memory card**, e.g. `DIARY/YYYY-MM-DD <slug>.md` |

 📌 **Locate & Mount**
 
For files worth organizing in depth (such as clipping files), proceed as follows:

1. Locate the owning domain in the **directory tree**
2. Create a **FAST Molecular Notebook**
3. Move the raw file into `raw/`

---
### Ingest — Atomization & Analysis

Each `FAST-*` is a **molecular notebook** that internally follows the `LLM-Wiki` structure:

```text
FAST-<topic>/
├── raw/          # Raw material, read-only
├── asset/        # Attachments
├── wiki/
│   ├── index.md
│   ├── sources/   # Transcription notes
│   ├── concepts/
│   ├── entities/
│   ├── synthesis/
│   └── outputs/
├── AGENTS.md
└── CLAUDE.md
```

Typical ingest workflow:

1. Place raw material into `raw/`.
2. The AI reads it in full and confirms the key points with the user.
3. Generate the source transcription notes in `wiki/sources/`.
4. Split / update `concepts/` and `entities/`.
5. Update `wiki/index.md`.
6. When necessary, generate `synthesis/` or `outputs/`.

---
### [Best Practice] Fact-Check, Conflict Resolution, Health Check (Lint)

Once the `Ingest` workflow finishes, the notebook is not in a "finished state" — the raw material itself may contain errors or outdated information, or contradict existing concept nodes. Therefore, after each **ingestion** a round of **three-layer validation** must be performed.

**Fact-Check**: the AI annotates the credibility of each key assertion in `sources/`, marks content needing a second confirmation (`[?]`), and records pending-verification tasks in `AGENTS.md`, to prevent erroneous information from quietly spreading into `concepts/` and `synthesis/`; finally, the human verifies and confirms in person.

**Conflict Resolution**: when a new note conflicts with an existing concept node, it must not simply be overwritten; instead, both statements should be archived side by side in the `## Conflicts` section of the corresponding `concepts/*.md`, with sources and timestamps attached, to be adjudicated by the user in a later Synthesis stage.

**Health Check (Lint)**: analogous to static code analysis, periodically scan the entire `wiki/` directory to detect isolated nodes (`entities/` with no backlinks), blank placeholder files, broken internal links in `index.md`, and overly duplicated concept entries. The Lint report is output to `outputs/lint-report-<date>.md` as a prerequisite checklist for the next `Ingest`.

The three-layer validation together safeguards the notebook's **signal-to-noise ratio** — what is **ingested** is not merely information, but verified, self-consistent knowledge.

---
### `FAST 6+1` Dimensional Expansion — Molecularization & Synthesis

> Note: this step is the most important! It is the core step of `LLM-FAST`. It determines whether the entire **FAST Molecular Notebook** possesses **authenticity**, **correctness**, and **completeness**.

For details, see: [FAST (Full Area Stack Tree)](_doc/FAST（Full%20Area%20Stack%20Tree）.md)

---
### Knowledge-Tree Roaming: Half-Random Walk — Active Review

**Random Walk** is a classic method in the **Personal Knowledge Management (PKM)** field for active review and memory consolidation. Although `Obsidian` has a built-in `Random Walk` feature, its fully random nature often falls short when facing a massive number of notes — low hit rate, poor review efficiency — failing to meet the needs of systematic knowledge management.

`LLM-FAST`'s **random walk** improves on this. Rather than blind randomness, it comprehensively factors in dimensions such as **degree of memory**, **degree of importance**, and **view count**, achieving a purposeful, high-efficiency **Half-Random Walk**.

**How the Half-Random Walk works**:

A weighting mechanism is introduced when selecting nodes: the lower a note's `view count` and the higher its `importance`, the greater its probability of being selected. This means the system preferentially guides you toward those "important but long-unrevisited" knowledge nodes, making every roam more valuable.

---
### Memory Cards & Spaced-Review Reminder (SR Reminder) — Passive Review

Core goal: let knowledge worth retaining long-term resurface at the right moments along the **Ebbinghaus forgetting curve**, trading the minimum review cost for the deepest memory retention.

**Spaced-Review (SR) algorithm**

A memory card's review cadence is driven by the following properties and algorithm:

```text
Initial state:
  sr_review_count        = 0
  sr_next_review_datetime = now + 15min

Buttons 1–4 (same-day repeated consolidation):
  next = now + 15min × 2^(rating - 1)
  sr_review_count unchanged

Button 5 (round complete, advance across days):
  base = max(sr_next_review_datetime, now)
  next = base + 24h × 2^sr_review_count
  sr_review_count += 1
```

> Buttons 1–4 are for **same-day reinforcement**, with intervals increasing on a minute scale; button 5 represents **mastery for this round**, triggering an exponential cross-day deferral, with interval days running 1, 2, 4, 8, 16…

**Memory-evaluation button reference**

|Button|Mastery|Next review interval|
|---|---|---|
|1|Forgotten|+15 minutes|
|2|Fuzzy|+30 minutes|
|3|Okay|+60 minutes|
|4|Memorized|+120 minutes|
|5|Round complete|1 → 2 → 4 → 8 → 16… days|

**💡 Quickly create a memory card**

On any page, select key content with the mouse and create a memory card in one click via `QuickAdd` — effortless, zero-friction capture.

---
### The Three Task Subtypes

`LLM-FAST` subdivides tasks into three subtypes, covering the full execution chain from **manual** to **scheduled automation**, to meet task-management needs across different scenarios.

|subtype|Meaning|Trigger|Body syntax|
|---|---|---|---|
|`todo`|Ordinary to-do|Manual execution|`- [ ] content`|
|`reminder`|Remind the user to act on time|Obsidian Reminder plugin|`- [ ] content (@YYYY-MM-DD HH:mm)`|
|`shell`|Run a script automatically on time|Shell Reminder plugin|`- [ ] content (@time) [shell: script path]`|

**`todo` — Ordinary To-Do**

The most basic task type, used to record items requiring human intervention and manual completion. There is no time binding; the user decides when to handle it. Suitable for daily action lists, project subtasks, temporary memos, and similar scenarios.

```markdown
- [ ] Organize this week's meeting notes
- [ ] Reply to Alice's email
```

**`reminder` — Timed Reminder**

Binds a specific point in time to a task; when it arrives, the **Obsidian Reminder plugin** pushes a notification reminding the user to actively handle the matter. The task itself still requires manual completion; the plugin only "gives you a shout at the right time." Suitable for tasks with a clear deadline that need timed follow-up.

```markdown
- [ ] Submit quarterly report (@2025-06-30 09:00)
- [ ] Call Mom (@2025-06-01 20:00)
```

**`shell` — Timed Automatic Execution**

The most automated of the three task types. Building on `reminder`, it further binds an executable script that, upon reaching the specified time, is automatically triggered by the **Shell Reminder plugin** with no human intervention. Suitable for periodic data sync, file backup, automated report generation, and similar scenarios.

```markdown
- [ ] Daily backup of the note vault (@2025-06-01 03:00) [shell: ~/scripts/backup.sh]
- [ ] Auto-push daily report (@2025-06-01 18:00) [shell: ~/scripts/send_report.py]
```

**Three task types at a glance**

|        | `todo` | `reminder`    | `shell`          |
| ------ | ------ | ------------- | ---------------- |
| Needs manual handling | ✅      | ✅             | ❌                |
| Bound to a time point  | ❌      | ✅             | ✅                |
| Auto-executes on time | ❌      | ❌             | ✅                |
| Depends on a plugin   | ❌      | `OB Reminder` | `Shell Reminder` |

> **Selection advice**: use `todo` for items with no time pressure; use `reminder` for items that need a timed nudge but still require manual handling; use `shell` for repetitive operations that can be fully scripted with no human intervention.

---
### Log Archiving (Logs)

`LLM-FAST` has a complete built-in log-archiving system that brings both **daily activity records** and **AI conversation records** under unified management in the `logs/` directory, forming a searchable, reviewable personal knowledge trail.

**Example directory structure**

```
logs/
├── 2026-05-13                          ← daily log (auto-archived by date)
├── 2026-05-14
├── 2026-05-16 OB plugin: Reminder      ← titled log (important matter)
└── 2026-05-18 120708 Add buttons
```

Log filenames support two formats:

- **Date only** (`YYYY-MM-DD`): a general record for the day, suitable for stream-style daily archiving
- **Date + timestamp + title** (`YYYY-MM-DD HHmmss title`): a second-precise event record, suitable for marking important milestones, development records, inspiration memos, etc.

**AI conversation logging script**

`conversation-logger.js` saves every one of your conversations with the AI in full to the `logs/` directory, generating structured archive files. Its core value lies in:

- **Fully preserving context**: it records the complete content of questions and replies, not fragmentary summaries, so you can revisit the original text later
- **Quick categorizing & organizing**: conversation records and daily logs are stored together, supporting quick search by date and keyword
- **Accumulating reusable knowledge**: recurring problems and solutions naturally accumulate in the logs, forming your own personal AI Q&A knowledge base
- **Aiding review & retrospection**: combined with the spaced-review mechanism, important AI conversations can be re-processed into memory cards and enter the long-term memory-management flow

> **Example use case**: while debugging a script, you repeatedly confirm the logic with the AI; after the conversation it is automatically archived as `2026-05-18 143022 Debug backup.sh`, and next time you hit a similar problem you can search the logs to find the complete solving process.

---
## Prerequisites

| Tool                                    | Version     | Purpose       |
| ------------------------------------- | ------ | -------- |
| [Obsidian](https://obsidian.md/)      | ≥ 1.7  | Knowledge-base management    |
| [Git](https://git-scm.com/)           | ≥ 2.30 | Version control     |
| [Claude Code](https://claude.ai/code) | Latest     | AI compilation & maintenance |
| [Codex](https://chatgpt.com/codex)    | Latest     | AI compilation & maintenance |

---
## Installation

```bash
# 1. Clone the repository
git clone git@github.com:ibrainbook2544/VAULT-LLM-FAST.git LLM-FAST
cd LLM-FAST

# 2. Open with Obsidian
#    File → Open vault → select the LLM-FAST directory

# 3. Turn off Restricted mode and enable community plugins
#    Settings → Community plugins → enable the required plugins
```

---
## Configuration

> Note: the Git repository already includes all OB plugins, templates, scripts, and related configuration — it even retains development logs and some core **FAST Molecular Notebooks** — which you may modify and pick and choose as you like.

---
## Common Commands & Workflows

| Command | Description |
|------|------|
| `ingest [file]` | Ingest new sources from `raw/` within a FAST, generating sources / concepts / entities |
| `query <topic>` | Answer comprehensively based on the wiki; can be saved to outputs |
| `lint` | FAST health check: dead links, conflicts, orphan files, etc. |
| `/diary-lint` | DIARY health check; reports only, no auto-fix |
| `/todo-lint` | TASK health check; reports only, no auto-fix |
| `/llm-wiki-init` | Initialize a new FAST / LLM Wiki structure |

---
## Best Practices

### 0. Start from the Browser Bookmarks Bar

While browsing the web day to day, I casually add nice, save-worthy, or worth-studying web pages (especially YouTube videos) to the bookmarks bar.

> **Note**: don't create folders in the bookmarks bar! Just put them at the top level so they stand out the most.

The bookmarks bar inherently carries the psychological pressure of "an eyesore that's uncomfortable until cleared," and this sense of urgency is the drive behind organizing — use it well. Bookmarks need no extra reminder; the visual pressure is itself the reminder.

### 1. Clippings — Land First, Organize Later, Set a Reminder

Clipping is the first gate through which knowledge flows into the system; the core principle is **zero-friction capture** — don't agonize over the destination during input.

- **YouTube videos**: clip in one click via the Chrome extension `OB Web Clipper`, automatically dropping the bookmarked web content into `INBOX/Clippings/<YT video title>`.

**Set an organizing reminder:**

- After clipping, immediately create a `reminder`-type Task and set a time to handle it that evening.
- If the day's clipping volume is large, create a **memory card** in the diary, uniformly labeled "organize clippings tonight," and have SR Reminder pop it up on time.

> Tip: if the reminder time has no date and only a time, it means the reminder fires at that time every day.

### 2. Locate & Mount

Once the reminder fires, I formally begin organizing. The core of this step is: **mount new knowledge onto a clearly layered knowledge tree to avoid forming knowledge islands.**

1. Find the owning domain node in the knowledge tree (if none, create the corresponding folder);
2. Create a **FAST Molecular Notebook** under that node (folder name being the domain name in slug format);
3. Run `/llm-wiki-init` to have the LLM initialize and generate the Wiki architecture;
4. Move the clipping file into `raw/` and clear the corresponding entry in the original `INBOX/Clippings/`.

### 3. Ingest — Atomization & Analysis

Run `ingest`; the AI reads the raw material in full and automatically generates:

- `wiki/sources/`: source transcription / outline notes
- `wiki/concepts/`: concept cards
- `wiki/entities/`: entity cards

**Caveats:**

- ⚠️ Confirm that images, attachments, and other resources have been correctly loaded into `asset/`, to avoid broken links later.

### 4. Health Check (Lint)

Once `Ingest` is done, the notebook has not yet entered a "trustworthy state." Run `lint` to perform three-layer validation:

- **Fact-check**: annotate the credibility of key assertions in `sources/`, marking dubious content (`[?]`);
- **Conflict resolution**: when new and old nodes conflict, archive both statements side by side, to be adjudicated in the Synthesis stage;
- **Structure check**: scan for isolated nodes, blank placeholder files, broken links, and duplicate concepts, outputting a `lint-report`.

Only after handling all reported issues is the notebook considered fully ingested.

### 5. Generate FAST Molecular Notes

Based on the `concepts/` and `entities/` that have passed Lint validation, run the `FAST 6+1` dimensional expansion to complete the **molecularization & synthesis** process, generating molecular notes that are structurally complete and logically self-consistent.

### 6. Think, Synthesize & Produce (finally, create a memory card)

This is the core value that sets LLM-FAST apart from the traditional LLM-Wiki.

Once the molecular notebook has accumulated a certain density, begin to actively **think and synthesize**: use `wiki/synthesis/` and `wiki/outputs/` to produce new notes — deep analyses, comparative insights, tutorial drafts… gradually elevating "ingested information" into "outputtable knowledge" and continually enriching the FAST Molecular Notebook.

- For the FAST or its important pages, **create a memory card** in the diary and bring it into the spaced-review (SR) flow, to prevent newly ingested knowledge from being forgotten right after ingestion.

### 7. Weekly Retrospective: Half-Random Walk + AI Insight

Trigger a retrospective workflow regularly each week:

- **Half-random walk**: the system preferentially recommends "important but long-unrevisited" knowledge nodes, reactivating dormant memory;
- **AI insight**: leverage the LLM to discover blind spots, latent connections, and new learning directions in the knowledge base;
- **Start a new cycle**: let insight drive a new round of the closed loop of clipping (capture) and thinking (output).

---

## Contributing, Acknowledgements & License

---

### Contributing

This repository is primarily a personal knowledge base and, in principle, does not accept external PRs. However, you are welcome to:

- Open an `Issue` to discuss the **FAST** methodology;
- Fork it and build your own `LLM-FAST`.

---
### Acknowledgements

- [Andrej Karpathy](https://karpathy.github.io/): inspiration for the `LLM Wiki` paradigm
- **Tiago Forte**: Second Brain `CODE (Capture-Organize-Distill-Express)`
- **Zettelkasten**: `Fleeting → Literature → Permanent`

---
### License

This repository's **structure, templates, scripts, plugins, and AI behavior specifications** (such as `AGENTS.md`, `CLAUDE.md`, `_template/`, `_scripts/`, `.obsidian/plugins/`, `*.base`) are licensed under the [MIT License](LICENSE).

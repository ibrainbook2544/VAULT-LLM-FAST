---
type: task
title: AGENTS / CLAUDE skills 化
priority: 3
status: backlog
created: 2026-05-15
due:
tags:
  - Skills
  - CLAUDE
  - AGENTS
dependencies: []
updated: 2026-05-16T19:32
views: 1
last_visited: 2026-05-16
---

## 目标

把 AGENTS.md / CLAUDE.md 中可复用的工作流（如 ingest、query、lint 等）抽取为 Claude Code skills，让 skill 自动按场景触发而不是用户手动调用。

## 清单

- [ ] 识别 AGENTS.md 中的可复用工作流
  - [ ] ingest 流程
  - [ ] query 流程
  - [ ] lint 流程
  - [ ] diary-review 流程
- [ ] 为每个工作流创建 skill
- [ ] 配置 skill 自动触发条件（settings.json hooks）
- [ ] 测试端到端流程
- [ ] 文档更新

## 进度

刚从 diary-atom 迁移过来，优先级调整为 3（中等）。

## 备注

- 这是一个系统性改进，不是紧急任务
- 可以分阶段实施：先 ingest，再 query，再 lint
- 参考：skill-creator + update-config

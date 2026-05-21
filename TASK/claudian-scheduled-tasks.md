---
type: task
subtype: shell
title: Claudian 自动调度任务列表
status: active
priority: 3
schedule: 每日 / 一次性（见正文任务行）
script: _scripts/diary-lint.ps1
created: 2026-05-18
tags:
  - automation
  - claudian
updated: 2026-05-20 08:50:24
contentHash: d892515600a605177de4d4f5b1b47a19b0516e72260d5800a096f8e1326284cf
---

# Claudian 定时任务

> 此文件由 **Claudian Scheduler** 插件监控。
> 语法：`- [ ] 描述 (@HH:mm) [shell: 脚本路径]`（每日）
> 语法：`- [ ] 描述 (@YYYY-MM-DD HH:mm) [shell: 脚本路径]`（一次性，完成后自动打勾）

---

## 每日任务

- [x] Diary Lint 健康检查 (@2026-05-20) [shell: _scripts/diary-lint.ps1]

---

## 一次性任务

- [x] 🧪 插件测试任务 (@2026-05-18 02:53) [shell: _scripts/diary-lint.ps1]

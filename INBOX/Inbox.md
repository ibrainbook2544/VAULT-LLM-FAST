---
created: 2026-05-10T18:35
updated: 2026-05-20 07:35:43
contentHash: 88fca37458be1376af6e5324645059647fe8c16669599102d31f50657e700afc
---



## ！！！！！要放心地记住知识点，就应多挂点

知识树（LLM-FAST）：Inbox、Diary

Notion：【TODO】（设置定时提醒！）、【GTD】

（临时）桌面、浏览器书签栏



---


- [ ] AGENTS/CLAUDE skills化


---

海量如老文档日记相册：查询溯源 找关联

领域：誊抄整理 原子化再重组分子 多维度创新

---
## 知识树发布

无AI、只发布1个OB文件=》WP MD；
多格式WP Html
多源Notion、Git
多发布Ghost、Notion
---n8n-----
---多语言---


---

## Shell Reminder 用法演示

> 演示脚本：[[_scripts/demo.ps1]]。每个任务到点会执行该脚本，结果写入 `logs/demo-output.log`，插件自身日志在 `logs/sh-reminder.log`。
> 测试技巧：把下面某行的 `@时间` 改成你当前时间后一两分钟，保持 Obsidian 开着等待；或用命令面板「显示即将到点的脚本提醒」。

**① 每日重复（@HH:mm）** —— 每天到点都会执行：

- [ ] 每日演示备份 (@07:37) [shell: _scripts/demo.ps1]

**② 一次性（@YYYY-MM-DD HH:mm）** —— 执行完会自动把 `- [ ]` 勾成 `- [x]`：

- [x] 一次性演示任务 (@2026-05-19 23:42) [shell: _scripts/demo.ps1]

**③ 缩进 / 嵌套任务** —— 行首空白会被忽略，照样触发：

- 项目清单
    - [ ] 子任务里的演示 (@23:40) [shell: _scripts/demo.ps1]

**④ 直接写命令（非脚本文件）** —— 后缀无法识别时按命令直接执行：

- [ ] 直接执行命令演示 (@23:39) [shell: powershell -Command "Write-Output hi"]

**⑤ 代码块内的任务（不会触发）** —— 用于在笔记里展示示例而不被误执行：

```
- [ ] 这行在代码块里，不会被执行 (@23:32) [shell: _scripts/demo.ps1]
```

**⑥ 失败示例** —— 脚本不存在，日志会记录失败原因：

- [ ] 故意失败演示 (@23:32) [shell: _scripts/not-exist.ps1]

---

---
type: doc
title: VAULT-DIARY 提醒系统配置指南
created: 2026-05-15
tags:
  - setup
  - reminder
  - dataview
updated: 2026-05-16T19:31
views: 7
last_visited: 2026-05-16
---

# 🔔 DIARY 自动提醒系统

> 两层叠加：Daily Note Dataview（被动）+ Reminder 插件（主动通知）

---

## 一、前置：安装必需插件

打开 Obsidian → 设置 → 第三方插件 → 浏览，安装以下插件：

| 插件                    | 用途                | 必需  |
| --------------------- | ----------------- | --- |
| **Dataview**          | Daily Note 嵌入提醒列表 | ✅   |
| **Reminder**（by uphy） | 到日期弹桌面通知          | ✅   |
| **Templater**         | Daily Note 自动套模板  | ✅   |
| **Daily Notes**（核心）   | 每日笔记入口            | ✅   |
| **Calendar**（可选）      | 日历视图 + 标记         | 推荐  |

---

## 二、Daily Notes 核心插件配置

设置 → 日记 / Daily Notes：

| 字段         | 值                                    |
| ---------- | ------------------------------------ |
| 新建日记模板文件位置 | `VAULT-DIARY/_template/Diary Log Template.md` |
| 新建日记文件位置   | `VAULT-DIARY`                        |
| 日期格式       | `YYYY-MM-DD`                         |

✅ 每天打开 Obsidian → Ribbon 点 `📅 打开今日日记` → 自动创建 `2026-05-16.md` 并套用模板。

---

## 三、Templater 配置（让 `{{date:YYYY-MM-DD}}` 占位符生效）

> 原生 Daily Notes 的占位符只支持 `{{date}}` / `{{time}}` / `{{title}}`。我们的模板用了 Templater 增强语法，所以需要 Templater 接管。

设置 → Templater：

| 字段 | 值 |
|------|---|
| Template folder location | `VAULT-DIARY/_template` |
| Trigger Templater on new file creation | ✅ 开 |
| Folder Templates | `VAULT-DIARY` → `_template/Diary Log Template.md` |

> 这样在 VAULT-DIARY 中新建任意 `.md` 文件，会自动套 Diary Log 模板（包括 Daily Note 触发）。

---

## 四、Reminder 插件配置

设置 → Reminder：

| 字段                    | 值                   | 说明                      |
| --------------------- | ------------------- | ----------------------- |
| Reminder Time         | `09:00`             | 当只有日期没时间时，默认 9 点提醒      |
| Daily reminders time  | `09:00`             | 每日扫描时间                  |
| Notification Type     | `Built-in / System` | 选 System 走桌面原生通知        |
| Auto-complete trigger | 关闭                  | 我们手动通过 /diary-review 管理 |
| Reminder Folder       | `VAULT-DIARY`       | 限定扫描范围                  |

**确认插件能识别我们的模板语法**：

Atom 模板里写了：
```markdown
- [ ] 复习此卡片 (@2026-05-16)
```

这是 Reminder 插件的**标准内联语法**——到 2026-05-16 09:00 自动弹通知"复习此卡片"，点击直接跳到该 atom。

---

## 五、Calendar 插件（可选但推荐）

装好后侧栏出现日历，今天高亮、有 atom 的日子标点。

设置 → Calendar：
- Start Week On: `Monday`
- Show Week Number: 选你喜欢

---

## 六、`/diary-review` 流程联动 Reminder

当 AI 执行 `/diary-review` 更新 `next_review` 时，**同步更新正文里的 `(@日期)` 标记**。这条已经写入 §5.8 流程，下次复习时我会同时改两处。

例如复习后：
```yaml
next_review: 2026-05-22   # frontmatter
```
正文：
```markdown
- [ ] 复习此卡片 (@2026-05-22)   # 同步更新
```

这样 Dataview 看 frontmatter、Reminder 看正文，两套提醒指向同一日期。

---

## 七、验证清单

装完插件后跑一次自检：

- [ ] 打开 Obsidian → 看今日 Daily Note 是否自动创建
- [ ] Daily Note 顶部「🔔 今日提醒」三个 Dataview 表格能显示
- [ ] 任意 diary-atom 文件里 `(@日期)` 那行的 checkbox 旁边出现 🔔 图标（Reminder 已识别）
- [ ] 把 `(@日期)` 改成今天 + 当前时间 +1 分钟，等 1 分钟看是否弹通知

---

## 八、移动端 / Syncthing

Obsidian Mobile 也支持以上所有插件。Syncthing 把 vault 同步到手机后：
- Reminder 插件移动端会用系统通知
- 早上 9 点手机可能也响一下（看插件设置）

> ⚠️ Syncthing 注意：移动端打开 OB 时把后台同步关掉再开，否则 frontmatter 可能冲突

---

## 九、故障排查

| 现象 | 排查 |
|------|------|
| Daily Note 没自动套模板 | 检查 Daily Notes / Templater 中模板路径是否一致 |
| Dataview 表格空 | 字段名拼写检查；试着把 `date(today)` 替换为 `date("2026-05-15")` |
| Reminder 不弹通知 | OS 通知权限；插件 Reminder Time 配置 |
| 弹了但点不开 | Reminder 设置里 Notification Type 改成 `Obsidian` 而非 `System` |

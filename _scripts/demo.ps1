# demo.ps1 — Shell Reminder 演示脚本
# 作用：把一行带时间戳的信息追加到 logs/demo-output.log，并向 stdout 打印一句话
# 用法：在笔记任务行里写 [shell: _scripts/demo.ps1]，到点会自动执行

$ErrorActionPreference = 'Stop'

# vault 根目录（插件以 vault 根为 cwd 启动脚本）
$logDir  = Join-Path (Get-Location) 'logs'
$logFile = Join-Path $logDir 'demo-output.log'

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$line  = "[$stamp] demo.ps1 被 Shell Reminder 触发 ✅"

Add-Content -Path $logFile -Value $line -Encoding utf8

# stdout 会被 Shell Reminder 记进它自己的日志（logs/sh-reminder.log）
Write-Output "demo.ps1 执行成功，已写入 $logFile"

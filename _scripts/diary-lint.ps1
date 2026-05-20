# Claudian 每日 Diary Lint 自动检查脚本
# 由 Windows 任务计划程序在每天 02:00 自动调用

$VaultPath  = "D:\SynologyDrive\VAULT-LLM-FAST"
$LogFile    = "$VaultPath\_scripts\task-runner.log"
$PromptFile = "$VaultPath\_scripts\diary-lint-prompt.txt"

$Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $LogFile -Value "[$Date] diary-lint 任务启动"

try {
    Set-Location $VaultPath
    $Prompt = Get-Content -Path $PromptFile -Raw -Encoding UTF8
    claude -p $Prompt --dangerously-skip-permissions | Out-Null
    $Done = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $LogFile -Value "[$Done] diary-lint 任务完成"
} catch {
    $Err = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $LogFile -Value "[$Err] diary-lint 任务失败：$_"
}

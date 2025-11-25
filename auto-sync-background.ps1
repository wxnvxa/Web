# Автоматическое отслеживание изменений в фоновом режиме
# Запускается автоматически и коммитит изменения каждые 10 секунд

$ErrorActionPreference = "SilentlyContinue"

Write-Host "🔄 Auto-sync to GitHub is running in background..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$lastCommit = Get-Date
$checkInterval = 10 # Проверка каждые 10 секунд

while ($true) {
    try {
        # Проверяем статус git
        $status = git status --porcelain 2>$null
        
        if ($status -ne "") {
            $timeSinceLastCommit = (New-TimeSpan -Start $lastCommit -End (Get-Date)).TotalSeconds
            
            # Коммитим только если прошло больше 10 секунд с последнего коммита
            if ($timeSinceLastCommit -gt 10) {
                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                Write-Host "[$timestamp] 📝 Changes detected! Committing..." -ForegroundColor Cyan
                
                git add . 2>$null
                git commit -m "Auto-commit: $timestamp" 2>$null
                git push origin main 2>$null
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$timestamp] ✅ Changes pushed to GitHub!" -ForegroundColor Green
                } else {
                    Write-Host "[$timestamp] ⚠️  Push failed (might need authentication)" -ForegroundColor Yellow
                }
                
                $lastCommit = Get-Date
            }
        }
    } catch {
        # Игнорируем ошибки
    }
    
    Start-Sleep -Seconds $checkInterval
}


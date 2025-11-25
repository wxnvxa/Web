# Автоматическое отслеживание изменений и коммит в GitHub
# Запускает автоматический коммит при изменении файлов

Write-Host "👀 Отслеживаю изменения файлов..." -ForegroundColor Cyan
Write-Host "Нажмите Ctrl+C для остановки" -ForegroundColor Yellow
Write-Host ""

$lastCommit = Get-Date

while ($true) {
    $status = git status --porcelain
    if ($status -ne "") {
        $timeSinceLastCommit = (New-TimeSpan -Start $lastCommit -End (Get-Date)).TotalSeconds
        
        if ($timeSinceLastCommit -gt 5) {
            Write-Host "📝 Обнаружены изменения! Коммичу..." -ForegroundColor Yellow
            git add .
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            git commit -m "Auto-commit: $timestamp"
            git push origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Изменения сохранены в GitHub! ($timestamp)" -ForegroundColor Green
            }
            
            $lastCommit = Get-Date
        }
    }
    
    Start-Sleep -Seconds 2
}


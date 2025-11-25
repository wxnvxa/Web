# Автоматический коммит и push в GitHub
# Использование: .\auto-commit.ps1 "Описание изменений"

param(
    [string]$message = "Auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🔄 Начинаю автоматический коммит..." -ForegroundColor Cyan

# Проверяем статус
$status = git status --porcelain
if ($status -eq "") {
    Write-Host "✅ Нет изменений для коммита" -ForegroundColor Green
    exit 0
}

# Добавляем все изменения
Write-Host "📦 Добавляю все изменения..." -ForegroundColor Yellow
git add .

# Создаём коммит
Write-Host "💾 Создаю коммит..." -ForegroundColor Yellow
git commit -m $message

# Пушим в GitHub
Write-Host "🚀 Отправляю изменения в GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Успешно сохранено в GitHub!" -ForegroundColor Green
} else {
    Write-Host "❌ Ошибка при отправке в GitHub" -ForegroundColor Red
    exit 1
}


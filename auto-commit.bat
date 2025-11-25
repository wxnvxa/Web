@echo off
chcp 65001 >nul
echo 🔄 Автоматический коммит и push в GitHub...
echo.

if "%1"=="" (
    powershell -ExecutionPolicy Bypass -File "auto-commit.ps1"
) else (
    powershell -ExecutionPolicy Bypass -File "auto-commit.ps1" -message "%1"
)

pause


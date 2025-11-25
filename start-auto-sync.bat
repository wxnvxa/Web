@echo off
chcp 65001 >nul
title WinWare - Auto Sync to GitHub
echo.
echo ========================================
echo   WinWare Auto-Sync to GitHub
echo ========================================
echo.
echo This script will automatically:
echo   - Watch for file changes
echo   - Commit changes every 5 seconds
echo   - Push to GitHub automatically
echo.
echo Press Ctrl+C to stop
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak >nul
echo.

powershell -ExecutionPolicy Bypass -File "watch-changes.ps1"

pause


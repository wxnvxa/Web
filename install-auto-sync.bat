@echo off
chcp 65001 >nul
title WinWare - Install Auto-Sync
echo.
echo ========================================
echo   WinWare Auto-Sync Installation
echo ========================================
echo.
echo This will set up automatic GitHub sync
echo.
echo Options:
echo   1. Run auto-sync now (visible window)
echo   2. Run auto-sync in background (hidden)
echo   3. Add to Windows startup (runs on boot)
echo   4. Exit
echo.
set /p choice="Choose option (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting auto-sync...
    start "" "start-auto-sync.bat"
    echo Auto-sync started! Keep the window open.
    pause
    exit
)

if "%choice%"=="2" (
    echo.
    echo Starting auto-sync in background...
    start "" "start-auto-sync-silent.bat"
    echo Auto-sync started in background!
    echo To stop it, close PowerShell processes or restart.
    pause
    exit
)

if "%choice%"=="3" (
    echo.
    echo Adding to Windows startup...
    set SCRIPT_PATH=%~dp0start-auto-sync-silent.bat
    reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "WinWareAutoSync" /t REG_SZ /d "%SCRIPT_PATH%" /f >nul
    echo Auto-sync added to startup!
    echo It will run automatically when Windows starts.
    pause
    exit
)

if "%choice%"=="4" (
    exit
)

echo Invalid choice!
pause


@echo off
REM Запуск автоматического синхронизации в фоне (без окна)
powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "auto-sync-background.ps1"


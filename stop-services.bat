@echo off
echo Stopping BlogSite services...
echo.

REM Kill all Java processes (Spring Boot services)
taskkill /F /IM java.exe /T >nul 2>&1

REM Kill Node.js (Frontend)
taskkill /F /IM node.exe /T >nul 2>&1

echo All services stopped!
echo.
pause

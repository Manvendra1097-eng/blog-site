@echo off
setlocal enabledelayedexpansion
color 0A

echo ========================================
echo   BlogSite - Complete Setup and Run
echo ========================================
echo.
echo NOTE: Make sure MySQL is running before continuing!
echo.
echo MySQL Credentials:
echo   Username: root
echo   Password: Manvendra
echo.
echo Required Databases will be created automatically by Spring Boot
echo   - blog_auth
echo   - blog_content
echo.
pause

REM Install Frontend Dependencies
echo [1/4] Installing frontend dependencies...
cd frontend
if not exist node_modules (
    call npm install
) else (
    echo [OK] Dependencies already installed
)
cd ..
echo.

REM Start Auth Service
echo [2/4] Starting Auth Service on port 8081...
start "Auth Service - BlogSite" cmd /c "cd auth-service && mvn spring-boot:run -Dspring-boot.run.profiles=local"
echo Waiting 20 seconds for Auth Service to initialize...
timeout /t 20 /nobreak >nul
echo [OK] Auth Service started
echo.

REM Start Blog Service
echo [3/4] Starting Blog Service on port 8082...
start "Blog Service - BlogSite" cmd /c "cd blog-service && mvn spring-boot:run -Dspring-boot.run.profiles=local"
echo Waiting 20 seconds for Blog Service to initialize...
timeout /t 20 /nobreak >nul
echo [OK] Blog Service started
echo.

REM Start API Gateway
echo [4/4] Starting API Gateway on port 8080...
start "API Gateway - BlogSite" cmd /c "cd api-gateway && mvn spring-boot:run -Dspring-boot.run.profiles=local"
echo Waiting 15 seconds for API Gateway to initialize...
timeout /t 15 /nobreak >nul
echo [OK] API Gateway started
echo.

REM Start Frontend
echo Starting Frontend on port 5173...
start "Frontend - BlogSite" cmd /c "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul
echo [OK] Frontend started
echo.

REM Open Browser
echo Opening browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173
echo.

echo ========================================
echo   ALL SERVICES RUNNING SUCCESSFULLY!
echo ========================================
echo.
echo Services:
echo   Frontend:     http://localhost:5173
echo   API Gateway:  http://localhost:8080
echo   Auth Service: http://localhost:8081
echo   Blog Service: http://localhost:8082
echo.
echo Databases:
echo   blog_auth     (localhost:3306)
echo   blog_content  (localhost:3306)
echo.
echo Default Login:
echo   Username: admin
echo   Password: Admin1234
echo.
echo ========================================
echo.
echo Press any key to exit this window...
echo (Services will continue running in background)
pause >nul

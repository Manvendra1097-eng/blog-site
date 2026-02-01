@echo off
color 0E
echo ========================================
echo   BlogSite Diagram Generator
echo ========================================
echo.

REM Check if PlantUML JAR exists
if not exist "plantuml.jar" (
    echo PlantUML JAR not found. Downloading...
    echo.
    curl -L https://github.com/plantuml/plantuml/releases/download/v1.2024.8/plantuml-1.2024.8.jar -o plantuml.jar
    echo.
    if errorlevel 1 (
        echo ERROR: Failed to download PlantUML
        echo Please download manually from: https://plantuml.com/download
        pause
        exit /b 1
    )
    echo ✓ PlantUML downloaded successfully
    echo.
)

REM Generate all diagrams
echo Generating diagrams...
echo.

echo [1/4] Architecture diagram...
java -jar plantuml.jar architecture.puml
if exist "architecture.png" echo ✓ architecture.png generated

echo [2/4] JWT Authentication flow...
java -jar plantuml.jar jwt_flow.puml
if exist "jwt_flow.png" echo ✓ jwt_flow.png generated

echo [3/4] API Gateway flow...
java -jar plantuml.jar gateway_flow.puml
if exist "gateway_flow.png" echo ✓ gateway_flow.png generated

echo [4/4] Token Refresh flow...
java -jar plantuml.jar token_refresh_flow.puml
if exist "token_refresh_flow.png" echo ✓ token_refresh_flow.png generated

echo.
echo ========================================
echo   Success!
echo ========================================
echo.
echo Diagrams generated:
echo   1. architecture.png - Main architecture
echo   2. jwt_flow.png - JWT authentication flow
echo   3. gateway_flow.png - API gateway request flow
echo   4. token_refresh_flow.png - Token refresh mechanism
echo.
echo Location: %cd%
echo.
echo Next steps:
echo 1. Insert diagrams into Word document:
echo    - architecture.png → Section 2
echo    - jwt_flow.png → Section 5.1
echo    - gateway_flow.png → Section 5.2
echo    - token_refresh_flow.png → Section 5.1
echo.

REM Try to open the generated images
if exist "architecture.png" start architecture.png
if exist "jwt_flow.png" start jwt_flow.png

pause

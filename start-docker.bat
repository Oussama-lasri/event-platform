@echo off
echo ========================================
echo   Event Platform - Docker Setup
echo ========================================
echo.

echo Checking Docker installation...
docker --version
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo.
echo Checking Docker daemon...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker daemon is not running
    echo Please start Docker Desktop and try again
    pause
    exit /b 1
)

echo.
echo Docker is ready! Starting Event Platform...
echo.

echo Building and starting all services...
docker-compose up --build -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo Checking service status...
docker-compose ps

echo.
echo ========================================
echo   Services Status:
echo ========================================
echo Frontend: http://localhost
echo Backend API: http://localhost:5000
echo MongoDB: localhost:27017
echo.
echo To view logs: docker-compose logs -f
echo To stop services: docker-compose down
echo ========================================

pause
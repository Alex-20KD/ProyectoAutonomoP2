@echo off
echo ====================================
echo  API Gateway - Sistema de Adopciones
echo ====================================
echo.

cd /d "%~dp0"

echo Restaurando dependencias...
dotnet restore
if %ERRORLEVEL% neq 0 (
    echo Error al restaurar dependencias.
    pause
    exit /b 1
)

echo.
echo Compilando proyecto...
dotnet build --configuration Release
if %ERRORLEVEL% neq 0 (
    echo Error al compilar el proyecto.
    pause
    exit /b 1
)

echo.
echo Iniciando API Gateway...
echo Disponible en: https://localhost:5001
echo Documentación Swagger en: https://localhost:5001
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

cd src\ApiGateway
dotnet run --configuration Release

pause

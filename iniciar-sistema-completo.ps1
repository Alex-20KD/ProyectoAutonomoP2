# Script para iniciar todos los servicios del sistema de adopciones
Write-Host "INICIANDO SISTEMA COMPLETO DE ADOPCIONES" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Verificar si los puertos están disponibles
$puertos = @{
    "5000" = "API Gateway"
    "3002" = "Servicio Mascotas" 
    "5249" = "Servicio Legalizacion"
    "8000" = "Servicio Donantes"
}

Write-Host "`nVerificando disponibilidad de puertos..." -ForegroundColor Yellow

foreach ($puerto in $puertos.Keys) {
    $ocupado = Get-NetTCPConnection -LocalPort $puerto -ErrorAction SilentlyContinue
    if ($ocupado) {
        Write-Host "⚠️  Puerto $puerto ocupado por $($puertos[$puerto])" -ForegroundColor Yellow
    } else {
        Write-Host "✓ Puerto $puerto disponible para $($puertos[$puerto])" -ForegroundColor Green
    }
}

Write-Host "`n--- INICIANDO SERVICIOS ---" -ForegroundColor Magenta

# Crear directorios de logs si no existen
$logDir = "logs"
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force
    Write-Host "Directorio de logs creado: $logDir" -ForegroundColor Cyan
}

Write-Host "`n1. Iniciando Servicio de Mascotas (NestJS)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'AdopcionesGonzalo\mascota'; npm start" -WindowStyle Minimized
Write-Host "   → Servicio de Mascotas iniciando en puerto 3002"

Start-Sleep -Seconds 3

Write-Host "`n2. Iniciando Servicio de Legalización (.NET)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'Legalizacion-Kristhian\API'; dotnet run" -WindowStyle Minimized
Write-Host "   → Servicio de Legalización iniciando en puerto 5249"

Start-Sleep -Seconds 3

Write-Host "`n3. Iniciando API Gateway (.NET)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'Api-Gateway\src\ApiGateway'; dotnet run" -WindowStyle Minimized
Write-Host "   → API Gateway iniciando en puerto 5000"

Start-Sleep -Seconds 3

Write-Host "`n4. Iniciando Servicio de Donantes (FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'DonantesKevin\fundacion-mascotas'; python -m uvicorn main:app --host 0.0.0.0 --port 8000" -WindowStyle Minimized
Write-Host "   → Servicio de Donantes iniciando en puerto 8000"

Write-Host "`n--- ESPERANDO INICIALIZACIÓN COMPLETA ---" -ForegroundColor Magenta
Write-Host "Esperando 30 segundos para que todos los servicios se inicializen..." -ForegroundColor Cyan

for ($i = 30; $i -gt 0; $i--) {
    Write-Host "⏱️  $i segundos restantes..." -ForegroundColor Cyan
    Start-Sleep -Seconds 1
}

Write-Host "`n--- VERIFICANDO SERVICIOS INICIADOS ---" -ForegroundColor Magenta

$serviciosActivos = 0

foreach ($puerto in $puertos.Keys) {
    try {
        $ocupado = Get-NetTCPConnection -LocalPort $puerto -ErrorAction SilentlyContinue
        if ($ocupado) {
            Write-Host "✅ $($puertos[$puerto]) - Puerto $puerto ACTIVO" -ForegroundColor Green
            $serviciosActivos++
        } else {
            Write-Host "❌ $($puertos[$puerto]) - Puerto $puerto NO ACTIVO" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $($puertos[$puerto]) - Puerto $puerto NO ACTIVO" -ForegroundColor Red
    }
}

Write-Host "`n=== RESUMEN DE INICIO ===" -ForegroundColor Cyan
Write-Host "Servicios iniciados: $serviciosActivos/4" -ForegroundColor White

if ($serviciosActivos -eq 4) {
    Write-Host "🎉 TODOS LOS SERVICIOS INICIADOS CORRECTAMENTE!" -ForegroundColor Green
    Write-Host "`n--- URLS DE ACCESO ---" -ForegroundColor Cyan
    Write-Host "• API Gateway: http://localhost:5000" -ForegroundColor White
    Write-Host "• Swagger Gateway: http://localhost:5000/swagger" -ForegroundColor White
    Write-Host "• Servicio Mascotas: http://localhost:3002" -ForegroundColor White
    Write-Host "• Servicio Legalización: http://localhost:5249/swagger" -ForegroundColor White
    Write-Host "• Servicio Donantes: http://localhost:8000/docs" -ForegroundColor White
    
    Write-Host "`n--- EJECUTAR TESTS ---" -ForegroundColor Cyan
    Write-Host "Ejecutar test de integración completa:" -ForegroundColor White
    Write-Host ".\test-integracion-completa.ps1" -ForegroundColor Yellow
    
} elseif ($serviciosActivos -ge 2) {
    Write-Host "⚠️  ALGUNOS SERVICIOS NO INICIARON - Sistema parcialmente operativo" -ForegroundColor Yellow
    Write-Host "Revisar los logs en las ventanas de PowerShell abiertas" -ForegroundColor Yellow
} else {
    Write-Host "❌ LA MAYORÍA DE SERVICIOS NO INICIARON" -ForegroundColor Red
    Write-Host "Verificar dependencias y configuración" -ForegroundColor Red
}

Write-Host "`n=== SISTEMA DE ADOPCIONES PREPARADO ===" -ForegroundColor Green

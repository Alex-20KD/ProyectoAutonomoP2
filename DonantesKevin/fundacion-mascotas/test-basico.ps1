# Script básico para probar el sistema de integración
Write-Host "=== PRUEBA BÁSICA DEL SISTEMA DE INTEGRACIÓN ===" -ForegroundColor Green

# Verificar que los servicios estén ejecutándose
Write-Host "`n1. Verificando servicios..." -ForegroundColor Yellow

# Probar conexión al servicio de donantes
try {
    $donantes = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 5
    Write-Host "✅ Servicio Donantes (puerto 8000): ACTIVO" -ForegroundColor Green
} catch {
    Write-Host "❌ Servicio Donantes (puerto 8000): NO DISPONIBLE" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

# Probar conexión al servicio de mascotas
try {
    $mascotas = Invoke-RestMethod -Uri "http://localhost:3002/api/mascotas" -Method Get -TimeoutSec 5
    Write-Host "✅ Servicio Mascotas (puerto 3002): ACTIVO" -ForegroundColor Green
} catch {
    Write-Host "❌ Servicio Mascotas (puerto 3002): NO DISPONIBLE" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

# Probar conexión al servicio de legalización
try {
    $legalizacion = Invoke-RestMethod -Uri "http://localhost:5249/api/adopciones" -Method Get -TimeoutSec 5
    Write-Host "✅ Servicio Legalización (puerto 5249): ACTIVO" -ForegroundColor Green
} catch {
    Write-Host "❌ Servicio Legalización (puerto 5249): NO DISPONIBLE" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

# Probar API Gateway
try {
    $gateway = Invoke-RestMethod -Uri "http://localhost:5000/api/donantes" -Method Get -TimeoutSec 5
    Write-Host "✅ API Gateway (puerto 5000): ACTIVO" -ForegroundColor Green
} catch {
    Write-Host "❌ API Gateway (puerto 5000): NO DISPONIBLE" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host "`n2. Probando endpoints de integración..." -ForegroundColor Yellow

# Probar endpoint de integración - obtener mascotas disponibles
try {
    $mascotasDisponibles = Invoke-RestMethod -Uri "http://localhost:8000/integracion/mascotas/disponibles" -Method Get -TimeoutSec 10
    Write-Host "✅ Integración - Mascotas disponibles: FUNCIONAL" -ForegroundColor Green
    Write-Host "   Encontradas: $($mascotasDisponibles.Length) mascotas" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Integración - Mascotas disponibles: ERROR" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

# Probar endpoint de integración - obtener procesos de legalización
try {
    $procesosLegal = Invoke-RestMethod -Uri "http://localhost:8000/integracion/legalizacion/procesos" -Method Get -TimeoutSec 10
    Write-Host "✅ Integración - Procesos legalización: FUNCIONAL" -ForegroundColor Green
    Write-Host "   Encontrados: $($procesosLegal.Length) procesos" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Integración - Procesos legalización: ERROR" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host "`n=== RESUMEN DE LA PRUEBA ===" -ForegroundColor Green
Write-Host "Si todos los servicios están activos, el sistema de integración está funcionando correctamente." -ForegroundColor White
Write-Host "Si algún servicio no está disponible, inicia los servicios correspondientes antes de continuar." -ForegroundColor White

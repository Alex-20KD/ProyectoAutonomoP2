Write-Host "=== PRUEBA RAPIDA DEL SERVICIO DONANTES ===" -ForegroundColor Green

# Probar conexión al servicio de donantes
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 5
    Write-Host "✅ Servicio Donantes: ACTIVO" -ForegroundColor Green
    Write-Host "Status: $($health.status)" -ForegroundColor Cyan
    
    # Probar obtener donantes
    $donantes = Invoke-RestMethod -Uri "http://localhost:8000/donantes" -Method Get -TimeoutSec 5
    Write-Host "✅ Endpoint donantes: FUNCIONAL" -ForegroundColor Green
    Write-Host "Donantes encontrados: $($donantes.Length)" -ForegroundColor Cyan
    
    # Probar integración - obtener mascotas disponibles
    $mascotas = Invoke-RestMethod -Uri "http://localhost:8000/integracion/mascotas/disponibles" -Method Get -TimeoutSec 10
    Write-Host "✅ Integración con mascotas: FUNCIONAL" -ForegroundColor Green
    Write-Host "Mascotas disponibles: $($mascotas.Length)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host "`n=== PRUEBA COMPLETADA ===" -ForegroundColor Green

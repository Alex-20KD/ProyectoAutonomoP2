# Test basico de servicios
Write-Host "TEST BASICO DE SERVICIOS" -ForegroundColor Green

$services = @{
    "Mascotas" = "http://localhost:3002/mascotas/disponibles"
    "Legalizacion" = "http://localhost:5249/api/adopciones"
    "Gateway" = "http://localhost:5000/health"
}

foreach ($service in $services.Keys) {
    Write-Host "`nTesting $service..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod $services[$service] -TimeoutSec 10
        Write-Host "✓ $service: OK" -ForegroundColor Green
    } catch {
        Write-Host "✗ $service: ERROR" -ForegroundColor Red
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Gray
    }
}

Write-Host "`nTest completado" -ForegroundColor Cyan

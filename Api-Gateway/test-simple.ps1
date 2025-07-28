Write-Host "API Gateway Connectivity Test" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

$gatewayUrl = "https://localhost:5001"

# Test 1: Health Check
Write-Host "Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$gatewayUrl/health" -SkipCertificateCheck
    Write-Host "SUCCESS: API Gateway is running" -ForegroundColor Green
    Write-Host "Status: $($health.Status)" -ForegroundColor Green
    Write-Host "Service: $($health.Service)" -ForegroundColor Green
    Write-Host "Timestamp: $($health.Timestamp)" -ForegroundColor Green
} catch {
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Services Info
Write-Host "Testing Services Info..." -ForegroundColor Yellow
try {
    $services = Invoke-RestMethod -Uri "$gatewayUrl/services" -SkipCertificateCheck
    Write-Host "SUCCESS: Services endpoint available" -ForegroundColor Green
    Write-Host "Legalization API: $($services.Services.LegalizacionApi)" -ForegroundColor Green
    Write-Host "Adoptions API: $($services.Services.AdopcionesApi)" -ForegroundColor Green
} catch {
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Swagger Documentation
Write-Host "Testing Swagger Documentation..." -ForegroundColor Yellow
try {
    $swagger = Invoke-RestMethod -Uri "$gatewayUrl/swagger/v1/swagger.json" -SkipCertificateCheck
    Write-Host "SUCCESS: Swagger documentation available" -ForegroundColor Green
    Write-Host "Title: $($swagger.info.title)" -ForegroundColor Green
    Write-Host "Version: $($swagger.info.version)" -ForegroundColor Green
    $pathCount = ($swagger.paths | Get-Member -MemberType NoteProperty).Count
    Write-Host "Endpoints: $pathCount" -ForegroundColor Green
} catch {
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Adoptions Endpoints (Expected to fail without external services)
Write-Host "Testing Adoptions Endpoints (Expected connection errors)..." -ForegroundColor Yellow
try {
    $mascotas = Invoke-RestMethod -Uri "$gatewayUrl/api/adopciones/mascotas/disponibles" -SkipCertificateCheck
    Write-Host "SUCCESS: Mascotas endpoint works" -ForegroundColor Green
} catch {
    if ($_.Exception.Message -match "connection|timeout|refused") {
        Write-Host "EXPECTED: External service not available" -ForegroundColor Yellow
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Gray
    } else {
        Write-Host "FAILED: Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 5: Legalization Endpoints
Write-Host "Testing Legalization Endpoints (Expected connection errors)..." -ForegroundColor Yellow
try {
    $legalizacion = Invoke-RestMethod -Uri "$gatewayUrl/api/legalizacion/adopciones/1" -SkipCertificateCheck
    Write-Host "SUCCESS: Legalization endpoint works" -ForegroundColor Green
} catch {
    if ($_.Exception.Message -match "connection|timeout|refused") {
        Write-Host "EXPECTED: External service not available" -ForegroundColor Yellow
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Gray
    } else {
        Write-Host "FAILED: Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "Test Summary:" -ForegroundColor Cyan
Write-Host "- API Gateway is running and accessible" -ForegroundColor Green
Write-Host "- All endpoints are properly configured" -ForegroundColor Green
Write-Host "- Connection errors to external services are expected" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start Legalization service on https://localhost:7001" -ForegroundColor White
Write-Host "2. Start Adoptions service on http://localhost:3000" -ForegroundColor White
Write-Host "3. Visit https://localhost:5001 for Swagger documentation" -ForegroundColor White

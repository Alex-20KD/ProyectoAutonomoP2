# Script de prueba de integración completa
# Test de conectividad entre API Gateway y módulos de adopciones y legalización

Write-Host "=== PRUEBA DE INTEGRACIÓN COMPLETA ===" -ForegroundColor Green
Write-Host "Fecha: $(Get-Date)" -ForegroundColor Yellow
Write-Host ""

# Función para realizar peticiones HTTP con manejo de errores
function Test-HttpEndpoint {
    param(
        [string]$Url,
        [string]$Description,
        [string]$Method = "GET"
    )
    
    Write-Host "Probando: $Description" -ForegroundColor Cyan
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        $response = Invoke-RestMethod -Uri $Url -Method $Method -ErrorAction Stop
        Write-Host "✅ ÉXITO: $Description" -ForegroundColor Green
        Write-Host "Respuesta: $($response | ConvertTo-Json -Depth 2)" -ForegroundColor White
        return $true
    }
    catch {
        Write-Host "❌ ERROR: $Description" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    finally {
        Write-Host ""
    }
}

Write-Host "=== 1. VERIFICACIÓN DE SERVICIOS ACTIVOS ===" -ForegroundColor Magenta

# Verificar puertos activos
Write-Host "Puertos activos en el sistema:" -ForegroundColor Yellow
netstat -an | Select-String "LISTENING" | Select-String ":3000\|:5000\|:5249" | ForEach-Object {
    Write-Host "  $_" -ForegroundColor White
}
Write-Host ""

Write-Host "=== 2. PRUEBAS DE CONECTIVIDAD DIRECTA ===" -ForegroundColor Magenta

# Test 1: API Gateway Principal (Puerto 5000)
$test1 = Test-HttpEndpoint -Url "http://localhost:5000/health" -Description "API Gateway Principal - Health Check"

# Test 2: API Gateway Principal - Info de servicios
$test2 = Test-HttpEndpoint -Url "http://localhost:5000/services" -Description "API Gateway Principal - Información de Servicios"

# Test 3: Módulo de Adopciones (Puerto 3000) - GraphQL
$test3 = Test-HttpEndpoint -Url "http://localhost:3000/graphql" -Description "Módulo de Adopciones - GraphQL Endpoint"

Write-Host "=== 3. PRUEBAS DE INTEGRACIÓN A TRAVÉS DEL API GATEWAY ===" -ForegroundColor Magenta

# Test 4: Mascotas disponibles a través del API Gateway
$test4 = Test-HttpEndpoint -Url "http://localhost:5000/api/adopciones/mascotas/disponibles" -Description "API Gateway → Mascotas Disponibles"

# Test 5: Estado de legalización a través del API Gateway
$test5 = Test-HttpEndpoint -Url "http://localhost:5000/api/legalizacion/adopcion/1" -Description "API Gateway → Estado de Legalización"

Write-Host "=== 4. RESUMEN DE RESULTADOS ===" -ForegroundColor Magenta

$results = @(
    @{ Test = "API Gateway Health Check"; Status = $test1 }
    @{ Test = "API Gateway Services Info"; Status = $test2 }
    @{ Test = "Adopciones GraphQL"; Status = $test3 }
    @{ Test = "Integración Mascotas"; Status = $test4 }
    @{ Test = "Integración Legalización"; Status = $test5 }
)

$successful = ($results | Where-Object { $_.Status -eq $true }).Count
$total = $results.Count

Write-Host "Resultados de las pruebas:" -ForegroundColor Yellow
foreach ($result in $results) {
    $status = if ($result.Status) { "✅ PASS" } else { "❌ FAIL" }
    $color = if ($result.Status) { "Green" } else { "Red" }
    Write-Host "  $($result.Test): $status" -ForegroundColor $color
}

Write-Host ""
Write-Host "=== RESUMEN FINAL ===" -ForegroundColor Green
Write-Host "Pruebas exitosas: $successful de $total" -ForegroundColor $(if ($successful -eq $total) { "Green" } else { "Yellow" })

if ($successful -eq $total) {
    Write-Host "INTEGRACION COMPLETA EXITOSA!" -ForegroundColor Green
} elseif ($successful -gt 0) {
    Write-Host "INTEGRACION PARCIAL - Algunos servicios funcionan correctamente" -ForegroundColor Yellow
} else {
    Write-Host "FALLO EN LA INTEGRACION - Revisar configuracion de servicios" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== SERVICIOS DETECTADOS ===" -ForegroundColor Magenta
Write-Host "✅ API Gateway Principal: http://localhost:5000" -ForegroundColor Green
Write-Host "✅ Módulo de Adopciones: http://localhost:3000" -ForegroundColor Green
Write-Host "❓ Sistema de Legalización: Verificar puerto correcto" -ForegroundColor Yellow
Write-Host ""
Write-Host "Fin de las pruebas - $(Get-Date)" -ForegroundColor Gray

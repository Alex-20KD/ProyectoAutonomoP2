# Script para iniciar todos los servicios del sistema de integración
Write-Host "=== INICIANDO SISTEMA COMPLETO DE INTEGRACIÓN ===" -ForegroundColor Green

$ErrorActionPreference = "Continue"

# Función para verificar si un puerto está en uso
function Test-Port {
    param([int]$Port)
    try {
        $tcpConnection = New-Object System.Net.Sockets.TcpClient
        $tcpConnection.Connect("localhost", $Port)
        $tcpConnection.Close()
        return $true
    } catch {
        return $false
    }
}

# Función para esperar hasta que un servicio esté disponible
function Wait-ForService {
    param([string]$ServiceName, [int]$Port, [int]$MaxWaitSeconds = 60)
    
    Write-Host "Esperando que $ServiceName esté disponible en puerto $Port..." -ForegroundColor Yellow
    $waited = 0
    
    while ($waited -lt $MaxWaitSeconds) {
        if (Test-Port -Port $Port) {
            Write-Host "✅ $ServiceName está disponible!" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 2
        $waited += 2
        Write-Host "." -NoNewline -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "❌ $ServiceName no estuvo disponible después de $MaxWaitSeconds segundos" -ForegroundColor Red
    return $false
}

Write-Host "`n1. Verificando servicios existentes..." -ForegroundColor Yellow

# Verificar servicios que ya están ejecutándose
$serviciosEjecutandose = @()

if (Test-Port -Port 8000) {
    Write-Host "✅ Servicio Donantes ya está ejecutándose en puerto 8000" -ForegroundColor Green
    $serviciosEjecutandose += "Donantes"
}

if (Test-Port -Port 3002) {
    Write-Host "✅ Servicio Mascotas ya está ejecutándose en puerto 3002" -ForegroundColor Green
    $serviciosEjecutandose += "Mascotas"
}

if (Test-Port -Port 5249) {
    Write-Host "✅ Servicio Legalización ya está ejecutándose en puerto 5249" -ForegroundColor Green
    $serviciosEjecutandose += "Legalizacion"
}

if (Test-Port -Port 5000) {
    Write-Host "✅ API Gateway ya está ejecutándose en puerto 5000" -ForegroundColor Green
    $serviciosEjecutandose += "Gateway"
}

Write-Host "`n2. Iniciando servicios faltantes..." -ForegroundColor Yellow

# Iniciar servicio de donantes si no está ejecutándose
if (-not (Test-Port -Port 8000)) {
    Write-Host "Iniciando servicio de Donantes..." -ForegroundColor Cyan
    try {
        # Cambiar al directorio de donantes
        Push-Location "C:\Users\Kazuto\OneDrive\Documentos\ProyectoAutonomoP2\DonantesKevin\fundacion-mascotas"
        
        # Iniciar el servicio en segundo plano
        Start-Process -FilePath "python" -ArgumentList "main.py" -WindowStyle Minimized
        
        # Esperar a que el servicio esté disponible
        if (Wait-ForService -ServiceName "Donantes" -Port 8000) {
            $serviciosEjecutandose += "Donantes"
        }
        
        Pop-Location
    } catch {
        Write-Host "❌ Error iniciando servicio de Donantes: $_" -ForegroundColor Red
        Pop-Location
    }
}

# Iniciar servicio de mascotas si no está ejecutándose
if (-not (Test-Port -Port 3002)) {
    Write-Host "Iniciando servicio de Mascotas..." -ForegroundColor Cyan
    try {
        Push-Location "C:\Users\Kazuto\OneDrive\Documentos\ProyectoAutonomoP2\AdopcionesGonzalo\mascota"
        Start-Process -FilePath "npm" -ArgumentList "run", "start:dev" -WindowStyle Minimized
        
        if (Wait-ForService -ServiceName "Mascotas" -Port 3002) {
            $serviciosEjecutandose += "Mascotas"
        }
        
        Pop-Location
    } catch {
        Write-Host "❌ Error iniciando servicio de Mascotas: $_" -ForegroundColor Red
        Pop-Location
    }
}

# Iniciar servicio de legalización si no está ejecutándose
if (-not (Test-Port -Port 5249)) {
    Write-Host "Iniciando servicio de Legalización..." -ForegroundColor Cyan
    try {
        Push-Location "C:\Users\Kazuto\OneDrive\Documentos\ProyectoAutonomoP2\Legalizacion-Kristhian\API"
        Start-Process -FilePath "dotnet" -ArgumentList "run" -WindowStyle Minimized
        
        if (Wait-ForService -ServiceName "Legalizacion" -Port 5249) {
            $serviciosEjecutandose += "Legalizacion"
        }
        
        Pop-Location
    } catch {
        Write-Host "❌ Error iniciando servicio de Legalización: $_" -ForegroundColor Red
        Pop-Location
    }
}

# Iniciar API Gateway si no está ejecutándose
if (-not (Test-Port -Port 5000)) {
    Write-Host "Iniciando API Gateway..." -ForegroundColor Cyan
    try {
        Push-Location "C:\Users\Kazuto\OneDrive\Documentos\ProyectoAutonomoP2\Api-Gateway\src\ApiGateway"
        Start-Process -FilePath "dotnet" -ArgumentList "run" -WindowStyle Minimized
        
        if (Wait-ForService -ServiceName "Gateway" -Port 5000) {
            $serviciosEjecutandose += "Gateway"
        }
        
        Pop-Location
    } catch {
        Write-Host "❌ Error iniciando API Gateway: $_" -ForegroundColor Red
        Pop-Location
    }
}

Write-Host "`n=== RESUMEN DEL INICIO ===" -ForegroundColor Green
Write-Host "Servicios ejecutándose:" -ForegroundColor White

foreach ($servicio in $serviciosEjecutandose) {
    Write-Host "✅ $servicio" -ForegroundColor Green
}

$serviciosFaltantes = @("Donantes", "Mascotas", "Legalizacion", "Gateway") | Where-Object { $_ -notin $serviciosEjecutandose }

if ($serviciosFaltantes.Count -gt 0) {
    Write-Host "`nServicios que no pudieron iniciarse:" -ForegroundColor Yellow
    foreach ($servicio in $serviciosFaltantes) {
        Write-Host "❌ $servicio" -ForegroundColor Red
    }
    Write-Host "`nPor favor, inicia manualmente los servicios faltantes antes de ejecutar las pruebas." -ForegroundColor Yellow
} else {
    Write-Host "`n🎉 ¡Todos los servicios están ejecutándose correctamente!" -ForegroundColor Green
    Write-Host "Puedes ejecutar ahora: .\test-basico.ps1 para probar la integración" -ForegroundColor Cyan
}

# Ejemplos de Uso del API Gateway

## Configuración Inicial

Antes de usar el API Gateway, asegúrate de que los siguientes servicios estén ejecutándose:

1. **Sistema de Legalización (C#)**: `https://localhost:7001`
2. **Módulo de Adopciones (NestJS)**: `http://localhost:3000`

## Ejemplos de Requests

### 1. Obtener Mascotas Disponibles

```bash
curl -X GET "https://localhost:5001/api/adopciones/mascotas/disponibles" \
     -H "accept: application/json"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "name": "Rex",
      "especie": "Perro",
      "raza": "Labrador",
      "edad": 3,
      "genero": "Macho",
      "descripcion": "Perro muy amigable y juguetón",
      "fotoUrl": "https://ejemplo.com/rex.jpg",
      "estadoAdopcion": false,
      "adoptanteId": null
    }
  ],
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### 2. Crear Solicitud de Adopción

```bash
curl -X POST "https://localhost:5001/api/adopciones/solicitudes" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "mascotaId": 1,
       "adoptanteId": 1,
       "motivo": "Quiero darle un hogar amoroso a esta mascota"
     }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Proceso de adopción iniciado exitosamente",
  "data": {
    "solicitudAdopcion": {
      "id": 1,
      "mascotaId": 1,
      "adoptanteId": 1,
      "fechaSolicitud": "2024-01-15T10:00:00Z",
      "estado": "Pendiente",
      "motivo": "Quiero darle un hogar amoroso a esta mascota",
      "mascota": {
        "id": 1,
        "name": "Rex",
        "especie": "Perro"
      },
      "adoptante": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@ejemplo.com"
      }
    },
    "estadoLegalizacion": {
      "adopcionId": 0,
      "estadoLegalizacion": "Pendiente",
      "contratoFirmado": false,
      "certificadoEmitido": false,
      "documentosPendientes": ["Contrato de adopción", "Documentación de la mascota"]
    }
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### 3. Obtener Estado Completo de Adopción

```bash
curl -X GET "https://localhost:5001/api/adopciones/solicitudes/1" \
     -H "accept: application/json"
```

### 4. Iniciar Proceso de Legalización

```bash
curl -X POST "https://localhost:5001/api/adopciones/solicitudes/1/iniciar-legalizacion" \
     -H "accept: application/json"
```

### 5. Completar Legalización con Contrato

```bash
curl -X POST "https://localhost:5001/api/adopciones/solicitudes/1/completar-legalizacion" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "terminosYCondiciones": "El adoptante se compromete a cuidar la mascota, proporcionarle atención veterinaria adecuada, alimentación balanceada y un hogar seguro...",
       "fechaFirma": "2024-01-15T14:30:00Z",
       "firmaAdoptanteUrl": "https://ejemplo.com/firmas/adoptante-1.png",
       "firmaRefugioUrl": "https://ejemplo.com/firmas/refugio.png"
     }'
```

### 6. Obtener Adopciones de un Adoptante

```bash
curl -X GET "https://localhost:5001/api/adopciones/adoptantes/1/adopciones" \
     -H "accept: application/json"
```

### 7. Obtener Estado de Legalización

```bash
curl -X GET "https://localhost:5001/api/legalizacion/adopciones/1/estado" \
     -H "accept: application/json"
```

### 8. Subir Documentación de Mascota

```bash
curl -X POST "https://localhost:5001/api/legalizacion/mascotas/1/documentacion" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "tipoDocumento": "Vacunas",
       "urlDocumento": "https://ejemplo.com/documentos/vacunas-rex.pdf",
       "fechaSubida": "2024-01-15T10:00:00Z",
       "mascotaId": 1
     }'
```

## Scripts de PowerShell

### Script para Probar el Flujo Completo

```powershell
# flujo-completo.ps1
$baseUrl = "https://localhost:5001/api"

# 1. Obtener mascotas disponibles
Write-Host "1. Obteniendo mascotas disponibles..." -ForegroundColor Green
$mascotas = Invoke-RestMethod -Uri "$baseUrl/adopciones/mascotas/disponibles" -Method GET
$mascotas.data | Format-Table

# 2. Crear solicitud de adopción
Write-Host "2. Creando solicitud de adopción..." -ForegroundColor Green
$solicitudData = @{
    mascotaId = 1
    adoptanteId = 1
    motivo = "Quiero darle un hogar amoroso"
} | ConvertTo-Json

$solicitud = Invoke-RestMethod -Uri "$baseUrl/adopciones/solicitudes" -Method POST -Body $solicitudData -ContentType "application/json"
$solicitudId = $solicitud.data.solicitudAdopcion.id

Write-Host "Solicitud creada con ID: $solicitudId" -ForegroundColor Yellow

# 3. Obtener estado de la adopción
Write-Host "3. Obteniendo estado de adopción..." -ForegroundColor Green
$estado = Invoke-RestMethod -Uri "$baseUrl/adopciones/solicitudes/$solicitudId" -Method GET
$estado.data | ConvertTo-Json -Depth 3

# 4. Iniciar legalización (después de aprobar manualmente)
Write-Host "4. Iniciando legalización..." -ForegroundColor Green
$legalizacion = Invoke-RestMethod -Uri "$baseUrl/adopciones/solicitudes/$solicitudId/iniciar-legalizacion" -Method POST

# 5. Completar legalización
Write-Host "5. Completando legalización..." -ForegroundColor Green
$contratoData = @{
    terminosYCondiciones = "Términos y condiciones del contrato..."
    fechaFirma = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    firmaAdoptanteUrl = "https://ejemplo.com/firma-adoptante.png"
    firmaRefugioUrl = "https://ejemplo.com/firma-refugio.png"
} | ConvertTo-Json

$completado = Invoke-RestMethod -Uri "$baseUrl/adopciones/solicitudes/$solicitudId/completar-legalizacion" -Method POST -Body $contratoData -ContentType "application/json"

Write-Host "Adopción completada exitosamente!" -ForegroundColor Green
$completado.data | ConvertTo-Json -Depth 3
```

### Script para Monitoreo de Servicios

```powershell
# monitoreo.ps1
$baseUrl = "https://localhost:5001"

Write-Host "Verificando estado de servicios..." -ForegroundColor Green

try {
    # Health check del API Gateway
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ API Gateway: $($health.Status)" -ForegroundColor Green
    
    # Información de servicios
    $services = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET
    Write-Host "📊 Servicios configurados:" -ForegroundColor Yellow
    $services.Services | Format-List
    
} catch {
    Write-Host "❌ Error al conectar con API Gateway: $($_.Exception.Message)" -ForegroundColor Red
}
```

## Postman Collection

Puedes importar esta colección en Postman para probar todos los endpoints:

### Variables de Entorno
- `baseUrl`: `https://localhost:5001/api`
- `solicitudId`: (se establecerá automáticamente)

### Colección JSON
```json
{
  "info": {
    "name": "API Gateway - Adopciones",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://localhost:5001/api"
    }
  ],
  "item": [
    {
      "name": "Mascotas Disponibles",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/adopciones/mascotas/disponibles",
          "host": ["{{baseUrl}}"],
          "path": ["adopciones", "mascotas", "disponibles"]
        }
      }
    },
    {
      "name": "Crear Solicitud",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"mascotaId\": 1,\n  \"adoptanteId\": 1,\n  \"motivo\": \"Quiero darle un hogar amoroso\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/adopciones/solicitudes",
          "host": ["{{baseUrl}}"],
          "path": ["adopciones", "solicitudes"]
        }
      }
    }
  ]
}
```

## Troubleshooting

### Errores Comunes

1. **Error de conexión con servicios**
   - Verificar que los servicios estén ejecutándose
   - Comprobar las URLs en `appsettings.json`

2. **Timeout en requests**
   - Aumentar el timeout en la configuración
   - Verificar que los servicios respondan correctamente

3. **Errores de serialización**
   - Verificar que los modelos coincidan entre servicios
   - Comprobar la configuración JSON

Para más información, consulta los logs del API Gateway y la documentación Swagger en `https://localhost:5001`.

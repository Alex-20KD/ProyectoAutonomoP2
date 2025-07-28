# API Gateway - Sistema de Adopciones y Legalización

Este API Gateway integra el módulo de adopciones (Node.js/NestJS) con el sistema de legalización (C#/.NET), proporcionando un punto de entrada unificado para gestionar todo el proceso de adopción de mascotas.

## Arquitectura

```
Cliente → API Gateway → [Módulo Adopciones | Sistema Legalización]
```

### Servicios Integrados

1. **Módulo de Adopciones** (NestJS - Puerto 3000)
   - Gestión de mascotas
   - Solicitudes de adopción
   - Información de adoptantes

2. **Sistema de Legalización** (C#/.NET - Puerto 7001)
   - Contratos de adopción
   - Certificados de propiedad
   - Seguimiento de adopciones
   - Documentación de mascotas

## Configuración

### Prerrequisitos

- .NET 8.0 SDK
- Los módulos de adopciones y legalización ejecutándose en sus puertos respectivos

### Configuración de Servicios

Edita `appsettings.json` para configurar las URLs de los servicios:

```json
{
  "Services": {
    "LegalizacionApi": {
      "BaseUrl": "https://localhost:7001"
    },
    "AdopcionesApi": {
      "BaseUrl": "http://localhost:3000"
    }
  }
}
```

### Ejecución

```bash
cd Api-Gateway/src/ApiGateway
dotnet restore
dotnet run
```

El API Gateway estará disponible en `https://localhost:5001` con documentación Swagger en la raíz.

## Endpoints Principales

### Adopciones Integradas

#### `GET /api/adopciones/mascotas/disponibles`
Obtiene todas las mascotas disponibles para adopción con verificación de estado de legalización.

#### `POST /api/adopciones/solicitudes`
Crea una nueva solicitud de adopción.

**Request Body:**
```json
{
  "mascotaId": 1,
  "adoptanteId": 1,
  "motivo": "Quiero darle un hogar amoroso"
}
```

#### `GET /api/adopciones/solicitudes/{solicitudId}`
Obtiene información completa de una adopción (solicitud + estado de legalización).

**Response:**
```json
{
  "success": true,
  "data": {
    "solicitudAdopcion": {
      "id": 1,
      "mascotaId": 1,
      "adoptanteId": 1,
      "estado": "Aprobada",
      "mascota": {...},
      "adoptante": {...}
    },
    "estadoLegalizacion": {
      "adopcionId": 1,
      "estadoLegalizacion": "En Proceso",
      "contratoFirmado": false,
      "certificadoEmitido": false,
      "documentosPendientes": ["Contrato de adopción"]
    }
  }
}
```

#### `POST /api/adopciones/solicitudes/{solicitudId}/iniciar-legalizacion`
Inicia el proceso de legalización para una solicitud aprobada.

#### `POST /api/adopciones/solicitudes/{solicitudId}/completar-legalizacion`
Completa la legalización con la firma del contrato.

**Request Body:**
```json
{
  "terminosYCondiciones": "Términos del contrato...",
  "fechaFirma": "2024-01-15T10:00:00Z",
  "firmaAdoptanteUrl": "https://ejemplo.com/firma-adoptante.png",
  "firmaRefugioUrl": "https://ejemplo.com/firma-refugio.png"
}
```

### Legalización Directa

#### `GET /api/legalizacion/adopciones/{adopcionId}/estado`
Obtiene el estado de legalización de una adopción.

#### `POST /api/legalizacion/adopciones/{adopcionId}/certificado`
Genera un certificado de propiedad para una adopción.

#### `GET /api/legalizacion/mascotas/{mascotaId}/documentacion`
Obtiene la documentación asociada a una mascota.

## Flujo de Trabajo Típico

1. **Consultar mascotas disponibles**
   ```http
   GET /api/adopciones/mascotas/disponibles
   ```

2. **Crear solicitud de adopción**
   ```http
   POST /api/adopciones/solicitudes
   ```

3. **Aprobar solicitud** (proceso manual en el módulo de adopciones)

4. **Iniciar legalización**
   ```http
   POST /api/adopciones/solicitudes/{id}/iniciar-legalizacion
   ```

5. **Firmar contrato y completar legalización**
   ```http
   POST /api/adopciones/solicitudes/{id}/completar-legalizacion
   ```

6. **Verificar estado final**
   ```http
   GET /api/adopciones/solicitudes/{id}
   ```

## Manejo de Errores

Todas las respuestas siguen el formato estándar:

```json
{
  "success": boolean,
  "message": "string",
  "data": object,
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error en los datos enviados
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## Monitoreo

### Health Check
```http
GET /health
```

### Información de Servicios
```http
GET /services
```

## Logs

Los logs se configuran en `appsettings.json` y incluyen:
- Información de requests/responses
- Errores de conexión con servicios
- Estados de operaciones críticas

## Desarrollo

### Estructura del Proyecto

```
Api-Gateway/
├── src/
│   ├── ApiGateway/              # Aplicación principal
│   │   ├── Controllers/         # Controladores REST
│   │   ├── Program.cs          # Configuración de la aplicación
│   │   └── appsettings.json    # Configuración
│   ├── ApiGateway.Models/       # DTOs y modelos
│   │   ├── Adopciones/         # Modelos del módulo de adopciones
│   │   ├── Legalizacion/       # Modelos del sistema de legalización
│   │   └── Common/             # Modelos compartidos
│   └── ApiGateway.Services/     # Servicios de integración
│       ├── Adopciones/         # Cliente del módulo de adopciones
│       ├── Legalizacion/       # Cliente del sistema de legalización
│       └── Integration/        # Lógica de integración
```

### Agregar Nuevos Endpoints

1. Crear los DTOs necesarios en `ApiGateway.Models`
2. Implementar la lógica en los servicios correspondientes
3. Agregar los endpoints en los controladores
4. Actualizar la documentación

## Contribución

1. Mantener la estructura de respuestas consistente
2. Implementar logging apropiado
3. Documentar nuevos endpoints en Swagger
4. Probar la integración con ambos servicios
5. Actualizar este README con cambios significativos

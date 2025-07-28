using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiGateway.Models.Adopciones;
using ApiGateway.Models.Legalizacion;
using ApiGateway.Models.Common;
using ApiGateway.Services.Adopciones;
using ApiGateway.Services.Legalizacion;
using Microsoft.Extensions.Logging;

namespace ApiGateway.Services.Integration
{
    public interface IIntegrationService
    {
        Task<ApiResponse<AdopcionCompletaDto>> ProcesarAdopcionCompletaAsync(CreateSolicitudAdopcionDto solicitudDto);
        Task<ApiResponse<AdopcionCompletaDto>> ObtenerAdopcionCompletaAsync(int solicitudId);
        Task<ApiResponse<List<AdopcionCompletaDto>>> ObtenerAdopcionesCompletasPorAdoptanteAsync(int adoptanteId);
        Task<ApiResponse<AdopcionCompletaDto>> IniciarLegalizacionAsync(int solicitudId);
        Task<ApiResponse<AdopcionCompletaDto>> CompletarLegalizacionAsync(int solicitudId, CreateContratoAdopcionDto contratoDto);
        Task<ApiResponse<MascotaDto>> ObtenerMascotaConDocumentacionAsync(int mascotaId);
        Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasDisponiblesConEstadoAsync();
    }

    public class IntegrationService : IIntegrationService
    {
        private readonly IAdopcionesService _adopcionesService;
        private readonly ILegalizacionService _legalizacionService;
        private readonly ILogger<IntegrationService> _logger;

        public IntegrationService(
            IAdopcionesService adopcionesService, 
            ILegalizacionService legalizacionService,
            ILogger<IntegrationService> logger)
        {
            _adopcionesService = adopcionesService;
            _legalizacionService = legalizacionService;
            _logger = logger;
        }

        public async Task<ApiResponse<AdopcionCompletaDto>> ProcesarAdopcionCompletaAsync(CreateSolicitudAdopcionDto solicitudDto)
        {
            try
            {
                _logger.LogInformation($"Iniciando proceso de adopción completa para mascota {solicitudDto.MascotaId} y adoptante {solicitudDto.AdoptanteId}");

                // 1. Crear la solicitud de adopción
                var solicitudResult = await _adopcionesService.CrearSolicitudAdopcionAsync(solicitudDto);
                if (!solicitudResult.Success)
                {
                    _logger.LogError($"Error al crear solicitud de adopción: {solicitudResult.Message}");
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error en solicitud: {solicitudResult.Message}");
                }

                // 2. Obtener información completa de la solicitud
                var adopcionCompleta = new AdopcionCompletaDto
                {
                    SolicitudAdopcion = solicitudResult.Data,
                    EstadoLegalizacion = new LegalizacionStatusDto
                    {
                        AdopcionId = 0, // Se asignará cuando se inicie la legalización
                        EstadoLegalizacion = "Pendiente",
                        ContratoFirmado = false,
                        CertificadoEmitido = false,
                        DocumentosPendientes = new List<string> { "Contrato de adopción", "Documentación de la mascota" }
                    }
                };

                _logger.LogInformation($"Solicitud de adopción creada exitosamente con ID: {solicitudResult.Data.Id}");
                return ApiResponse<AdopcionCompletaDto>.SuccessResult(adopcionCompleta, "Proceso de adopción iniciado exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al procesar adopción completa");
                return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AdopcionCompletaDto>> ObtenerAdopcionCompletaAsync(int solicitudId)
        {
            try
            {
                _logger.LogInformation($"Obteniendo adopción completa para solicitud {solicitudId}");

                // 1. Obtener la solicitud de adopción
                var solicitudResult = await _adopcionesService.ObtenerSolicitudAdopcionAsync(solicitudId);
                if (!solicitudResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error al obtener solicitud: {solicitudResult.Message}");
                }

                var adopcionCompleta = new AdopcionCompletaDto
                {
                    SolicitudAdopcion = solicitudResult.Data
                };

                // 2. Intentar obtener información de legalización si existe
                var adopcionesResult = await _legalizacionService.ObtenerAdopcionesPorMascotaAsync(solicitudResult.Data.MascotaId);
                if (adopcionesResult.Success && adopcionesResult.Data.Count > 0)
                {
                    // Buscar la adopción correspondiente al adoptante
                    var adopcionLegalizacion = adopcionesResult.Data.Find(a => a.AdoptanteId == solicitudResult.Data.AdoptanteId);
                    if (adopcionLegalizacion != null)
                    {
                        adopcionCompleta.ProcesoLegalizacion = adopcionLegalizacion;
                        
                        // Obtener estado de legalización
                        var estadoResult = await _legalizacionService.ObtenerEstadoLegalizacionAsync(adopcionLegalizacion.Id);
                        if (estadoResult.Success)
                        {
                            adopcionCompleta.EstadoLegalizacion = estadoResult.Data;
                        }
                    }
                }

                // Si no hay proceso de legalización, crear estado por defecto
                if (adopcionCompleta.EstadoLegalizacion == null)
                {
                    adopcionCompleta.EstadoLegalizacion = new LegalizacionStatusDto
                    {
                        AdopcionId = 0,
                        EstadoLegalizacion = "No iniciado",
                        ContratoFirmado = false,
                        CertificadoEmitido = false,
                        DocumentosPendientes = new List<string> { "Iniciar proceso de legalización" }
                    };
                }

                return ApiResponse<AdopcionCompletaDto>.SuccessResult(adopcionCompleta);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener adopción completa {solicitudId}");
                return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<AdopcionCompletaDto>>> ObtenerAdopcionesCompletasPorAdoptanteAsync(int adoptanteId)
        {
            try
            {
                _logger.LogInformation($"Obteniendo adopciones completas para adoptante {adoptanteId}");

                // 1. Obtener solicitudes del adoptante
                var solicitudesResult = await _adopcionesService.ObtenerSolicitudesPorAdoptanteAsync(adoptanteId);
                if (!solicitudesResult.Success)
                {
                    return ApiResponse<List<AdopcionCompletaDto>>.ErrorResult($"Error al obtener solicitudes: {solicitudesResult.Message}");
                }

                var adopcionesCompletas = new List<AdopcionCompletaDto>();

                foreach (var solicitud in solicitudesResult.Data)
                {
                    var adopcionCompletaResult = await ObtenerAdopcionCompletaAsync(solicitud.Id);
                    if (adopcionCompletaResult.Success)
                    {
                        adopcionesCompletas.Add(adopcionCompletaResult.Data);
                    }
                }

                return ApiResponse<List<AdopcionCompletaDto>>.SuccessResult(adopcionesCompletas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener adopciones completas para adoptante {adoptanteId}");
                return ApiResponse<List<AdopcionCompletaDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AdopcionCompletaDto>> IniciarLegalizacionAsync(int solicitudId)
        {
            try
            {
                _logger.LogInformation($"Iniciando legalización para solicitud {solicitudId}");

                // 1. Obtener la solicitud de adopción
                var solicitudResult = await _adopcionesService.ObtenerSolicitudAdopcionAsync(solicitudId);
                if (!solicitudResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error al obtener solicitud: {solicitudResult.Message}");
                }

                // 2. Verificar que la solicitud esté aprobada
                if (solicitudResult.Data.Estado != "Aprobada")
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult("La solicitud debe estar aprobada para iniciar la legalización");
                }

                // 3. Crear la adopción en el sistema de legalización
                var createAdopcionDto = new CreateAdopcionDto
                {
                    FechaAdopcion = DateTime.UtcNow,
                    Estado = "En Proceso",
                    MascotaId = solicitudResult.Data.MascotaId,
                    AdoptanteId = solicitudResult.Data.AdoptanteId
                };

                var adopcionResult = await _legalizacionService.CrearAdopcionAsync(createAdopcionDto);
                if (!adopcionResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error al crear adopción en legalización: {adopcionResult.Message}");
                }

                // 4. Actualizar estado de la solicitud
                var updateEstadoDto = new UpdateEstadoSolicitudDto
                {
                    Estado = "En Legalización",
                    Observaciones = "Proceso de legalización iniciado"
                };

                await _adopcionesService.ActualizarEstadoSolicitudAsync(solicitudId, updateEstadoDto);

                // 5. Obtener la adopción completa actualizada
                var adopcionCompletaResult = await ObtenerAdopcionCompletaAsync(solicitudId);
                if (adopcionCompletaResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.SuccessResult(adopcionCompletaResult.Data, "Legalización iniciada exitosamente");
                }

                return ApiResponse<AdopcionCompletaDto>.ErrorResult("Error al obtener adopción completa actualizada");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al iniciar legalización para solicitud {solicitudId}");
                return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AdopcionCompletaDto>> CompletarLegalizacionAsync(int solicitudId, CreateContratoAdopcionDto contratoDto)
        {
            try
            {
                _logger.LogInformation($"Completando legalización para solicitud {solicitudId}");

                // 1. Obtener la adopción completa actual
                var adopcionCompletaResult = await ObtenerAdopcionCompletaAsync(solicitudId);
                if (!adopcionCompletaResult.Success || adopcionCompletaResult.Data.ProcesoLegalizacion == null)
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult("No se encontró proceso de legalización activo");
                }

                var adopcionId = adopcionCompletaResult.Data.ProcesoLegalizacion.Id;

                // 2. Crear el contrato
                contratoDto.AdopcionId = adopcionId;
                var contratoResult = await _legalizacionService.CrearContratoAsync(contratoDto);
                if (!contratoResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error al crear contrato: {contratoResult.Message}");
                }

                // 3. Generar certificado de propiedad
                var certificadoResult = await _legalizacionService.GenerarCertificadoAsync(adopcionId);
                if (!certificadoResult.Success)
                {
                    _logger.LogWarning($"No se pudo generar certificado automáticamente: {certificadoResult.Message}");
                }

                // 4. Actualizar estado de la solicitud a "Completada"
                var updateEstadoDto = new UpdateEstadoSolicitudDto
                {
                    Estado = "Completada",
                    Observaciones = "Legalización completada exitosamente"
                };

                await _adopcionesService.ActualizarEstadoSolicitudAsync(solicitudId, updateEstadoDto);

                // 5. Obtener la adopción completa actualizada
                var adopcionFinalResult = await ObtenerAdopcionCompletaAsync(solicitudId);
                if (adopcionFinalResult.Success)
                {
                    return ApiResponse<AdopcionCompletaDto>.SuccessResult(adopcionFinalResult.Data, "Legalización completada exitosamente");
                }

                return ApiResponse<AdopcionCompletaDto>.ErrorResult("Error al obtener adopción completa final");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al completar legalización para solicitud {solicitudId}");
                return ApiResponse<AdopcionCompletaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<MascotaDto>> ObtenerMascotaConDocumentacionAsync(int mascotaId)
        {
            try
            {
                // 1. Obtener información de la mascota
                var mascotaResult = await _adopcionesService.ObtenerMascotaAsync(mascotaId);
                if (!mascotaResult.Success)
                {
                    return mascotaResult;
                }

                // 2. Obtener documentación de la mascota del sistema de legalización
                var documentacionResult = await _legalizacionService.ObtenerDocumentacionMascotaAsync(mascotaId);
                if (documentacionResult.Success && documentacionResult.Data.Count > 0)
                {
                    _logger.LogInformation($"Mascota {mascotaId} tiene {documentacionResult.Data.Count} documentos");
                    // Aquí podrías agregar la documentación al DTO de mascota si lo modificas
                }

                return mascotaResult;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener mascota con documentación {mascotaId}");
                return ApiResponse<MascotaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasDisponiblesConEstadoAsync()
        {
            try
            {
                // 1. Obtener mascotas disponibles
                var mascotasResult = await _adopcionesService.ObtenerMascotasDisponiblesAsync();
                if (!mascotasResult.Success)
                {
                    return mascotasResult;
                }

                // 2. Para cada mascota, verificar si tiene procesos de legalización pendientes
                foreach (var mascota in mascotasResult.Data)
                {
                    var adopcionesResult = await _legalizacionService.ObtenerAdopcionesPorMascotaAsync(mascota.Id);
                    if (adopcionesResult.Success && adopcionesResult.Data.Count > 0)
                    {
                        // Si hay adopciones en proceso, la mascota no debería estar disponible
                        var adopcionEnProceso = adopcionesResult.Data.Find(a => a.Estado == "En Proceso");
                        if (adopcionEnProceso != null)
                        {
                            _logger.LogWarning($"Mascota {mascota.Id} marcada como disponible pero tiene adopción en proceso");
                        }
                    }
                }

                return mascotasResult;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener mascotas disponibles con estado");
                return ApiResponse<List<MascotaDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }
    }
}

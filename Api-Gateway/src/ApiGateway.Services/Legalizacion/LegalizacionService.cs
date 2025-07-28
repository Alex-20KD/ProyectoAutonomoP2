using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ApiGateway.Models.Legalizacion;
using ApiGateway.Models.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ApiGateway.Services.Legalizacion
{
    public interface ILegalizacionService
    {
        Task<ApiResponse<AdopcionDto>> CrearAdopcionAsync(CreateAdopcionDto adopcionDto);
        Task<ApiResponse<AdopcionDto>> ObtenerAdopcionAsync(int adopcionId);
        Task<ApiResponse<List<AdopcionDto>>> ObtenerAdopcionesPorMascotaAsync(int mascotaId);
        Task<ApiResponse<List<AdopcionDto>>> ObtenerAdopcionesPorAdoptanteAsync(int adoptanteId);
        Task<ApiResponse<ContratoAdopcionDto>> CrearContratoAsync(CreateContratoAdopcionDto contratoDto);
        Task<ApiResponse<ContratoAdopcionDto>> ObtenerContratoAsync(int adopcionId);
        Task<ApiResponse<LegalizacionStatusDto>> ObtenerEstadoLegalizacionAsync(int adopcionId);
        Task<ApiResponse<CertificadoPropiedadDto>> GenerarCertificadoAsync(int adopcionId);
        Task<ApiResponse<List<SeguimientoAdopcionDto>>> ObtenerSeguimientosAsync(int adopcionId);
        Task<ApiResponse<DocumentacionMascotaDto>> SubirDocumentacionMascotaAsync(int mascotaId, DocumentacionMascotaDto documentacion);
        Task<ApiResponse<List<DocumentacionMascotaDto>>> ObtenerDocumentacionMascotaAsync(int mascotaId);
    }

    public class LegalizacionService : ILegalizacionService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<LegalizacionService> _logger;
        private readonly IConfiguration _configuration;
        private readonly string _legalizacionApiUrl;

        public LegalizacionService(HttpClient httpClient, ILogger<LegalizacionService> logger, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _logger = logger;
            _configuration = configuration;
            _legalizacionApiUrl = _configuration["Services:LegalizacionApi:BaseUrl"] ?? "https://localhost:7001";
        }

        public async Task<ApiResponse<AdopcionDto>> CrearAdopcionAsync(CreateAdopcionDto adopcionDto)
        {
            try
            {
                var json = JsonSerializer.Serialize(adopcionDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_legalizacionApiUrl}/api/Adopcion", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adopcion = JsonSerializer.Deserialize<AdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    _logger.LogInformation($"Adopción creada exitosamente con ID: {adopcion.Id}");
                    return ApiResponse<AdopcionDto>.SuccessResult(adopcion, "Adopción creada exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al crear adopción: {response.StatusCode} - {errorContent}");
                return ApiResponse<AdopcionDto>.ErrorResult($"Error al crear adopción: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al crear adopción");
                return ApiResponse<AdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AdopcionDto>> ObtenerAdopcionAsync(int adopcionId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/Adopcion/{adopcionId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adopcion = JsonSerializer.Deserialize<AdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<AdopcionDto>.SuccessResult(adopcion);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return ApiResponse<AdopcionDto>.ErrorResult("Adopción no encontrada");
                }

                _logger.LogError($"Error al obtener adopción: {response.StatusCode}");
                return ApiResponse<AdopcionDto>.ErrorResult($"Error al obtener adopción: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener adopción {adopcionId}");
                return ApiResponse<AdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<AdopcionDto>>> ObtenerAdopcionesPorMascotaAsync(int mascotaId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/Adopcion/mascota/{mascotaId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adopciones = JsonSerializer.Deserialize<List<AdopcionDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<AdopcionDto>>.SuccessResult(adopciones);
                }

                _logger.LogError($"Error al obtener adopciones por mascota: {response.StatusCode}");
                return ApiResponse<List<AdopcionDto>>.ErrorResult($"Error al obtener adopciones: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener adopciones por mascota {mascotaId}");
                return ApiResponse<List<AdopcionDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<AdopcionDto>>> ObtenerAdopcionesPorAdoptanteAsync(int adoptanteId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/Adopcion/adoptante/{adoptanteId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adopciones = JsonSerializer.Deserialize<List<AdopcionDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<AdopcionDto>>.SuccessResult(adopciones);
                }

                _logger.LogError($"Error al obtener adopciones por adoptante: {response.StatusCode}");
                return ApiResponse<List<AdopcionDto>>.ErrorResult($"Error al obtener adopciones: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener adopciones por adoptante {adoptanteId}");
                return ApiResponse<List<AdopcionDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<ContratoAdopcionDto>> CrearContratoAsync(CreateContratoAdopcionDto contratoDto)
        {
            try
            {
                var json = JsonSerializer.Serialize(contratoDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_legalizacionApiUrl}/api/ContratoAdopcion", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var contrato = JsonSerializer.Deserialize<ContratoAdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<ContratoAdopcionDto>.SuccessResult(contrato, "Contrato creado exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al crear contrato: {response.StatusCode} - {errorContent}");
                return ApiResponse<ContratoAdopcionDto>.ErrorResult($"Error al crear contrato: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al crear contrato");
                return ApiResponse<ContratoAdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<ContratoAdopcionDto>> ObtenerContratoAsync(int adopcionId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/ContratoAdopcion/adopcion/{adopcionId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var contrato = JsonSerializer.Deserialize<ContratoAdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<ContratoAdopcionDto>.SuccessResult(contrato);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return ApiResponse<ContratoAdopcionDto>.ErrorResult("Contrato no encontrado");
                }

                _logger.LogError($"Error al obtener contrato: {response.StatusCode}");
                return ApiResponse<ContratoAdopcionDto>.ErrorResult($"Error al obtener contrato: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener contrato para adopción {adopcionId}");
                return ApiResponse<ContratoAdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<LegalizacionStatusDto>> ObtenerEstadoLegalizacionAsync(int adopcionId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/Adopcion/{adopcionId}/status");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var status = JsonSerializer.Deserialize<LegalizacionStatusDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<LegalizacionStatusDto>.SuccessResult(status);
                }

                _logger.LogError($"Error al obtener estado de legalización: {response.StatusCode}");
                return ApiResponse<LegalizacionStatusDto>.ErrorResult($"Error al obtener estado: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener estado de legalización para adopción {adopcionId}");
                return ApiResponse<LegalizacionStatusDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<CertificadoPropiedadDto>> GenerarCertificadoAsync(int adopcionId)
        {
            try
            {
                var response = await _httpClient.PostAsync($"{_legalizacionApiUrl}/api/CertificadoPropiedad/generar/{adopcionId}", null);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var certificado = JsonSerializer.Deserialize<CertificadoPropiedadDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<CertificadoPropiedadDto>.SuccessResult(certificado, "Certificado generado exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al generar certificado: {response.StatusCode} - {errorContent}");
                return ApiResponse<CertificadoPropiedadDto>.ErrorResult($"Error al generar certificado: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al generar certificado para adopción {adopcionId}");
                return ApiResponse<CertificadoPropiedadDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<SeguimientoAdopcionDto>>> ObtenerSeguimientosAsync(int adopcionId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/SeguimientoAdopcion/adopcion/{adopcionId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var seguimientos = JsonSerializer.Deserialize<List<SeguimientoAdopcionDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<SeguimientoAdopcionDto>>.SuccessResult(seguimientos);
                }

                _logger.LogError($"Error al obtener seguimientos: {response.StatusCode}");
                return ApiResponse<List<SeguimientoAdopcionDto>>.ErrorResult($"Error al obtener seguimientos: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener seguimientos para adopción {adopcionId}");
                return ApiResponse<List<SeguimientoAdopcionDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<DocumentacionMascotaDto>> SubirDocumentacionMascotaAsync(int mascotaId, DocumentacionMascotaDto documentacion)
        {
            try
            {
                var json = JsonSerializer.Serialize(documentacion);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_legalizacionApiUrl}/api/DocumentacionMascota/mascota/{mascotaId}", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var documento = JsonSerializer.Deserialize<DocumentacionMascotaDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<DocumentacionMascotaDto>.SuccessResult(documento, "Documentación subida exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al subir documentación: {response.StatusCode} - {errorContent}");
                return ApiResponse<DocumentacionMascotaDto>.ErrorResult($"Error al subir documentación: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al subir documentación para mascota {mascotaId}");
                return ApiResponse<DocumentacionMascotaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<DocumentacionMascotaDto>>> ObtenerDocumentacionMascotaAsync(int mascotaId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_legalizacionApiUrl}/api/DocumentacionMascota/mascota/{mascotaId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var documentos = JsonSerializer.Deserialize<List<DocumentacionMascotaDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<DocumentacionMascotaDto>>.SuccessResult(documentos);
                }

                _logger.LogError($"Error al obtener documentación: {response.StatusCode}");
                return ApiResponse<List<DocumentacionMascotaDto>>.ErrorResult($"Error al obtener documentación: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener documentación para mascota {mascotaId}");
                return ApiResponse<List<DocumentacionMascotaDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }
    }
}

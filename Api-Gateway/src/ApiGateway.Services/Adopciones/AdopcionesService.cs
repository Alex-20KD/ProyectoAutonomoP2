using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ApiGateway.Models.Adopciones;
using ApiGateway.Models.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ApiGateway.Services.Adopciones
{
    public interface IAdopcionesService
    {
        Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasAsync();
        Task<ApiResponse<MascotaDto>> ObtenerMascotaAsync(int mascotaId);
        Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasDisponiblesAsync();
        Task<ApiResponse<SolicitudAdopcionDto>> CrearSolicitudAdopcionAsync(CreateSolicitudAdopcionDto solicitudDto);
        Task<ApiResponse<SolicitudAdopcionDto>> ObtenerSolicitudAdopcionAsync(int solicitudId);
        Task<ApiResponse<List<SolicitudAdopcionDto>>> ObtenerSolicitudesPorAdoptanteAsync(int adoptanteId);
        Task<ApiResponse<SolicitudAdopcionDto>> ActualizarEstadoSolicitudAsync(int solicitudId, UpdateEstadoSolicitudDto updateDto);
        Task<ApiResponse<AdoptanteDto>> ObtenerAdoptanteAsync(int adoptanteId);
        Task<ApiResponse<List<AdoptanteDto>>> ObtenerAdoptantesAsync();
    }

    public class AdopcionesService : IAdopcionesService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AdopcionesService> _logger;
        private readonly IConfiguration _configuration;
        private readonly string _adopcionesApiUrl;

        public AdopcionesService(HttpClient httpClient, ILogger<AdopcionesService> logger, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _logger = logger;
            _configuration = configuration;
            _adopcionesApiUrl = _configuration["Services:AdopcionesApi:BaseUrl"] ?? "http://localhost:3000";
        }

        public async Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/mascota");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var mascotas = JsonSerializer.Deserialize<List<MascotaDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<MascotaDto>>.SuccessResult(mascotas);
                }

                _logger.LogError($"Error al obtener mascotas: {response.StatusCode}");
                return ApiResponse<List<MascotaDto>>.ErrorResult($"Error al obtener mascotas: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al obtener mascotas");
                return ApiResponse<List<MascotaDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<MascotaDto>> ObtenerMascotaAsync(int mascotaId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/mascotas/{mascotaId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var mascota = JsonSerializer.Deserialize<MascotaDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<MascotaDto>.SuccessResult(mascota);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return ApiResponse<MascotaDto>.ErrorResult("Mascota no encontrada");
                }

                _logger.LogError($"Error al obtener mascota: {response.StatusCode}");
                return ApiResponse<MascotaDto>.ErrorResult($"Error al obtener mascota: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener mascota {mascotaId}");
                return ApiResponse<MascotaDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<MascotaDto>>> ObtenerMascotasDisponiblesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/mascotas/disponibles");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var mascotas = JsonSerializer.Deserialize<List<MascotaDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<MascotaDto>>.SuccessResult(mascotas);
                }

                _logger.LogError($"Error al obtener mascotas disponibles: {response.StatusCode}");
                return ApiResponse<List<MascotaDto>>.ErrorResult($"Error al obtener mascotas disponibles: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al obtener mascotas disponibles");
                return ApiResponse<List<MascotaDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SolicitudAdopcionDto>> CrearSolicitudAdopcionAsync(CreateSolicitudAdopcionDto solicitudDto)
        {
            try
            {
                var json = JsonSerializer.Serialize(solicitudDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_adopcionesApiUrl}/solicitud-adopcion", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var solicitud = JsonSerializer.Deserialize<SolicitudAdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    _logger.LogInformation($"Solicitud de adopción creada exitosamente con ID: {solicitud.Id}");
                    return ApiResponse<SolicitudAdopcionDto>.SuccessResult(solicitud, "Solicitud de adopción creada exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al crear solicitud de adopción: {response.StatusCode} - {errorContent}");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error al crear solicitud: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al crear solicitud de adopción");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SolicitudAdopcionDto>> ObtenerSolicitudAdopcionAsync(int solicitudId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/solicitud-adopcion/{solicitudId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var solicitud = JsonSerializer.Deserialize<SolicitudAdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<SolicitudAdopcionDto>.SuccessResult(solicitud);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return ApiResponse<SolicitudAdopcionDto>.ErrorResult("Solicitud de adopción no encontrada");
                }

                _logger.LogError($"Error al obtener solicitud de adopción: {response.StatusCode}");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error al obtener solicitud: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener solicitud de adopción {solicitudId}");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<SolicitudAdopcionDto>>> ObtenerSolicitudesPorAdoptanteAsync(int adoptanteId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/solicitud-adopcion/adoptante/{adoptanteId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var solicitudes = JsonSerializer.Deserialize<List<SolicitudAdopcionDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<SolicitudAdopcionDto>>.SuccessResult(solicitudes);
                }

                _logger.LogError($"Error al obtener solicitudes por adoptante: {response.StatusCode}");
                return ApiResponse<List<SolicitudAdopcionDto>>.ErrorResult($"Error al obtener solicitudes: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener solicitudes por adoptante {adoptanteId}");
                return ApiResponse<List<SolicitudAdopcionDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<SolicitudAdopcionDto>> ActualizarEstadoSolicitudAsync(int solicitudId, UpdateEstadoSolicitudDto updateDto)
        {
            try
            {
                var json = JsonSerializer.Serialize(updateDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PutAsync($"{_adopcionesApiUrl}/solicitud-adopcion/{solicitudId}/estado", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var solicitud = JsonSerializer.Deserialize<SolicitudAdopcionDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<SolicitudAdopcionDto>.SuccessResult(solicitud, "Estado de solicitud actualizado exitosamente");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Error al actualizar estado de solicitud: {response.StatusCode} - {errorContent}");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error al actualizar estado: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al actualizar estado de solicitud {solicitudId}");
                return ApiResponse<SolicitudAdopcionDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AdoptanteDto>> ObtenerAdoptanteAsync(int adoptanteId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/adoptante/{adoptanteId}");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adoptante = JsonSerializer.Deserialize<AdoptanteDto>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<AdoptanteDto>.SuccessResult(adoptante);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return ApiResponse<AdoptanteDto>.ErrorResult("Adoptante no encontrado");
                }

                _logger.LogError($"Error al obtener adoptante: {response.StatusCode}");
                return ApiResponse<AdoptanteDto>.ErrorResult($"Error al obtener adoptante: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Excepción al obtener adoptante {adoptanteId}");
                return ApiResponse<AdoptanteDto>.ErrorResult($"Error interno: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<AdoptanteDto>>> ObtenerAdoptantesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_adopcionesApiUrl}/adoptante");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var adoptantes = JsonSerializer.Deserialize<List<AdoptanteDto>>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return ApiResponse<List<AdoptanteDto>>.SuccessResult(adoptantes);
                }

                _logger.LogError($"Error al obtener adoptantes: {response.StatusCode}");
                return ApiResponse<List<AdoptanteDto>>.ErrorResult($"Error al obtener adoptantes: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excepción al obtener adoptantes");
                return ApiResponse<List<AdoptanteDto>>.ErrorResult($"Error interno: {ex.Message}");
            }
        }
    }
}

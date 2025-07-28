using System.Text.Json;

namespace ApiGateway.Services.Donantes
{
    public interface IDonantesService
    {
        // Operaciones básicas de donantes
        Task<object> ObtenerDonantesAsync();
        Task<object> ObtenerDonantePorIdAsync(int donanteId);
        Task<object> CrearDonanteAsync(object donanteData);
        Task<object> ActualizarDonanteAsync(int donanteId, object donanteData);
        Task<bool> EliminarDonanteAsync(int donanteId);
        
        // Integraciones con otros servicios
        Task<object> ObtenerMascotasDisponiblesAsync();
        Task<object> ObtenerProcesosLegalizacionAsync();
        Task<object> ProcesarDonacionMascotaAsync(object donacionData);
        Task<object> IniciarAdopcionCompletaAsync(object adopcionData);
        
        // Monitoreo y estadísticas
        Task<object> VerificarServiciosConectadosAsync();
        Task<object> ObtenerEstadisticasIntegracionAsync();
        Task<object> TestConexionServiciosAsync();
    }

    public class DonantesService : IDonantesService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<DonantesService> _logger;
        private readonly string _donantesApiUrl;

        public DonantesService(HttpClient httpClient, IConfiguration configuration, ILogger<DonantesService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
            _donantesApiUrl = _configuration["Services:DonantesApi:BaseUrl"] ?? "http://localhost:8000";
            
            _httpClient.BaseAddress = new Uri(_donantesApiUrl);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
        }

        // ===============================
        // OPERACIONES BÁSICAS DE DONANTES
        // ===============================

        public async Task<object> ObtenerDonantesAsync()
        {
            try
            {
                _logger.LogInformation("Obteniendo lista de donantes desde {Url}", $"{_donantesApiUrl}/api/v1/donantes");
                
                var response = await _httpClient.GetAsync("/api/v1/donantes");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                var donantes = JsonSerializer.Deserialize<object>(content);
                
                return new
                {
                    Success = true,
                    Message = "Donantes obtenidos exitosamente",
                    Data = donantes,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error de conexión al obtener donantes");
                throw new Exception($"Error de conexión con el servicio de donantes: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inesperado al obtener donantes");
                throw new Exception($"Error interno del servidor: {ex.Message}");
            }
        }

        public async Task<object> ObtenerDonantePorIdAsync(int donanteId)
        {
            try
            {
                _logger.LogInformation("Obteniendo donante con ID {DonanteId}", donanteId);
                
                var response = await _httpClient.GetAsync($"/api/v1/donantes/{donanteId}");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                var donante = JsonSerializer.Deserialize<object>(content);
                
                return new
                {
                    Success = true,
                    Message = "Donante obtenido exitosamente",
                    Data = donante,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error de conexión al obtener donante {DonanteId}", donanteId);
                throw new Exception($"Error de conexión con el servicio de donantes: {ex.Message}");
            }
        }

        public async Task<object> CrearDonanteAsync(object donanteData)
        {
            try
            {
                _logger.LogInformation("Creando nuevo donante");
                
                var json = JsonSerializer.Serialize(donanteData);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync("/api/v1/donantes", content);
                response.EnsureSuccessStatusCode();
                
                var responseContent = await response.Content.ReadAsStringAsync();
                var donante = JsonSerializer.Deserialize<object>(responseContent);
                
                return new
                {
                    Success = true,
                    Message = "Donante creado exitosamente",
                    Data = donante,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error de conexión al crear donante");
                throw new Exception($"Error de conexión con el servicio de donantes: {ex.Message}");
            }
        }

        public async Task<object> ActualizarDonanteAsync(int donanteId, object donanteData)
        {
            try
            {
                _logger.LogInformation("Actualizando donante con ID {DonanteId}", donanteId);
                
                var json = JsonSerializer.Serialize(donanteData);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PutAsync($"/api/v1/donantes/{donanteId}", content);
                response.EnsureSuccessStatusCode();
                
                var responseContent = await response.Content.ReadAsStringAsync();
                var donante = JsonSerializer.Deserialize<object>(responseContent);
                
                return new
                {
                    Success = true,
                    Message = "Donante actualizado exitosamente",
                    Data = donante,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error de conexión al actualizar donante {DonanteId}", donanteId);
                throw new Exception($"Error de conexión con el servicio de donantes: {ex.Message}");
            }
        }

        public async Task<bool> EliminarDonanteAsync(int donanteId)
        {
            try
            {
                _logger.LogInformation("Eliminando donante con ID {DonanteId}", donanteId);
                
                var response = await _httpClient.DeleteAsync($"/api/v1/donantes/{donanteId}");
                response.EnsureSuccessStatusCode();
                
                return true;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error de conexión al eliminar donante {DonanteId}", donanteId);
                throw new Exception($"Error de conexión con el servicio de donantes: {ex.Message}");
            }
        }

        // ===============================
        // INTEGRACIONES CON OTROS SERVICIOS
        // ===============================

        public async Task<object> ObtenerMascotasDisponiblesAsync()
        {
            try
            {
                _logger.LogInformation("Obteniendo mascotas disponibles a través del servicio de donantes");
                
                var response = await _httpClient.GetAsync("/api/v1/integracion/mascotas/disponibles");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                var mascotas = JsonSerializer.Deserialize<object>(content);
                
                return new
                {
                    Success = true,
                    Message = "Mascotas disponibles obtenidas exitosamente",
                    Data = mascotas,
                    Source = "Servicio de Donantes -> Servicio de Mascotas",
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener mascotas disponibles");
                throw new Exception($"Error obteniendo mascotas disponibles: {ex.Message}");
            }
        }

        public async Task<object> ObtenerProcesosLegalizacionAsync()
        {
            try
            {
                _logger.LogInformation("Obteniendo procesos de legalización a través del servicio de donantes");
                
                var response = await _httpClient.GetAsync("/api/v1/integracion/legalizacion/procesos");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                var procesos = JsonSerializer.Deserialize<object>(content);
                
                return new
                {
                    Success = true,
                    Message = "Procesos de legalización obtenidos exitosamente",
                    Data = procesos,
                    SourceS = "Servicio de Donantes -> Servicio de Legalización",
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener procesos de legalización");
                throw new Exception($"Error obteniendo procesos de legalización: {ex.Message}");
            }
        }

        public async Task<object> ProcesarDonacionMascotaAsync(object donacionData)
        {
            try
            {
                _logger.LogInformation("Procesando donación de mascota");
                
                var json = JsonSerializer.Serialize(donacionData);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync("/api/v1/integracion/donacion-mascota", content);
                response.EnsureSuccessStatusCode();
                
                var responseContent = await response.Content.ReadAsStringAsync();
                var resultado = JsonSerializer.Deserialize<object>(responseContent);
                
                return new
                {
                    Success = true,
                    Message = "Donación de mascota procesada exitosamente",
                    Data = resultado,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al procesar donación de mascota");
                throw new Exception($"Error procesando donación de mascota: {ex.Message}");
            }
        }

        public async Task<object> IniciarAdopcionCompletaAsync(object adopcionData)
        {
            try
            {
                _logger.LogInformation("Iniciando proceso completo de adopción");
                
                var json = JsonSerializer.Serialize(adopcionData);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync("/api/v1/integracion/adopcion-completa", content);
                response.EnsureSuccessStatusCode();
                
                var responseContent = await response.Content.ReadAsStringAsync();
                var resultado = JsonSerializer.Deserialize<object>(responseContent);
                
                return new
                {
                    Success = true,
                    Message = "Proceso de adopción iniciado exitosamente",
                    Data = resultado,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al iniciar adopción completa");
                throw new Exception($"Error iniciando adopción completa: {ex.Message}");
            }
        }

        // ===============================
        // MONITOREO Y ESTADÍSTICAS
        // ===============================

        public async Task<object> VerificarServiciosConectadosAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/api/v1/integracion/health-servicios");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<object>(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al verificar servicios conectados");
                throw new Exception($"Error verificando servicios: {ex.Message}");
            }
        }

        public async Task<object> ObtenerEstadisticasIntegracionAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/api/v1/integracion/estadisticas");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<object>(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener estadísticas de integración");
                throw new Exception($"Error obteniendo estadísticas: {ex.Message}");
            }
        }

        public async Task<object> TestConexionServiciosAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/api/v1/integracion/test-conexion");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<object>(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en test de conexión de servicios");
                throw new Exception($"Error en test de conexión: {ex.Message}");
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using ApiGateway.Services.Donantes;

namespace ApiGateway.Controllers
{
    /// <summary>
    /// Controlador para operaciones del módulo de donantes y sus integraciones
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DonantesController : ControllerBase
    {
        private readonly IDonantesService _donantesService;
        private readonly ILogger<DonantesController> _logger;

        public DonantesController(IDonantesService donantesService, ILogger<DonantesController> logger)
        {
            _donantesService = donantesService;
            _logger = logger;
        }

        // ===============================
        // OPERACIONES BÁSICAS DE DONANTES
        // ===============================

        /// <summary>
        /// Obtener todos los donantes
        /// </summary>
        /// <returns>Lista de donantes</returns>
        [HttpGet]
        public async Task<IActionResult> ObtenerDonantes()
        {
            try
            {
                var resultado = await _donantesService.ObtenerDonantesAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener donantes");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Obtener un donante por ID
        /// </summary>
        /// <param name="id">ID del donante</param>
        /// <returns>Información del donante</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerDonantePorId(int id)
        {
            try
            {
                var resultado = await _donantesService.ObtenerDonantePorIdAsync(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener donante {DonanteId}", id);
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Crear un nuevo donante
        /// </summary>
        /// <param name="donanteData">Datos del donante</param>
        /// <returns>Donante creado</returns>
        [HttpPost]
        public async Task<IActionResult> CrearDonante([FromBody] object donanteData)
        {
            try
            {
                var resultado = await _donantesService.CrearDonanteAsync(donanteData);
                return StatusCode(201, resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear donante");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Actualizar un donante
        /// </summary>
        /// <param name="id">ID del donante</param>
        /// <param name="donanteData">Datos actualizados del donante</param>
        /// <returns>Donante actualizado</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarDonante(int id, [FromBody] object donanteData)
        {
            try
            {
                var resultado = await _donantesService.ActualizarDonanteAsync(id, donanteData);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar donante {DonanteId}", id);
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Eliminar un donante
        /// </summary>
        /// <param name="id">ID del donante</param>
        /// <returns>Confirmación de eliminación</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarDonante(int id)
        {
            try
            {
                var resultado = await _donantesService.EliminarDonanteAsync(id);
                return Ok(new { 
                    Success = true, 
                    Message = "Donante eliminado exitosamente",
                    DonanteId = id,
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar donante {DonanteId}", id);
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        // ===============================
        // INTEGRACIONES CON OTROS SERVICIOS
        // ===============================

        /// <summary>
        /// Obtener mascotas disponibles a través del servicio de donantes
        /// </summary>
        /// <returns>Lista de mascotas disponibles</returns>
        [HttpGet("integracion/mascotas/disponibles")]
        public async Task<IActionResult> ObtenerMascotasDisponibles()
        {
            try
            {
                var resultado = await _donantesService.ObtenerMascotasDisponiblesAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener mascotas disponibles");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Obtener procesos de legalización a través del servicio de donantes
        /// </summary>
        /// <returns>Lista de procesos de legalización</returns>
        [HttpGet("integracion/legalizacion/procesos")]
        public async Task<IActionResult> ObtenerProcesosLegalizacion()
        {
            try
            {
                var resultado = await _donantesService.ObtenerProcesosLegalizacionAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener procesos de legalización");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Procesar donación de una mascota
        /// </summary>
        /// <param name="donacionData">Datos de la donación</param>
        /// <returns>Resultado del procesamiento</returns>
        [HttpPost("integracion/donacion-mascota")]
        public async Task<IActionResult> ProcesarDonacionMascota([FromBody] object donacionData)
        {
            try
            {
                var resultado = await _donantesService.ProcesarDonacionMascotaAsync(donacionData);
                return StatusCode(201, resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al procesar donación de mascota");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Iniciar proceso completo de adopción
        /// </summary>
        /// <param name="adopcionData">Datos de la adopción</param>
        /// <returns>Resultado del proceso de adopción</returns>
        [HttpPost("integracion/adopcion-completa")]
        public async Task<IActionResult> IniciarAdopcionCompleta([FromBody] object adopcionData)
        {
            try
            {
                var resultado = await _donantesService.IniciarAdopcionCompletaAsync(adopcionData);
                return StatusCode(201, resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al iniciar adopción completa");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        // ===============================
        // MONITOREO Y ESTADÍSTICAS
        // ===============================

        /// <summary>
        /// Verificar conectividad con todos los servicios
        /// </summary>
        /// <returns>Estado de conectividad de servicios</returns>
        [HttpGet("integracion/health-servicios")]
        public async Task<IActionResult> VerificarServiciosConectados()
        {
            try
            {
                var resultado = await _donantesService.VerificarServiciosConectadosAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al verificar servicios conectados");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Obtener estadísticas de integración
        /// </summary>
        /// <returns>Estadísticas de integración con otros servicios</returns>
        [HttpGet("integracion/estadisticas")]
        public async Task<IActionResult> ObtenerEstadisticasIntegracion()
        {
            try
            {
                var resultado = await _donantesService.ObtenerEstadisticasIntegracionAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener estadísticas de integración");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Test de conexión con todos los servicios
        /// </summary>
        /// <returns>Resultado de tests de conexión</returns>
        [HttpGet("integracion/test-conexion")]
        public async Task<IActionResult> TestConexionServicios()
        {
            try
            {
                var resultado = await _donantesService.TestConexionServiciosAsync();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en test de conexión de servicios");
                return StatusCode(500, new { 
                    Success = false, 
                    Message = "Error interno del servidor", 
                    Error = ex.Message 
                });
            }
        }
    }
}

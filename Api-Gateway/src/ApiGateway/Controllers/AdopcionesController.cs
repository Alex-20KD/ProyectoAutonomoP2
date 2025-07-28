using Microsoft.AspNetCore.Mvc;
using ApiGateway.Models.Adopciones;
using ApiGateway.Models.Legalizacion;
using ApiGateway.Models.Common;
using ApiGateway.Services.Integration;
using System.Threading.Tasks;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdopcionesController : ControllerBase
    {
        private readonly IIntegrationService _integrationService;

        public AdopcionesController(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }

        /// <summary>
        /// Obtener todas las mascotas disponibles para adopción
        /// </summary>
        [HttpGet("mascotas/disponibles")]
        public async Task<ActionResult<ApiResponse<List<MascotaDto>>>> ObtenerMascotasDisponibles()
        {
            var result = await _integrationService.ObtenerMascotasDisponiblesConEstadoAsync();
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener información detallada de una mascota con su documentación
        /// </summary>
        [HttpGet("mascotas/{mascotaId}")]
        public async Task<ActionResult<ApiResponse<MascotaDto>>> ObtenerMascota(int mascotaId)
        {
            var result = await _integrationService.ObtenerMascotaConDocumentacionAsync(mascotaId);
            
            if (result.Success)
                return Ok(result);
            
            if (result.Message.Contains("no encontrada"))
                return NotFound(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Crear una nueva solicitud de adopción
        /// </summary>
        [HttpPost("solicitudes")]
        public async Task<ActionResult<ApiResponse<AdopcionCompletaDto>>> CrearSolicitudAdopcion([FromBody] CreateSolicitudAdopcionDto solicitudDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<AdopcionCompletaDto>.ErrorResult("Datos de solicitud inválidos"));
            }

            var result = await _integrationService.ProcesarAdopcionCompletaAsync(solicitudDto);
            
            if (result.Success)
                return Created($"api/adopciones/solicitudes/{result.Data.SolicitudAdopcion.Id}", result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener información completa de una adopción (solicitud + legalización)
        /// </summary>
        [HttpGet("solicitudes/{solicitudId}")]
        public async Task<ActionResult<ApiResponse<AdopcionCompletaDto>>> ObtenerAdopcionCompleta(int solicitudId)
        {
            var result = await _integrationService.ObtenerAdopcionCompletaAsync(solicitudId);
            
            if (result.Success)
                return Ok(result);
            
            if (result.Message.Contains("no encontrada"))
                return NotFound(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener todas las adopciones de un adoptante específico
        /// </summary>
        [HttpGet("adoptantes/{adoptanteId}/adopciones")]
        public async Task<ActionResult<ApiResponse<List<AdopcionCompletaDto>>>> ObtenerAdopcionesPorAdoptante(int adoptanteId)
        {
            var result = await _integrationService.ObtenerAdopcionesCompletasPorAdoptanteAsync(adoptanteId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Iniciar el proceso de legalización para una solicitud aprobada
        /// </summary>
        [HttpPost("solicitudes/{solicitudId}/iniciar-legalizacion")]
        public async Task<ActionResult<ApiResponse<AdopcionCompletaDto>>> IniciarLegalizacion(int solicitudId)
        {
            var result = await _integrationService.IniciarLegalizacionAsync(solicitudId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Completar el proceso de legalización con la firma del contrato
        /// </summary>
        [HttpPost("solicitudes/{solicitudId}/completar-legalizacion")]
        public async Task<ActionResult<ApiResponse<AdopcionCompletaDto>>> CompletarLegalizacion(int solicitudId, [FromBody] CreateContratoAdopcionDto contratoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<AdopcionCompletaDto>.ErrorResult("Datos del contrato inválidos"));
            }

            var result = await _integrationService.CompletarLegalizacionAsync(solicitudId, contratoDto);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }
    }
}

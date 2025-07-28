using Microsoft.AspNetCore.Mvc;
using ApiGateway.Models.Legalizacion;
using ApiGateway.Models.Common;
using ApiGateway.Services.Legalizacion;
using System.Threading.Tasks;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LegalizacionController : ControllerBase
    {
        private readonly ILegalizacionService _legalizacionService;

        public LegalizacionController(ILegalizacionService legalizacionService)
        {
            _legalizacionService = legalizacionService;
        }

        /// <summary>
        /// Obtener información de una adopción en el sistema de legalización
        /// </summary>
        [HttpGet("adopciones/{adopcionId}")]
        public async Task<ActionResult<ApiResponse<AdopcionDto>>> ObtenerAdopcion(int adopcionId)
        {
            var result = await _legalizacionService.ObtenerAdopcionAsync(adopcionId);
            
            if (result.Success)
                return Ok(result);
            
            if (result.Message.Contains("no encontrada"))
                return NotFound(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener estado de legalización de una adopción
        /// </summary>
        [HttpGet("adopciones/{adopcionId}/estado")]
        public async Task<ActionResult<ApiResponse<LegalizacionStatusDto>>> ObtenerEstadoLegalizacion(int adopcionId)
        {
            var result = await _legalizacionService.ObtenerEstadoLegalizacionAsync(adopcionId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener adopciones por mascota
        /// </summary>
        [HttpGet("mascotas/{mascotaId}/adopciones")]
        public async Task<ActionResult<ApiResponse<List<AdopcionDto>>>> ObtenerAdopcionesPorMascota(int mascotaId)
        {
            var result = await _legalizacionService.ObtenerAdopcionesPorMascotaAsync(mascotaId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener adopciones por adoptante
        /// </summary>
        [HttpGet("adoptantes/{adoptanteId}/adopciones")]
        public async Task<ActionResult<ApiResponse<List<AdopcionDto>>>> ObtenerAdopcionesPorAdoptante(int adoptanteId)
        {
            var result = await _legalizacionService.ObtenerAdopcionesPorAdoptanteAsync(adoptanteId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener contrato de adopción
        /// </summary>
        [HttpGet("adopciones/{adopcionId}/contrato")]
        public async Task<ActionResult<ApiResponse<ContratoAdopcionDto>>> ObtenerContrato(int adopcionId)
        {
            var result = await _legalizacionService.ObtenerContratoAsync(adopcionId);
            
            if (result.Success)
                return Ok(result);
            
            if (result.Message.Contains("no encontrado"))
                return NotFound(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Crear un nuevo contrato de adopción
        /// </summary>
        [HttpPost("contratos")]
        public async Task<ActionResult<ApiResponse<ContratoAdopcionDto>>> CrearContrato([FromBody] CreateContratoAdopcionDto contratoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<ContratoAdopcionDto>.ErrorResult("Datos del contrato inválidos"));
            }

            var result = await _legalizacionService.CrearContratoAsync(contratoDto);
            
            if (result.Success)
                return Created($"api/legalizacion/adopciones/{contratoDto.AdopcionId}/contrato", result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Generar certificado de propiedad para una adopción
        /// </summary>
        [HttpPost("adopciones/{adopcionId}/certificado")]
        public async Task<ActionResult<ApiResponse<CertificadoPropiedadDto>>> GenerarCertificado(int adopcionId)
        {
            var result = await _legalizacionService.GenerarCertificadoAsync(adopcionId);
            
            if (result.Success)
                return Created($"api/legalizacion/adopciones/{adopcionId}/certificado", result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener seguimientos de una adopción
        /// </summary>
        [HttpGet("adopciones/{adopcionId}/seguimientos")]
        public async Task<ActionResult<ApiResponse<List<SeguimientoAdopcionDto>>>> ObtenerSeguimientos(int adopcionId)
        {
            var result = await _legalizacionService.ObtenerSeguimientosAsync(adopcionId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Subir documentación de una mascota
        /// </summary>
        [HttpPost("mascotas/{mascotaId}/documentacion")]
        public async Task<ActionResult<ApiResponse<DocumentacionMascotaDto>>> SubirDocumentacion(int mascotaId, [FromBody] DocumentacionMascotaDto documentacionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<DocumentacionMascotaDto>.ErrorResult("Datos de documentación inválidos"));
            }

            var result = await _legalizacionService.SubirDocumentacionMascotaAsync(mascotaId, documentacionDto);
            
            if (result.Success)
                return Created($"api/legalizacion/mascotas/{mascotaId}/documentacion", result);
            
            return BadRequest(result);
        }

        /// <summary>
        /// Obtener documentación de una mascota
        /// </summary>
        [HttpGet("mascotas/{mascotaId}/documentacion")]
        public async Task<ActionResult<ApiResponse<List<DocumentacionMascotaDto>>>> ObtenerDocumentacion(int mascotaId)
        {
            var result = await _legalizacionService.ObtenerDocumentacionMascotaAsync(mascotaId);
            
            if (result.Success)
                return Ok(result);
            
            return BadRequest(result);
        }
    }
}

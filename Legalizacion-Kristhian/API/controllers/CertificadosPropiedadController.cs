// API/Controllers/CertificadosPropiedadController.cs
using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificadosPropiedadController : ControllerBase
    {
        private readonly ICertificadoPropiedadService _certificadoService;

        public CertificadosPropiedadController(ICertificadoPropiedadService certificadoService)
        {
            _certificadoService = certificadoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var certificados = await _certificadoService.ObtenerTodosLosCertificadosAsync();
            return Ok(certificados);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var certificado = await _certificadoService.ObtenerCertificadoPorIdAsync(id);
            if (certificado == null)
            {
                return NotFound();
            }
            return Ok(certificado);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CertificadoPropiedad nuevoCertificado)
        {
            var certificadoCreado = await _certificadoService.CrearCertificadoAsync(nuevoCertificado);
            // CAMBIO AQUÍ: Se usa Id para generar la URL de respuesta.
            return CreatedAtAction(nameof(GetById), new { id = certificadoCreado.Id }, certificadoCreado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CertificadoPropiedad certificadoActualizado)
        {
            // CAMBIO AQUÍ: Se compara el id de la ruta con CertificadoId.
            if (id != certificadoActualizado.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del objeto.");
            }
            
            var result = await _certificadoService.ActualizarCertificadoAsync(certificadoActualizado);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _certificadoService.EliminarCertificadoAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
// API/Controllers/DocumentacionMascotasController.cs
using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentacionMascotasController : ControllerBase
    {
        private readonly IDocumentacionMascotaService _documentoService;

        public DocumentacionMascotasController(IDocumentacionMascotaService documentoService)
        {
            _documentoService = documentoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var documentos = await _documentoService.ObtenerTodosLosDocumentosAsync();
            return Ok(documentos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var documento = await _documentoService.ObtenerDocumentoPorIdAsync(id);
            if (documento == null)
            {
                return NotFound();
            }
            return Ok(documento);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DocumentacionMascota nuevoDocumento)
        {
            var documentoCreado = await _documentoService.CrearDocumentoAsync(nuevoDocumento);
                        return CreatedAtAction(nameof(GetById), new { id = documentoCreado.Id }, documentoCreado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DocumentacionMascota documentoActualizado)
        {
            if (id != documentoActualizado.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del objeto.");
            }
            
            var result = await _documentoService.ActualizarDocumentoAsync(documentoActualizado);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _documentoService.EliminarDocumentoAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
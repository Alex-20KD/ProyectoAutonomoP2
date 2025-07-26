// API/Controllers/ContratosAdopcionController.cs
using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContratosAdopcionController : ControllerBase
    {
        private readonly IContratoAdopcionService _contratoService;

        public ContratosAdopcionController(IContratoAdopcionService contratoService)
        {
            _contratoService = contratoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contratos = await _contratoService.ObtenerTodosLosContratosAsync();
            return Ok(contratos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var contrato = await _contratoService.ObtenerContratoPorIdAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }
            return Ok(contrato);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContratoAdopcion nuevoContrato)
        {
            var contratoCreado = await _contratoService.CrearContratoAsync(nuevoContrato);
            return CreatedAtAction(nameof(GetById), new { id = contratoCreado.Id }, contratoCreado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ContratoAdopcion contratoActualizado)
        {
            if (id != contratoActualizado.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del objeto.");
            }
            
            var result = await _contratoService.ActualizarContratoAsync(contratoActualizado);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _contratoService.EliminarContratoAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
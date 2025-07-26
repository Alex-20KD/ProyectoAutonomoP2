// API/Controllers/SeguimientosAdopcionController.cs
using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeguimientosAdopcionController : ControllerBase
    {
        private readonly ISeguimientoAdopcionService _seguimientoService;

        public SeguimientosAdopcionController(ISeguimientoAdopcionService seguimientoService)
        {
            _seguimientoService = seguimientoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var seguimientos = await _seguimientoService.ObtenerTodosLosSeguimientosAsync();
            return Ok(seguimientos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var seguimiento = await _seguimientoService.ObtenerSeguimientoPorIdAsync(id);
            if (seguimiento == null)
            {
                return NotFound();
            }
            return Ok(seguimiento);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SeguimientoAdopcion nuevoSeguimiento)
        {
            var seguimientoCreado = await _seguimientoService.CrearSeguimientoAsync(nuevoSeguimiento);
            return CreatedAtAction(nameof(GetById), new { id = seguimientoCreado.Id }, seguimientoCreado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SeguimientoAdopcion seguimientoActualizado)
        {
            if (id != seguimientoActualizado.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del objeto.");
            }
            
            var result = await _seguimientoService.ActualizarSeguimientoAsync(seguimientoActualizado);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _seguimientoService.EliminarSeguimientoAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
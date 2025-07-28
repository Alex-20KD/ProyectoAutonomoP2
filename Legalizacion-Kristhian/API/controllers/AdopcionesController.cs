// API/Controllers/AdopcionesController.cs
using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdopcionesController : ControllerBase
    {
        private readonly IAdopcionService _adopcionService;

        public AdopcionesController(IAdopcionService adopcionService)
        {
            _adopcionService = adopcionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var adopciones = await _adopcionService.ObtenerTodasLasAdopcionesAsync();
            return Ok(adopciones);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var adopcion = await _adopcionService.ObtenerAdopcionPorIdAsync(id);
            if (adopcion == null)
            {
                return NotFound();
            }
            return Ok(adopcion);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAdopcionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var nuevaAdopcion = new Adopcion
            {
                FechaAdopcion = dto.FechaAdopcion,
                Estado = dto.Estado,
                MascotaId = dto.MascotaId,
                AdoptanteId = dto.AdoptanteId
            };

            var adopcionCreada = await _adopcionService.CrearAdopcionAsync(nuevaAdopcion);
            // CAMBIO AQUÍ: Se usa Id para generar la URL de respuesta.
            return CreatedAtAction(nameof(GetById), new { id = adopcionCreada.Id }, adopcionCreada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAdopcionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // CAMBIO AQUÍ: Se compara el id de la ruta con Id.
            if (id != dto.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del objeto.");
            }

            var adopcionActualizada = new Adopcion
            {
                Id = dto.Id,
                FechaAdopcion = dto.FechaAdopcion,
                Estado = dto.Estado,
                MascotaId = dto.MascotaId,
                AdoptanteId = dto.AdoptanteId
            };
            
            var result = await _adopcionService.ActualizarAdopcionAsync(adopcionActualizada);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _adopcionService.EliminarAdopcionAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
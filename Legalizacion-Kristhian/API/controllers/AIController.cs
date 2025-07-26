// API/Controllers/AIController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly ISeguimientoAdopcionService _seguimientoService;
    private readonly IAIService _aiService;

    public AIController(ISeguimientoAdopcionService s, IAIService ai)
    {
        _seguimientoService = s;
        _aiService = ai;
    }

    [HttpPost("analizar-seguimiento/{seguimientoId}")]
    public async Task<IActionResult> Analizar(int seguimientoId)
    {
        var seguimiento = await _seguimientoService.ObtenerSeguimientoPorIdAsync(seguimientoId);
        if (seguimiento == null || string.IsNullOrWhiteSpace(seguimiento.Observaciones))
        {
            return BadRequest("No se encontraron observaciones para analizar.");
        }

        var analisis = await _aiService.AnalizarBienestarAnimalAsync(seguimiento.Observaciones);
        return Ok(new { Analisis = analisis });
    }
}
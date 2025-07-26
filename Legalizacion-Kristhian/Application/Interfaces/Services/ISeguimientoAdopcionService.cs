// Application/Interfaces/Services/ISeguimientoAdopcionService.cs
using Core.Entities;

namespace Application.Interfaces.Services
{
    public interface ISeguimientoAdopcionService
    {
        Task<SeguimientoAdopcion> CrearSeguimientoAsync(SeguimientoAdopcion nuevoSeguimiento);
        Task<SeguimientoAdopcion> ObtenerSeguimientoPorIdAsync(int id);
        Task<IEnumerable<SeguimientoAdopcion>> ObtenerTodosLosSeguimientosAsync();
        Task<bool> ActualizarSeguimientoAsync(SeguimientoAdopcion seguimientoAActualizar);
        Task<bool> EliminarSeguimientoAsync(int id);
    }
}
// Application/Interfaces/Services/IAdopcionService.cs
using Core.Entities;

namespace Application.Interfaces.Services
{
    public interface IAdopcionService
    {
        Task<Adopcion> CrearAdopcionAsync(Adopcion nuevaAdopcion);
        Task<Adopcion> ObtenerAdopcionPorIdAsync(int id);
        Task<IEnumerable<Adopcion>> ObtenerTodasLasAdopcionesAsync();
        Task<bool> ActualizarAdopcionAsync(Adopcion adopcionAActualizar);
        Task<bool> EliminarAdopcionAsync(int id);
    }
}
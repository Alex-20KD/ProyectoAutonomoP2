// Application/Interfaces/Services/IContratoAdopcionService.cs
using Core.Entities;

namespace Application.Interfaces.Services
{
    public interface IContratoAdopcionService
    {
        Task<ContratoAdopcion> CrearContratoAsync(ContratoAdopcion nuevoContrato);
        Task<ContratoAdopcion> ObtenerContratoPorIdAsync(int id);
        Task<IEnumerable<ContratoAdopcion>> ObtenerTodosLosContratosAsync();
        Task<bool> ActualizarContratoAsync(ContratoAdopcion contratoAActualizar);
        Task<bool> EliminarContratoAsync(int id);
    }
}
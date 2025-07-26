// Application/Services/SeguimientoAdopcionService.cs
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;

namespace Application.Services
{
    public class SeguimientoAdopcionService : ISeguimientoAdopcionService
    {
        private readonly ISeguimientoAdopcionRepository _seguimientoRepository;

        public SeguimientoAdopcionService(ISeguimientoAdopcionRepository seguimientoRepository)
        {
            _seguimientoRepository = seguimientoRepository;
        }

        public async Task<SeguimientoAdopcion> CrearSeguimientoAsync(SeguimientoAdopcion nuevoSeguimiento)
        {
            await _seguimientoRepository.AddAsync(nuevoSeguimiento);
            await _seguimientoRepository.SaveChangesAsync();
            return nuevoSeguimiento;
        }

        public async Task<SeguimientoAdopcion> ObtenerSeguimientoPorIdAsync(int id)
        {
            return await _seguimientoRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<SeguimientoAdopcion>> ObtenerTodosLosSeguimientosAsync()
        {
            return await _seguimientoRepository.GetAllAsync();
        }

        public async Task<bool> ActualizarSeguimientoAsync(SeguimientoAdopcion seguimientoAActualizar)
        {
            _seguimientoRepository.Update(seguimientoAActualizar);
            var updated = await _seguimientoRepository.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EliminarSeguimientoAsync(int id)
        {
            var seguimiento = await _seguimientoRepository.GetByIdAsync(id);
            if (seguimiento == null) return false;

            _seguimientoRepository.Delete(seguimiento);
            var deleted = await _seguimientoRepository.SaveChangesAsync();
            return deleted > 0;
        }
    }
}
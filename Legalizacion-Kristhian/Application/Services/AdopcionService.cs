// Application/Services/AdopcionService.cs
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;

namespace Application.Services
{
    public class AdopcionService : IAdopcionService
    {
        private readonly IAdopcionRepository _adopcionRepository;

        public AdopcionService(IAdopcionRepository adopcionRepository)
        {
            _adopcionRepository = adopcionRepository;
        }

        public async Task<Adopcion> CrearAdopcionAsync(Adopcion nuevaAdopcion)
        {
            await _adopcionRepository.AddAsync(nuevaAdopcion);
            await _adopcionRepository.SaveChangesAsync();
            return nuevaAdopcion;
        }

        public async Task<Adopcion> ObtenerAdopcionPorIdAsync(int id)
        {
            return await _adopcionRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Adopcion>> ObtenerTodasLasAdopcionesAsync()
        {
            return await _adopcionRepository.GetAllAsync();
        }

        public async Task<bool> ActualizarAdopcionAsync(Adopcion adopcionAActualizar)
        {
            _adopcionRepository.Update(adopcionAActualizar);
            var updated = await _adopcionRepository.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EliminarAdopcionAsync(int id)
        {
            var adopcion = await _adopcionRepository.GetByIdAsync(id);
            if (adopcion == null) return false;

            _adopcionRepository.Delete(adopcion);
            var deleted = await _adopcionRepository.SaveChangesAsync();
            return deleted > 0;
        }
    }
}
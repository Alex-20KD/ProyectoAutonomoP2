// Application/Services/ContratoAdopcionService.cs
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;

namespace Application.Services
{
    public class ContratoAdopcionService : IContratoAdopcionService
    {
        private readonly IContratoAdopcionRepository _contratoRepository;

        public ContratoAdopcionService(IContratoAdopcionRepository contratoRepository)
        {
            _contratoRepository = contratoRepository;
        }

        public async Task<ContratoAdopcion> CrearContratoAsync(ContratoAdopcion nuevoContrato)
        {
            await _contratoRepository.AddAsync(nuevoContrato);
            await _contratoRepository.SaveChangesAsync();
            return nuevoContrato;
        }

        public async Task<ContratoAdopcion> ObtenerContratoPorIdAsync(int id)
        {
            return await _contratoRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<ContratoAdopcion>> ObtenerTodosLosContratosAsync()
        {
            return await _contratoRepository.GetAllAsync();
        }

        public async Task<bool> ActualizarContratoAsync(ContratoAdopcion contratoAActualizar)
        {
            _contratoRepository.Update(contratoAActualizar);
            var updated = await _contratoRepository.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EliminarContratoAsync(int id)
        {
            var contrato = await _contratoRepository.GetByIdAsync(id);
            if (contrato == null) return false;

            _contratoRepository.Delete(contrato);
            var deleted = await _contratoRepository.SaveChangesAsync();
            return deleted > 0;
        }
    }
}
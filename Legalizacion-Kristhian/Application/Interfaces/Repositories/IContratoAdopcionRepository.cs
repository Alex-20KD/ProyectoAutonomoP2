// Application/Interfaces/Repositories/IContratoAdopcionRepository.cs
using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IContratoAdopcionRepository
    {
        Task<ContratoAdopcion> GetByIdAsync(int id);
        Task<IEnumerable<ContratoAdopcion>> GetAllAsync();
        Task AddAsync(ContratoAdopcion contrato);
        void Update(ContratoAdopcion contrato);
        void Delete(ContratoAdopcion contrato);
        Task<int> SaveChangesAsync();
    }
}
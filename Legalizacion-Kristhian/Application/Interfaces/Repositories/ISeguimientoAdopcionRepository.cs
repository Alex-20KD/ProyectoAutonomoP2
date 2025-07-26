// Application/Interfaces/Repositories/ISeguimientoAdopcionRepository.cs
using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface ISeguimientoAdopcionRepository
    {
        Task<SeguimientoAdopcion> GetByIdAsync(int id);
        Task<IEnumerable<SeguimientoAdopcion>> GetAllAsync();
        Task AddAsync(SeguimientoAdopcion seguimiento);
        void Update(SeguimientoAdopcion seguimiento);
        void Delete(SeguimientoAdopcion seguimiento);
        Task<int> SaveChangesAsync();
    }
}
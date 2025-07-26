// Application/Interfaces/Repositories/IAdopcionRepository.cs
using Core.Entities; // Asegúrate de tener la referencia al proyecto Core

namespace Application.Interfaces.Repositories
{
    public interface IAdopcionRepository
    {
        Task<Adopcion> GetByIdAsync(int id);
        Task<IEnumerable<Adopcion>> GetAllAsync();
        Task AddAsync(Adopcion adopcion);
        void Update(Adopcion adopcion);
        void Delete(Adopcion adopcion);
        Task<int> SaveChangesAsync(); // Para confirmar los cambios en la BD
    }
}
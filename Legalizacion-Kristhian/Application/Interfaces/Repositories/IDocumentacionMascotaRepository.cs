// Application/Interfaces/Repositories/IDocumentacionMascotaRepository.cs
using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IDocumentacionMascotaRepository
    {
        Task<DocumentacionMascota> GetByIdAsync(int id);
        Task<IEnumerable<DocumentacionMascota>> GetAllAsync();
        Task AddAsync(DocumentacionMascota documento);
        void Update(DocumentacionMascota documento);
        void Delete(DocumentacionMascota documento);
        Task<int> SaveChangesAsync();
    }
}
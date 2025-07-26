// Application/Interfaces/Repositories/ICertificadoPropiedadRepository.cs
using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface ICertificadoPropiedadRepository
    {
        Task<CertificadoPropiedad> GetByIdAsync(int id);
        Task<IEnumerable<CertificadoPropiedad>> GetAllAsync();
        Task AddAsync(CertificadoPropiedad certificado);
        void Update(CertificadoPropiedad certificado);
        void Delete(CertificadoPropiedad certificado);
        Task<int> SaveChangesAsync();
    }
}
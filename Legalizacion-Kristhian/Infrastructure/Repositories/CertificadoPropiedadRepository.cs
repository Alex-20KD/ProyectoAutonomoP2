// Infrastructure/Repositories/CertificadoPropiedadRepository.cs
using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CertificadoPropiedadRepository : ICertificadoPropiedadRepository
    {
        private readonly AdopcionAnimalDbContext _context;

        public CertificadoPropiedadRepository(AdopcionAnimalDbContext context)
        {
            _context = context;
        }

        public async Task<CertificadoPropiedad> GetByIdAsync(int id)
        {
            return await _context.CertificadosPropiedad.FindAsync(id);
        }

        public async Task<IEnumerable<CertificadoPropiedad>> GetAllAsync()
        {
            return await _context.CertificadosPropiedad.ToListAsync();
        }

        public async Task AddAsync(CertificadoPropiedad certificado)
        {
            await _context.CertificadosPropiedad.AddAsync(certificado);
        }

        public void Update(CertificadoPropiedad certificado)
        {
            _context.CertificadosPropiedad.Update(certificado);
        }

        public void Delete(CertificadoPropiedad certificado)
        {
            _context.CertificadosPropiedad.Remove(certificado);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
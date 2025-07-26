// Infrastructure/Repositories/DocumentacionMascotaRepository.cs
using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class DocumentacionMascotaRepository : IDocumentacionMascotaRepository
    {
        private readonly AdopcionAnimalDbContext _context;

        public DocumentacionMascotaRepository(AdopcionAnimalDbContext context)
        {
            _context = context;
        }

        public async Task<DocumentacionMascota> GetByIdAsync(int id)
        {
            return await _context.DocumentacionMascotas.FindAsync(id);
        }

        public async Task<IEnumerable<DocumentacionMascota>> GetAllAsync()
        {
            return await _context.DocumentacionMascotas.ToListAsync();
        }

        public async Task AddAsync(DocumentacionMascota documento)
        {
            await _context.DocumentacionMascotas.AddAsync(documento);
        }

        public void Update(DocumentacionMascota documento)
        {
            _context.DocumentacionMascotas.Update(documento);
        }

        public void Delete(DocumentacionMascota documento)
        {
            _context.DocumentacionMascotas.Remove(documento);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
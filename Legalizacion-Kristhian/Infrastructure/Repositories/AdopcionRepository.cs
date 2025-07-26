// Infrastructure/Repositories/AdopcionRepository.cs
using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AdopcionRepository : IAdopcionRepository
    {
        private readonly AdopcionAnimalDbContext _context;

        public AdopcionRepository(AdopcionAnimalDbContext context)
        {
            _context = context;
        }

        public async Task<Adopcion> GetByIdAsync(int id)
        {
            return await _context.Adopciones.FindAsync(id);
        }

        public async Task<IEnumerable<Adopcion>> GetAllAsync()
        {
            return await _context.Adopciones.ToListAsync();
        }

        public async Task AddAsync(Adopcion adopcion)
        {
            await _context.Adopciones.AddAsync(adopcion);
        }

        public void Update(Adopcion adopcion)
        {
            _context.Adopciones.Update(adopcion);
        }

        public void Delete(Adopcion adopcion)
        {
            _context.Adopciones.Remove(adopcion);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}

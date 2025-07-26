// Infrastructure/Repositories/SeguimientoAdopcionRepository.cs
using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SeguimientoAdopcionRepository : ISeguimientoAdopcionRepository
    {
        private readonly AdopcionAnimalDbContext _context;

        public SeguimientoAdopcionRepository(AdopcionAnimalDbContext context)
        {
            _context = context;
        }

        public async Task<SeguimientoAdopcion> GetByIdAsync(int id)
        {
            return await _context.SeguimientosAdopcion.FindAsync(id);
        }

        public async Task<IEnumerable<SeguimientoAdopcion>> GetAllAsync()
        {
            return await _context.SeguimientosAdopcion.ToListAsync();
        }

        public async Task AddAsync(SeguimientoAdopcion seguimiento)
        {
            await _context.SeguimientosAdopcion.AddAsync(seguimiento);
        }

        public void Update(SeguimientoAdopcion seguimiento)
        {
            _context.SeguimientosAdopcion.Update(seguimiento);
        }

        public void Delete(SeguimientoAdopcion seguimiento)
        {
            _context.SeguimientosAdopcion.Remove(seguimiento);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
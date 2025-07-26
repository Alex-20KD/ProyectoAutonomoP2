// Infrastructure/Repositories/ContratoAdopcionRepository.cs
using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ContratoAdopcionRepository : IContratoAdopcionRepository
    {
        private readonly AdopcionAnimalDbContext _context;

        public ContratoAdopcionRepository(AdopcionAnimalDbContext context)
        {
            _context = context;
        }

        public async Task<ContratoAdopcion> GetByIdAsync(int id)
        {
            return await _context.ContratosAdopcion.FindAsync(id);
        }

        public async Task<IEnumerable<ContratoAdopcion>> GetAllAsync()
        {
            return await _context.ContratosAdopcion.ToListAsync();
        }

        public async Task AddAsync(ContratoAdopcion contrato)
        {
            await _context.ContratosAdopcion.AddAsync(contrato);
        }

        public void Update(ContratoAdopcion contrato)
        {
            _context.ContratosAdopcion.Update(contrato);
        }

        public void Delete(ContratoAdopcion contrato)
        {
            _context.ContratosAdopcion.Remove(contrato);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // <-- AÑADIR ESTE
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
public class AdopcionAnimalDbContext : IdentityDbContext <IdentityUser>  {
        // El constructor es necesario para la inyección de dependencias
        public AdopcionAnimalDbContext(DbContextOptions<AdopcionAnimalDbContext> options) : base(options)
        {
            
        }

        // Define un DbSet<> por cada entidad que quieras que sea una tabla en la BD
        public DbSet<Adopcion> Adopciones { get; set; }
        public DbSet<ContratoAdopcion> ContratosAdopcion { get; set; }
        public DbSet<DocumentacionMascota> DocumentacionMascotas { get; set; }
        public DbSet<CertificadoPropiedad> CertificadosPropiedad { get; set; }
        public DbSet<SeguimientoAdopcion> SeguimientosAdopcion { get; set; }

        // (Opcional pero recomendado) Configuración de relaciones con Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relación uno a uno: Adopcion <-> ContratoAdopcion
            modelBuilder.Entity<Adopcion>()
                .HasOne(a => a.ContratoAdopcion)
                .WithOne(c => c.Adopcion)
                .HasForeignKey<ContratoAdopcion>(c => c.AdopcionId);

            // Relación uno a uno: Adopcion <-> CertificadoPropiedad
            modelBuilder.Entity<Adopcion>()
                .HasOne(a => a.CertificadoPropiedad)
                .WithOne(c => c.Adopcion)
                .HasForeignKey<CertificadoPropiedad>(c => c.AdopcionId);
            
            // Relación uno a muchos: Adopcion -> SeguimientoAdopcion
            modelBuilder.Entity<Adopcion>()
                .HasMany(a => a.Seguimientos)
                .WithOne(s => s.Adopcion)
                .HasForeignKey(s => s.AdopcionId);
        }
    }
}
using Microsoft.EntityFrameworkCore;
using GraphQLProject.Models;

namespace GraphQLProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Author> Authors { get; set; } = null!;
        public DbSet<Book> Books { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Book>()
                .HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed initial data
            modelBuilder.Entity<Author>().HasData(
                new Author
                {
                    Id = 1,
                    Name = "Gabriel García Márquez",
                    Bio = "Escritor, novelista, cuentista, guionista, editor y periodista colombiano.",
                    CreatedAt = DateTime.UtcNow
                },
                new Author
                {
                    Id = 2,
                    Name = "Mario Vargas Llosa",
                    Bio = "Escritor, político y periodista peruano que obtuvo la nacionalidad española.",
                    CreatedAt = DateTime.UtcNow
                }
            );

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "Cien años de soledad",
                    Description = "Una obra maestra del realismo mágico.",
                    Price = 25.99m,
                    PublishedDate = new DateTime(1967, 5, 30),
                    AuthorId = 1,
                    CreatedAt = DateTime.UtcNow
                },
                new Book
                {
                    Id = 2,
                    Title = "El amor en los tiempos del cólera",
                    Description = "Una historia de amor que trasciende el tiempo.",
                    Price = 22.50m,
                    PublishedDate = new DateTime(1985, 3, 15),
                    AuthorId = 1,
                    CreatedAt = DateTime.UtcNow
                },
                new Book
                {
                    Id = 3,
                    Title = "La ciudad y los perros",
                    Description = "Primera novela del escritor peruano Mario Vargas Llosa.",
                    Price = 28.75m,
                    PublishedDate = new DateTime(1963, 10, 12),
                    AuthorId = 2,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}

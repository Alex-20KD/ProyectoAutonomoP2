using GraphQLProject.Data;
using GraphQLProject.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQLProject.GraphQL.Queries
{
    public class Query
    {
        // Query para obtener todos los autores
        public async Task<IQueryable<Author>> GetAuthors([Service] ApplicationDbContext context)
        {
            return context.Authors.Include(a => a.Books);
        }

        // Query para obtener un autor por ID
        public async Task<Author?> GetAuthor([Service] ApplicationDbContext context, int id)
        {
            return await context.Authors
                .Include(a => a.Books)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        // Query para obtener todos los libros
        public async Task<IQueryable<Book>> GetBooks([Service] ApplicationDbContext context)
        {
            return context.Books.Include(b => b.Author);
        }

        // Query para obtener un libro por ID
        public async Task<Book?> GetBook([Service] ApplicationDbContext context, int id)
        {
            return await context.Books
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        // Query para buscar libros por título
        public async Task<IQueryable<Book>> SearchBooks([Service] ApplicationDbContext context, string searchTerm)
        {
            return context.Books
                .Include(b => b.Author)
                .Where(b => b.Title.Contains(searchTerm) || b.Description.Contains(searchTerm));
        }

        // Query para obtener libros por autor
        public async Task<IQueryable<Book>> GetBooksByAuthor([Service] ApplicationDbContext context, int authorId)
        {
            return context.Books
                .Include(b => b.Author)
                .Where(b => b.AuthorId == authorId);
        }
    }
}

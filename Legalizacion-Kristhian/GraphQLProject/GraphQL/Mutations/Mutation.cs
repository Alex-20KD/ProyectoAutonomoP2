using GraphQLProject.Data;
using GraphQLProject.Models;
using GraphQLProject.GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using HotChocolate;

namespace GraphQLProject.GraphQL.Mutations
{
    public class Mutation
    {
        // Mutación para agregar un autor
        public async Task<Author> AddAuthor([Service] ApplicationDbContext context, AddAuthorInput input)
        {
            var author = new Author
            {
                Name = input.Name,
                Bio = input.Bio,
                CreatedAt = DateTime.UtcNow
            };

            context.Authors.Add(author);
            await context.SaveChangesAsync();

            return author;
        }

        // Mutación para actualizar un autor
        public async Task<Author?> UpdateAuthor([Service] ApplicationDbContext context, UpdateAuthorInput input)
        {
            var author = await context.Authors.FindAsync(input.Id);
            if (author == null)
            {
                throw new GraphQLException($"Author with ID {input.Id} not found.");
            }

            if (!string.IsNullOrEmpty(input.Name))
                author.Name = input.Name;

            if (input.Bio != null)
                author.Bio = input.Bio;

            await context.SaveChangesAsync();
            return author;
        }

        // Mutación para eliminar un autor
        public async Task<bool> DeleteAuthor([Service] ApplicationDbContext context, int id)
        {
            var author = await context.Authors.FindAsync(id);
            if (author == null)
            {
                return false;
            }

            context.Authors.Remove(author);
            await context.SaveChangesAsync();
            return true;
        }

        // Mutación para agregar un libro
        public async Task<Book> AddBook([Service] ApplicationDbContext context, AddBookInput input)
        {
            // Verificar que el autor existe
            var authorExists = await context.Authors.AnyAsync(a => a.Id == input.AuthorId);
            if (!authorExists)
            {
                throw new GraphQLException($"Author with ID {input.AuthorId} not found.");
            }

            var book = new Book
            {
                Title = input.Title,
                Description = input.Description,
                Price = input.Price,
                PublishedDate = input.PublishedDate,
                AuthorId = input.AuthorId,
                CreatedAt = DateTime.UtcNow
            };

            context.Books.Add(book);
            await context.SaveChangesAsync();

            // Cargar el autor para devolver el libro completo
            await context.Entry(book).Reference(b => b.Author).LoadAsync();
            return book;
        }

        // Mutación para actualizar un libro
        public async Task<Book?> UpdateBook([Service] ApplicationDbContext context, UpdateBookInput input)
        {
            var book = await context.Books.Include(b => b.Author).FirstOrDefaultAsync(b => b.Id == input.Id);
            if (book == null)
            {
                throw new GraphQLException($"Book with ID {input.Id} not found.");
            }

            if (!string.IsNullOrEmpty(input.Title))
                book.Title = input.Title;

            if (input.Description != null)
                book.Description = input.Description;

            if (input.Price.HasValue)
                book.Price = input.Price.Value;

            if (input.PublishedDate.HasValue)
                book.PublishedDate = input.PublishedDate.Value;

            if (input.AuthorId.HasValue)
            {
                var authorExists = await context.Authors.AnyAsync(a => a.Id == input.AuthorId.Value);
                if (!authorExists)
                {
                    throw new GraphQLException($"Author with ID {input.AuthorId} not found.");
                }
                book.AuthorId = input.AuthorId.Value;
            }

            await context.SaveChangesAsync();
            return book;
        }

        // Mutación para eliminar un libro
        public async Task<bool> DeleteBook([Service] ApplicationDbContext context, int id)
        {
            var book = await context.Books.FindAsync(id);
            if (book == null)
            {
                return false;
            }

            context.Books.Remove(book);
            await context.SaveChangesAsync();
            return true;
        }
    }
}

# Instrucciones de Copilot para el Proyecto GraphQL

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Descripción del Proyecto

Este es un proyecto de GraphQL en C# utilizando:
- **.NET 8.0**: Framework principal
- **Hot Chocolate 12.22.0**: Biblioteca de GraphQL para .NET
- **Entity Framework Core 8.0**: ORM para acceso a datos
- **SQLite**: Base de datos ligera para desarrollo

## Estructura del Proyecto

```
GraphQLProject/
├── Models/
│   ├── Author.cs          # Modelo de Autor
│   └── Book.cs            # Modelo de Libro
├── Data/
│   └── ApplicationDbContext.cs  # Contexto de Entity Framework
├── GraphQL/
│   ├── Queries/
│   │   └── Query.cs       # Queries de GraphQL
│   ├── Mutations/
│   │   └── Mutation.cs    # Mutaciones de GraphQL
│   └── Types/
│       └── InputTypes.cs  # Tipos de entrada para mutaciones
└── Program.cs             # Configuración principal de la aplicación
```

## Funcionalidades Implementadas

### Queries Disponibles
- `authors`: Obtener todos los autores con sus libros
- `author(id: Int!)`: Obtener un autor específico por ID
- `books`: Obtener todos los libros con información del autor
- `book(id: Int!)`: Obtener un libro específico por ID
- `searchBooks(searchTerm: String!)`: Buscar libros por título o descripción
- `booksByAuthor(authorId: Int!)`: Obtener todos los libros de un autor específico

### Mutaciones Disponibles
- `addAuthor(input: AddAuthorInput!)`: Agregar un nuevo autor
- `updateAuthor(input: UpdateAuthorInput!)`: Actualizar un autor existente
- `deleteAuthor(id: Int!)`: Eliminar un autor (y sus libros en cascada)
- `addBook(input: AddBookInput!)`: Agregar un nuevo libro
- `updateBook(input: UpdateBookInput!)`: Actualizar un libro existente
- `deleteBook(id: Int!)`: Eliminar un libro

## Convenciones de Código

- Utilizar **async/await** para operaciones de base de datos cuando sea necesario
- Los métodos que retornan IQueryable no necesitan ser async
- Usar **Data Annotations** para validación de modelos
- Implementar manejo de errores con **GraphQLException**
- Seguir las convenciones de nomenclatura de C#: PascalCase para clases y métodos, camelCase para parámetros

## Configuración de Base de Datos

- La base de datos SQLite se crea automáticamente en `GraphQLProject.db`
- Los datos iniciales incluyen 2 autores y 3 libros de ejemplo
- Las migraciones se aplican automáticamente en desarrollo

## Endpoints

- **GraphQL Playground**: `http://localhost:5233/graphql`
- **API GraphQL**: `http://localhost:5233/graphql` (POST)

## Ejemplos de Uso

### Query de ejemplo:
```graphql
query {
  authors {
    id
    name
    bio
    books {
      id
      title
      price
    }
  }
}
```

### Mutación de ejemplo:
```graphql
mutation {
  addBook(input: {
    title: "Nuevo Libro"
    description: "Descripción del libro"
    price: 19.99
    publishedDate: "2023-01-01"
    authorId: 1
  }) {
    id
    title
    author {
      name
    }
  }
}
```

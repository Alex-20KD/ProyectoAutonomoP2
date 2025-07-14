# Proyecto GraphQL en C#

Un proyecto completo de GraphQL construido con C# y .NET 8, utilizando Hot Chocolate como servidor GraphQL y Entity Framework Core con SQLite como base de datos.

## 🚀 Características

- **GraphQL Server** con Hot Chocolate 12.22.0
- **Entity Framework Core** para acceso a datos
- **SQLite** como base de datos ligera
- **Queries y Mutations** completas para gestión de autores y libros
- **Seeding automático** de datos iniciales
- **Validación de entrada** con Data Annotations
- **Manejo de errores** integrado
- **CORS habilitado** para desarrollo frontend

## 📋 Requisitos Previos

- .NET 8.0 SDK
- Visual Studio Code (recomendado)
- Extensión C# para VS Code

## 🛠️ Instalación y Configuración

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd GraphQLProject
   ```

2. **Restaurar dependencias**
   ```bash
   dotnet restore
   ```

3. **Ejecutar el proyecto**
   ```bash
   dotnet run
   ```

4. **Acceder al GraphQL Playground**
   
   Abre tu navegador y ve a: `http://localhost:5233/graphql`

## 🗂️ Estructura del Proyecto

```
GraphQLProject/
├── Models/
│   ├── Author.cs              # Modelo de datos del Autor
│   └── Book.cs                # Modelo de datos del Libro
├── Data/
│   └── ApplicationDbContext.cs # Contexto de Entity Framework
├── GraphQL/
│   ├── Queries/
│   │   └── Query.cs           # Definición de queries GraphQL
│   ├── Mutations/
│   │   └── Mutation.cs        # Definición de mutaciones GraphQL
│   └── Types/
│       └── InputTypes.cs      # Tipos de entrada para mutaciones
├── Program.cs                 # Configuración de la aplicación
├── appsettings.json          # Configuración de la aplicación
└── README.md                 # Este archivo
```

## 📊 Modelo de Datos

### Author (Autor)
- `Id` (int): Identificador único
- `Name` (string): Nombre del autor
- `Bio` (string): Biografía del autor
- `CreatedAt` (DateTime): Fecha de creación
- `Books` (ICollection<Book>): Libros del autor

### Book (Libro)
- `Id` (int): Identificador único
- `Title` (string): Título del libro
- `Description` (string): Descripción del libro
- `Price` (decimal): Precio del libro
- `PublishedDate` (DateTime): Fecha de publicación
- `CreatedAt` (DateTime): Fecha de creación
- `AuthorId` (int): ID del autor (clave foránea)
- `Author` (Author): Autor del libro

## 🔍 Queries Disponibles

### Obtener todos los autores
```graphql
query {
  authors {
    id
    name
    bio
    createdAt
    books {
      id
      title
      price
      publishedDate
    }
  }
}
```

### Obtener un autor específico
```graphql
query {
  author(id: 1) {
    id
    name
    bio
    books {
      id
      title
      description
      price
    }
  }
}
```

### Obtener todos los libros
```graphql
query {
  books {
    id
    title
    description
    price
    publishedDate
    author {
      id
      name
    }
  }
}
```

### Buscar libros por término
```graphql
query {
  searchBooks(searchTerm: "amor") {
    id
    title
    description
    price
    author {
      name
    }
  }
}
```

### Obtener libros por autor
```graphql
query {
  booksByAuthor(authorId: 1) {
    id
    title
    description
    price
    publishedDate
  }
}
```

## ✏️ Mutaciones Disponibles

### Agregar un nuevo autor
```graphql
mutation {
  addAuthor(input: {
    name: "Isabel Allende"
    bio: "Escritora chilena, una de las novelistas de mayor reconocimiento mundial."
  }) {
    id
    name
    bio
    createdAt
  }
}
```

### Actualizar un autor
```graphql
mutation {
  updateAuthor(input: {
    id: 1
    name: "Gabriel García Márquez (actualizado)"
    bio: "Escritor, novelista, cuentista, guionista, editor y periodista colombiano. Premio Nobel de Literatura 1982."
  }) {
    id
    name
    bio
  }
}
```

### Eliminar un autor
```graphql
mutation {
  deleteAuthor(id: 3)
}
```

### Agregar un nuevo libro
```graphql
mutation {
  addBook(input: {
    title: "La Casa de los Espíritus"
    description: "Primera novela de Isabel Allende"
    price: 24.99
    publishedDate: "1982-01-01"
    authorId: 1
  }) {
    id
    title
    description
    price
    publishedDate
    author {
      name
    }
  }
}
```

### Actualizar un libro
```graphql
mutation {
  updateBook(input: {
    id: 1
    title: "Cien años de soledad (Edición Especial)"
    price: 29.99
  }) {
    id
    title
    price
    author {
      name
    }
  }
}
```

### Eliminar un libro
```graphql
mutation {
  deleteBook(id: 3)
}
```

## 🎯 Datos Iniciales

El proyecto incluye datos de ejemplo:

**Autores:**
1. Gabriel García Márquez
2. Mario Vargas Llosa

**Libros:**
1. "Cien años de soledad" - Gabriel García Márquez
2. "El amor en los tiempos del cólera" - Gabriel García Márquez
3. "La ciudad y los perros" - Mario Vargas Llosa

## 🛠️ Tecnologías Utilizadas

- **C# / .NET 8.0**: Lenguaje y framework principal
- **Hot Chocolate 12.22.0**: Servidor GraphQL para .NET
- **Entity Framework Core 8.0**: ORM para acceso a datos
- **SQLite**: Base de datos embebida
- **ASP.NET Core**: Framework web

## 🔧 Configuración Avanzada

### Cadena de Conexión
La cadena de conexión se encuentra en `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=GraphQLProject.db"
  }
}
```

### CORS
El proyecto tiene CORS habilitado para permitir requests desde cualquier origen en desarrollo.

### Logging
Entity Framework está configurado para mostrar los comandos SQL ejecutados en desarrollo.

## 🐛 Solución de Problemas

### Error de compilación
Si encuentras errores de compilación, asegúrate de:
1. Tener .NET 8.0 SDK instalado
2. Ejecutar `dotnet restore` para restaurar dependencias
3. Verificar que todas las referencias de paquetes están correctas

### Base de datos no se crea
Si la base de datos no se crea automáticamente:
1. Verifica que el proyecto se ejecute en modo Development
2. Asegúrate de que tienes permisos de escritura en el directorio del proyecto
3. Revisa los logs de Entity Framework para errores específicos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 📞 Soporte

Si tienes preguntas o problemas:
1. Revisa la documentación de [Hot Chocolate](https://chillicream.com/docs/hotchocolate)
2. Consulta la documentación de [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
3. Abre un issue en el repositorio

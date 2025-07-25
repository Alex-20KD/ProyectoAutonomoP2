📦 Módulo Multimedia - Backend (Laravel)
📌 Descripción General
Este módulo forma parte del sistema original desarrollado en el primer parcial, y ha sido adaptado y extendido en el segundo parcial para formar parte de una arquitectura distribuida basada en microservicios.

El objetivo de este módulo es gestionar los contenidos multimedia del sistema, permitiendo asociar recursos como imágenes, videos, documentos, etc., a publicaciones (posts). El módulo está desarrollado con Laravel (PHP) e implementa un CRUD completo para todas sus entidades.

⚙️ Funcionalidades Implementadas
✅ Gestión de Posts: Creación, edición, visualización y eliminación.

✅ Administración de Recursos multimedia asociados a posts (imágenes, videos, documentos).

✅ Tipado de recursos mediante ResourceTypes (por ejemplo: imagen, video, PDF).

✅ Etiquetado de publicaciones con Tags.

✅ Gestión de Comentarios sobre los posts.

✅ Relaciones entre entidades correctamente mapeadas y funcionales.

🧱 Entidades Principales
Entidad	         Descripción
Post	         Publicación principal que puede contener múltiples recursos y comentarios.
Resource	     Archivo multimedia asociado a un post.
ResourceType	 Define el tipo del recurso (imagen, video, audio, documento, etc.).
Comment          Comentarios realizados sobre un post.
Tag	             Etiquetas que se pueden asociar a uno o varios posts.

🔁 Relaciones
Post tiene muchos Resource, Comment y muchos a muchos con Tag.

Resource pertenece a Post y a un ResourceType.

Tag se relaciona muchos a muchos con Post.

Comment pertenece a un Post

🔌 Endpoints REST disponibles
Todos los endpoints están registrados mediante Route::apiResource() en el archivo modulo-multimedia\routes\api.php.

Ejemplo de endpoints:

GET    /api/posts
POST   /api/resources
PUT    /api/comments/{id}
DELETE /api/tags/{id}

🧪 Pruebas y Verificación
Se han probado manualmente todos los métodos de cada entidad mediante Postman, incluyendo:

Creación (POST)

Listado (GET)

Actualización (PUT)

Eliminación (DELETE)

Los datos se guardan correctamente en la base de datos, y las relaciones entre tablas funcionan como se espera.

🧩 Rol dentro del sistema distribuido
Este módulo representa uno de los microservicios del sistema. Será consumido por el API Gateway GraphQL, y en próximas fases se conectará con el servicio de WebSockets para emitir notificaciones en tiempo real (por ejemplo, cuando se cree un nuevo post o comentario).



---

📡 Integración GraphQL - Módulo Multimedia

Este módulo expone sus entidades a través de una API GraphQL utilizando el paquete Lighthouse. Todas las operaciones CRUD se encuentran habilitadas y probadas mediante el Playground de GraphQL.


---

🚀 Acceso al Playground

Para probar las consultas y mutaciones de GraphQL:

1. Asegúrate de que el servidor esté en ejecución:

php artisan serve
(asegurate de tener conectada tu base de datos, en mi caso es phpMyAdmin por lo cual debo hacerlo de manera manual desde xampp)

2. Abre el navegador y accede a:

http://localhost:8000/graphql-playground


📋 Entidades disponibles

El esquema expone las siguientes entidades:

Post

Resource

ResourceType

Tag

Comment

🔍 Consultas (Query)

Puedes obtener todos los registros o uno por ID. Ejemplo:

query {
  posts {
    id
    title
    content
  }

  post(id: 1) {
    id
    title
    content
  }
}


---

✏️ Mutaciones (Mutation)

📌 Crear

mutation {
  createPost(input: {
    title: "Mi primer post"
    content: "Contenido interesante"
  }) {
    id
    title
  }
}

📝 Actualizar

mutation {
  updatePost(id: 1, input: {
    title: "Post actualizado"
    content: "Nuevo contenido"
  }) {
    id
    title
  }
}

🗑️ Eliminar

mutation {
  deletePost(id: 1) {
    id
  }
}

> Puedes hacer lo mismo para Resource, ResourceType, Tag y Comment, cambiando el nombre del tipo y los campos correspondientes.




---

🧪 Recomendaciones

Usa el Playground para experimentar con los tipos y verificar las respuestas en tiempo real.

Revisa el archivo graphql/schema.graphql para ver la estructura completa del esquema.

Modulo creado por :Carlos Alberto Delgado Campuzano , 5to "A"
Aplicaciones para el Servidor Web 
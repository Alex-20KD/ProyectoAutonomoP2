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

Modulo creado por :Carlos Alberto Delgado Campuzano , 5to "A"
Aplicaciones para el Servidor Web 
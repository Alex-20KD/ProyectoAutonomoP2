# Proyecto Mascotas - Backend + GraphQL Gateway

Este proyecto incluye:
- **API Java Spring Boot** para gestión de mascotas, vacunas, dietas, alergias e historiales médicos.
- **Base de datos Postgres** en Docker.
- **Gateway GraphQL** en Node.js (Express) que reenvía peticiones a la API Java.

## Requisitos
- Docker y Docker Compose instalados
- (Opcional) Maven para desarrollo local de la API Java

---

## Estructura del proyecto

```
proyecto 2p/
├── mascotas/            # Proyecto Java Spring Boot
├── postgres/            # Configuración de base de datos
├── graphql-gateway/     # Gateway Express para GraphQL
├── docker-compose.yml   # Orquestación de servicios
```

---

## Levantar todo el proyecto

1. **Empaqueta la aplicación Java**

   Desde la carpeta `mascotas`:
   ```sh
   ./mvnw clean package
   ```
   (Asegúrate de que se genera el JAR en `mascotas/target/`)

2. **Levanta todos los servicios con Docker Compose**

   Desde la raíz del proyecto:
   ```sh
   docker-compose up --build
   ```
   Esto levantará:
   - Base de datos Postgres
   - API Java (Spring Boot)
   - Gateway GraphQL (Express)

3. **Verifica que los servicios están arriba**

   - API Java: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) (para endpoints REST)
   - Gateway GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## Probar la API GraphQL

Usa Postman, Insomnia, Altair, o cualquier cliente GraphQL para hacer peticiones POST a:
```
http://localhost:4000/graphql
```

Ejemplo de query:
```graphql
query {
  hello
}
```

Ejemplo de mutation:
```graphql
mutation {
  crearMascota(nombre: "Firulais", especie: "Perro") {
    id
    nombre
  }
}
```

---

## Notas
- El endpoint `/graphql` **solo acepta POST**.
- Si necesitas limpiar la base de datos, borra la carpeta `./postgres/postgres` antes de levantar los servicios.
- Si cambias el código Java o del gateway, vuelve a ejecutar `docker-compose build`.

---

## Troubleshooting
- Si ves errores de conexión entre servicios, asegúrate de que todos los contenedores están en la misma red de Docker Compose.
- Si el gateway muestra error 400 al acceder por navegador, prueba con POST desde un cliente GraphQL.
- Para logs detallados:
  ```sh
  docker-compose logs mascotas-api
  docker-compose logs graphql-gateway
  docker-compose logs postgres-db
  ``` 
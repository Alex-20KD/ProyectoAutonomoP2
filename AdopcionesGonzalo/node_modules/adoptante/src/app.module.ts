// adoptante/src/app.module.ts (Ejemplo para Adoptante)

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptanteModule } from './adoptante/adoptante.module'; // O el nombre de tu módulo de feature
// Importa aquí tus entidades que usará este microservicio
import { Adoptante } from './adoptante/entities/adoptante.entity'; // O la ruta correcta a tu entidad

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // O 'mysql', 'postgres', etc.
      database: './db/adoptantes.sqlite', // Ruta a la base de datos para este microservicio
      entities: [Adoptante], // ¡Importante: lista solo las entidades de ESTE microservicio!
      synchronize: true, // ¡Solo para desarrollo! No usar en producción.
      autoLoadEntities: true, // Opcional, pero útil si tienes muchas entidades
    }),
    AdoptanteModule, // Asegúrate de que el módulo de tu entidad esté importado
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
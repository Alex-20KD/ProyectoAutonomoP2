import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// --- Importa tus módulos de cada funcionalidad ---
import { AdoptanteModule } from './adoptante/adoptante.module';
import { HistorialAdopcionesModule } from './historial_adopciones/historial_adopciones.module'; // Asegúrate que el nombre del módulo sea correcto
import { MascotaModule } from './mascota/mascota.module';
import { SolicitudAdopcionModule } from './solicitud_adopcion/solicitud_adopcion.module'; // Agrega esta
import { AcuerdoAdopcionModule } from './acuerdo_adopcion/acuerdo_adopcion.module';     // Agrega esta
import { VisitaDomiciliariaModule } from './visita_domiciliaria/visita_domiciliaria.module'; // Agrega esta


@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno (si las usas para la DB)
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo de base de datos
      database: 'db.sqlite', // Nombre del archivo de la base de datos (se creará en la raíz del proyecto)
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Solo para desarrollo! Sincroniza el esquema de la BD con las entidades.
                         // En producción, es altamente recomendable usar migraciones.
      logging: true, // Opcional: Para ver los logs de TypeORM en consola (útil para depuración)
    }),
    // Tus módulos de funcionalidades
    AdoptanteModule,
    HistorialAdopcionesModule, // Asegúrate de que el nombre del módulo sea correcto
    MascotaModule,
    SolicitudAdopcionModule, // Agrega este módulo si lo tienes
    AcuerdoAdopcionModule,     // Agrega este módulo si lo tienes
    VisitaDomiciliariaModule, // Agrega este módulo si lo tienes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
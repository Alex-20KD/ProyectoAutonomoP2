import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { HttpModule } from '@nestjs/axios'; // Necesario para HttpService

import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcionController } from './solicitud_adopcion.controller';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity'; // Importa la entidad SolicitudAdopcion

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudAdopcion]), // <-- ¡AÑADE O VERIFICA ESTO!
    HttpModule, // Para inyectar HttpService en el servicio
  ],
  controllers: [SolicitudAdopcionController],
  providers: [SolicitudAdopcionService],
  exports: [SolicitudAdopcionService], // Opcional, si otros módulos lo necesitan
})
export class SolicitudAdopcionModule {}
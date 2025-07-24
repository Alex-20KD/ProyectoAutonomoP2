import { Module } from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcionController } from './solicitud_adopcion.controller';

@Module({
  controllers: [SolicitudAdopcionController],
  providers: [SolicitudAdopcionService],
})
export class SolicitudAdopcionModule {}

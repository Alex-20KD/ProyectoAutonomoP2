import { Module } from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcionResolver } from './solicitud_adopcion.resolver';

@Module({
  providers: [SolicitudAdopcionResolver, SolicitudAdopcionService],
})
export class SolicitudAdopcionModule {}

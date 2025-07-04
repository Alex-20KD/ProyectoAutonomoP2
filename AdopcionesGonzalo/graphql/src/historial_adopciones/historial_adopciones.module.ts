import { Module } from '@nestjs/common';
import { HistorialAdopcionesService } from './historial_adopciones.service';
import { HistorialAdopcionesResolver } from './historial_adopciones.resolver';

@Module({
  providers: [HistorialAdopcionesResolver, HistorialAdopcionesService],
})
export class HistorialAdopcionesModule {}

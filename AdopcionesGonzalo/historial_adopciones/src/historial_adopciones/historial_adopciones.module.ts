import { Module } from '@nestjs/common';
import { HistorialAdopcionesService } from './historial_adopciones.service';
import { HistorialAdopcionesController } from './historial_adopciones.controller';

@Module({
  controllers: [HistorialAdopcionesController],
  providers: [HistorialAdopcionesService],
})
export class HistorialAdopcionesModule {}

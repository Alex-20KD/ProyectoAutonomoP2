import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios'; 

import { HistorialAdopcioneService } from './historial_adopciones.service';
import { HistorialAdopcionesController } from './historial_adopciones.controller';
import { HistorialAdopcione } from './entities/historial_adopcione.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialAdopcione]),
    HttpModule, // ¡AÑADE ESTO AQUÍ!
  ],
  controllers: [HistorialAdopcionesController],
  providers: [HistorialAdopcioneService],
  exports: [HistorialAdopcioneService],
})
export class HistorialAdopcionesModule {}
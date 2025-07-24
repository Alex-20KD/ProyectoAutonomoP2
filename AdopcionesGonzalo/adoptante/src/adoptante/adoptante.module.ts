// src/adoptante/adoptante.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { HttpModule } from '@nestjs/axios'; // ¡IMPORTA ESTO para HttpService!

import { AdoptanteService } from './adoptante.service';
import { AdoptanteController } from './adoptante.controller';
import { Adoptante } from './entities/adoptante.entity'; // Importa la entidad Adoptante

@Module({
  imports: [
    TypeOrmModule.forFeature([Adoptante]), // <-- Asegura que el repositorio esté disponible
    HttpModule, // <-- ¡AÑADE ESTO AQUÍ! Es crucial si AdoptanteService inyecta HttpService.
  ],
  controllers: [AdoptanteController],
  providers: [AdoptanteService],
  exports: [AdoptanteService], // Opcional, si otros módulos lo necesitan
})
export class AdoptanteModule {}
// src/visita_domiciliaria/visita_domiciliaria.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Asegúrate de importar TypeOrmModule
import { HttpModule } from '@nestjs/axios'; // ¡IMPORTA ESTO para HttpService!

import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliariaController } from './visita_domiciliaria.controller';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity'; // Asegúrate de importar la entidad VisitaDomiciliaria

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitaDomiciliaria]), // <-- ¡ESTO ES CRUCIAL para que el repositorio esté disponible!
    HttpModule, // <-- ¡AÑADE ESTO AQUÍ! Es vital si VisitaDomiciliariaService inyecta HttpService.
  ],
  controllers: [VisitaDomiciliariaController],
  providers: [VisitaDomiciliariaService],
  exports: [VisitaDomiciliariaService], // Opcional, si otros módulos necesitan este servicio
})
export class VisitaDomiciliariaModule {}
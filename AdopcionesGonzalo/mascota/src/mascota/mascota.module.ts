// src/mascota/mascota.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Asegúrate de importar TypeOrmModule
import { HttpModule } from '@nestjs/axios'; // ¡IMPORTA ESTO para HttpService!

import { MascotaService } from './mascota.service';
import { MascotaController } from './mascota.controller';
import { Mascota } from './entities/mascota.entity'; // Asegúrate de importar la entidad Mascota

@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota]), // <-- ¡ESTO ES CRUCIAL para que el MascotaRepository esté disponible!
    HttpModule, // <-- ¡AÑADE ESTO AQUÍ! Es vital si MascotaService inyecta HttpService.
  ],
  controllers: [MascotaController],
  providers: [MascotaService],
  exports: [MascotaService], // Opcional, si otros módulos necesitan este servicio
})
export class MascotaModule {}
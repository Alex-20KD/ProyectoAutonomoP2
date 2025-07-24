// adoptante/src/adoptante/adoptante.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptanteService } from './adoptante.service';
import { AdoptanteController } from './adoptante.controller';
import { Adoptante } from './entities/adoptante.entity';
import { HttpModule } from '@nestjs/axios'; // ¡IMPORTACIÓN NECESARIA!

@Module({
  imports: [
    TypeOrmModule.forFeature([Adoptante]),
    HttpModule, // ¡Añade HttpModule aquí para que HttpService esté disponible!
  ],
  controllers: [AdoptanteController],
  providers: [AdoptanteService],
  exports: [TypeOrmModule, AdoptanteService] // Podrías exportar AdoptanteService si otros módulos lo necesitan
})
export class AdoptanteModule {}
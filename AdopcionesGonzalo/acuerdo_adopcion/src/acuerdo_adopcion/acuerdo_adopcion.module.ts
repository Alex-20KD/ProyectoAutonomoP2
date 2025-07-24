import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule si usas HttpService en el servicio

import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcionController } from './acuerdo_adopcion.controller';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity'; // Importa la entidad AcuerdoAdopcion

@Module({
  imports: [
    TypeOrmModule.forFeature([AcuerdoAdopcion]), // <-- ¡AÑADE O VERIFICA ESTO! Para que el repositorio esté disponible.
    HttpModule, // <-- ¡AÑADE ESTO AQUÍ si AcuerdoAdopcionService inyecta HttpService!
  ],
  controllers: [AcuerdoAdopcionController],
  providers: [AcuerdoAdopcionService],
  exports: [AcuerdoAdopcionService], // Opcional, si otros módulos lo necesitan
})
export class AcuerdoAdopcionModule {}
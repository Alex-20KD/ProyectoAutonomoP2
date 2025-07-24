import { Module } from '@nestjs/common';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcionResolver } from './acuerdo_adopcion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity'; // Asegúrate de que la ruta sea correcta


@Module({
  providers: [AcuerdoAdopcionResolver, AcuerdoAdopcionService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([AcuerdoAdopcion])], // Aquí puedes importar otros módulos si es necesario
})
export class AcuerdoAdopcionModule {}

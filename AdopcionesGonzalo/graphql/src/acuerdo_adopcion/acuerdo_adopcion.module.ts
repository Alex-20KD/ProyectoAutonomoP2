import { Module } from '@nestjs/common';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcionResolver } from './acuerdo_adopcion.resolver';

@Module({
  providers: [AcuerdoAdopcionResolver, AcuerdoAdopcionService],
})
export class AcuerdoAdopcionModule {}

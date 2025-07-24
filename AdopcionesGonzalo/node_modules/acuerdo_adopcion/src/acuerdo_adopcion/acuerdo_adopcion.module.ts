import { Module } from '@nestjs/common';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcionController } from './acuerdo_adopcion.controller';

@Module({
  controllers: [AcuerdoAdopcionController],
  providers: [AcuerdoAdopcionService],
})
export class AcuerdoAdopcionModule {}

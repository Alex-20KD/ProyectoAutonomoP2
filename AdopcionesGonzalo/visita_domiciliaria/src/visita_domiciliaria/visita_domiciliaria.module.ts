import { Module } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliariaController } from './visita_domiciliaria.controller';

@Module({
  controllers: [VisitaDomiciliariaController],
  providers: [VisitaDomiciliariaService],
})
export class VisitaDomiciliariaModule {}

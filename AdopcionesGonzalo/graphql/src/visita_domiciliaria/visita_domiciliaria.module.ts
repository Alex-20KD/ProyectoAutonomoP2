import { Module } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliariaResolver } from './visita_domiciliaria.resolver';

@Module({
  providers: [VisitaDomiciliariaResolver, VisitaDomiciliariaService],
})
export class VisitaDomiciliariaModule {}

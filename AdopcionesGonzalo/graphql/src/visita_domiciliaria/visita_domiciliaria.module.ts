import { Module } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliariaResolver } from './visita_domiciliaria.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity'; // Asegúrate de que la ruta sea correcta

@Module({
  providers: [VisitaDomiciliariaResolver, VisitaDomiciliariaService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([VisitaDomiciliaria])], // Aquí puedes importar otros módulos si es necesario
})
export class VisitaDomiciliariaModule {}

import { Module } from '@nestjs/common';
import { HistorialAdoptanteService } from './historial_adopciones.service';
import { HistorialAdoptanteResolver } from './historial_adopciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialAdoptante } from './entities/historial_adopcione.entity';

@Module({
  providers: [HistorialAdoptanteResolver, HistorialAdoptanteService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([HistorialAdoptante])], // Aquí puedes importar otros módulos si es necesario
})
export class HistorialAdoptanteModule {}

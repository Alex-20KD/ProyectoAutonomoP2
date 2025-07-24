import { Module } from '@nestjs/common';
import { AdoptanteService } from './adoptante.service';
import { AdoptanteResolver } from './adoptante.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoptante } from './entities/adoptante.entity'
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule para hacer peticiones HTTP

@Module({
  providers: [AdoptanteResolver, AdoptanteService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Adoptante]),HttpModule] // Aquí puedes importar otros módulos si es necesario
})
export class AdoptanteModule {}

import { Module } from '@nestjs/common';
import { AdoptanteService } from './adoptante.service';
import { AdoptanteResolver } from './adoptante.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoptante } from './entities/adoptante.entity'; // Adjust the path as necessary

@Module({
  imports: [TypeOrmModule.forFeature([Adoptante])],
  providers: [AdoptanteResolver, AdoptanteService],
  exports: [AdoptanteService]
})
export class AdoptanteModule {}

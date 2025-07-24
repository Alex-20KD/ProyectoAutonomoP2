import { Module } from '@nestjs/common';
import { AdoptanteService } from './adoptante.service';
import { AdoptanteController } from './adoptante.controller';

@Module({
  controllers: [AdoptanteController],
  providers: [AdoptanteService],
})
export class AdoptanteModule {}

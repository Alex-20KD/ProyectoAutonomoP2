import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptanteModule } from './adoptante/adoptante.module';

@Module({
  imports: [AdoptanteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

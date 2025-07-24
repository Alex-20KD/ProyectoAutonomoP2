import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitaDomiciliariaModule } from './visita_domiciliaria/visita_domiciliaria.module';

@Module({
  imports: [VisitaDomiciliariaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

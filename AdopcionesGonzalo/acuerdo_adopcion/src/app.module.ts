import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcuerdoAdopcionModule } from './acuerdo_adopcion/acuerdo_adopcion.module';

@Module({
  imports: [AcuerdoAdopcionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

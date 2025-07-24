import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolicitudAdopcionModule } from './solicitud_adopcion/solicitud_adopcion.module';

@Module({
  imports: [SolicitudAdopcionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

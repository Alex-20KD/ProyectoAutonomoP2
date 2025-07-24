import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistorialAdopcionesModule } from './historial_adopciones/historial_adopciones.module';

@Module({
  imports: [HistorialAdopcionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotaModule } from './mascota/mascota.module';

@Module({
  imports: [MascotaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

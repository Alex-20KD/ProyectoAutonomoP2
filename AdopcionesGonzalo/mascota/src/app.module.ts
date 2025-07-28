import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotaModule } from './mascota/mascota.module';
import { DataSeederService } from './data-seeder.service';
import { Mascota } from './mascota/entities/mascota.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/mascotas.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo
      logging: true,
    }),
    TypeOrmModule.forFeature([Mascota]), // Para el DataSeederService
    MascotaModule
  ],
  controllers: [AppController],
  providers: [AppService, DataSeederService],
})
export class AppModule {}

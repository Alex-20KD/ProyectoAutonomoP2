import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { MascotaResolver } from './mascota.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';

@Module({
  providers: [MascotaResolver, MascotaService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Mascota])], // Aquí puedes importar otros módulos si es necesario
})
export class MascotaModule {}

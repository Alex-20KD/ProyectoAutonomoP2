import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { MascotaResolver } from './mascota.resolver';

@Module({
  providers: [MascotaResolver, MascotaService],
})
export class MascotaModule {}

import { Module } from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcionResolver } from './solicitud_adopcion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity'; // Asegúrate de que la ruta sea correcta

@Module({
  providers: [SolicitudAdopcionResolver, SolicitudAdopcionService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([SolicitudAdopcion])], // Aquí puedes importar otros módulos si es necesario
})
export class SolicitudAdopcionModule {}

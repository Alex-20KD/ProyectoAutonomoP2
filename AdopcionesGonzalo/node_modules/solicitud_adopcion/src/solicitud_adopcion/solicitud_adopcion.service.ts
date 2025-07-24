import { Injectable } from '@nestjs/common';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud_adopcion.dto';
import { UpdateSolicitudAdopcionDto } from './dto/update-solicitud_adopcion.dto';

@Injectable()
export class SolicitudAdopcionService {
  create(createSolicitudAdopcionDto: CreateSolicitudAdopcionDto) {
    return 'This action adds a new solicitudAdopcion';
  }

  findAll() {
    return `This action returns all solicitudAdopcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudAdopcion`;
  }

  update(id: number, updateSolicitudAdopcionDto: UpdateSolicitudAdopcionDto) {
    return `This action updates a #${id} solicitudAdopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudAdopcion`;
  }
}

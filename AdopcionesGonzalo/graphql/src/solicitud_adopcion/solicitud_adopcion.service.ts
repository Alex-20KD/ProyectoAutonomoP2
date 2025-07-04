import { Injectable } from '@nestjs/common';
import { CreateSolicitudAdopcionInput } from './dto/create-solicitud_adopcion.input';
import { UpdateSolicitudAdopcionInput } from './dto/update-solicitud_adopcion.input';

@Injectable()
export class SolicitudAdopcionService {
  create(createSolicitudAdopcionInput: CreateSolicitudAdopcionInput) {
    return 'This action adds a new solicitudAdopcion';
  }

  findAll() {
    return `This action returns all solicitudAdopcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudAdopcion`;
  }

  update(id: number, updateSolicitudAdopcionInput: UpdateSolicitudAdopcionInput) {
    return `This action updates a #${id} solicitudAdopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudAdopcion`;
  }
}

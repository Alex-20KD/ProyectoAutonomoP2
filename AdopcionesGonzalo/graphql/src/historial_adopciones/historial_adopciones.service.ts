import { Injectable } from '@nestjs/common';
import { CreateHistorialAdopcioneInput } from './dto/create-historial_adopcione.input';
import { UpdateHistorialAdopcioneInput } from './dto/update-historial_adopcione.input';

@Injectable()
export class HistorialAdopcionesService {
  create(createHistorialAdopcioneInput: CreateHistorialAdopcioneInput) {
    return 'This action adds a new historialAdopcione';
  }

  findAll() {
    return `This action returns all historialAdopciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialAdopcione`;
  }

  update(id: number, updateHistorialAdopcioneInput: UpdateHistorialAdopcioneInput) {
    return `This action updates a #${id} historialAdopcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialAdopcione`;
  }
}

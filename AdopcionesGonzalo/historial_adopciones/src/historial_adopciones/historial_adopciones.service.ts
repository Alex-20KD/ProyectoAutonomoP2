import { Injectable } from '@nestjs/common';
import { CreateHistorialAdopcioneDto } from './dto/create-historial_adopcione.dto';
import { UpdateHistorialAdopcioneDto } from './dto/update-historial_adopcione.dto';

@Injectable()
export class HistorialAdopcionesService {
  create(createHistorialAdopcioneDto: CreateHistorialAdopcioneDto) {
    return 'This action adds a new historialAdopcione';
  }

  findAll() {
    return `This action returns all historialAdopciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialAdopcione`;
  }

  update(id: number, updateHistorialAdopcioneDto: UpdateHistorialAdopcioneDto) {
    return `This action updates a #${id} historialAdopcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialAdopcione`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAcuerdoAdopcionInput } from './dto/create-acuerdo_adopcion.input';
import { UpdateAcuerdoAdopcionInput } from './dto/update-acuerdo_adopcion.input';

@Injectable()
export class AcuerdoAdopcionService {
  create(createAcuerdoAdopcionInput: CreateAcuerdoAdopcionInput) {
    return 'This action adds a new acuerdoAdopcion';
  }

  findAll() {
    return `This action returns all acuerdoAdopcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acuerdoAdopcion`;
  }

  update(id: number, updateAcuerdoAdopcionInput: UpdateAcuerdoAdopcionInput) {
    return `This action updates a #${id} acuerdoAdopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} acuerdoAdopcion`;
  }
}

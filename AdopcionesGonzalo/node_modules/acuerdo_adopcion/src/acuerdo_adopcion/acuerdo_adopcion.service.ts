import { Injectable } from '@nestjs/common';
import { CreateAcuerdoAdopcionDto } from './dto/create-acuerdo_adopcion.dto';
import { UpdateAcuerdoAdopcionDto } from './dto/update-acuerdo_adopcion.dto';

@Injectable()
export class AcuerdoAdopcionService {
  create(createAcuerdoAdopcionDto: CreateAcuerdoAdopcionDto) {
    return 'This action adds a new acuerdoAdopcion';
  }

  findAll() {
    return `This action returns all acuerdoAdopcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acuerdoAdopcion`;
  }

  update(id: number, updateAcuerdoAdopcionDto: UpdateAcuerdoAdopcionDto) {
    return `This action updates a #${id} acuerdoAdopcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} acuerdoAdopcion`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateVisitaDomiciliariaDto } from './dto/create-visita_domiciliaria.dto';
import { UpdateVisitaDomiciliariaDto } from './dto/update-visita_domiciliaria.dto';

@Injectable()
export class VisitaDomiciliariaService {
  create(createVisitaDomiciliariaDto: CreateVisitaDomiciliariaDto) {
    return 'This action adds a new visitaDomiciliaria';
  }

  findAll() {
    return `This action returns all visitaDomiciliaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitaDomiciliaria`;
  }

  update(id: number, updateVisitaDomiciliariaDto: UpdateVisitaDomiciliariaDto) {
    return `This action updates a #${id} visitaDomiciliaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitaDomiciliaria`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateVisitaDomiciliariaInput } from './dto/create-visita_domiciliaria.input';
import { UpdateVisitaDomiciliariaInput } from './dto/update-visita_domiciliaria.input';

@Injectable()
export class VisitaDomiciliariaService {
  create(createVisitaDomiciliariaInput: CreateVisitaDomiciliariaInput) {
    return 'This action adds a new visitaDomiciliaria';
  }

  findAll() {
    return `This action returns all visitaDomiciliaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitaDomiciliaria`;
  }

  update(id: number, updateVisitaDomiciliariaInput: UpdateVisitaDomiciliariaInput) {
    return `This action updates a #${id} visitaDomiciliaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitaDomiciliaria`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMascotaInput } from './dto/create-mascota.input';
import { UpdateMascotaInput } from './dto/update-mascota.input';

@Injectable()
export class MascotaService {
  create(createMascotaInput: CreateMascotaInput) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return `This action returns all mascota`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaInput: UpdateMascotaInput) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}

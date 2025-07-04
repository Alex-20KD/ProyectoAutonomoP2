import { Injectable } from '@nestjs/common';
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';

@Injectable()
export class AdoptanteService {
  create(createAdoptanteInput: CreateAdoptanteInput) {
    return 'This action adds a new adoptante';
  }

  findAll() {
    return `This action returns all adoptante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adoptante`;
  }

  update(id: number, updateAdoptanteInput: UpdateAdoptanteInput) {
    return `This action updates a #${id} adoptante`;
  }

  remove(id: number) {
    return `This action removes a #${id} adoptante`;
  }
}

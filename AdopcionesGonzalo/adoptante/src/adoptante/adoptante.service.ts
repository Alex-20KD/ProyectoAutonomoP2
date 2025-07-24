import { Injectable } from '@nestjs/common';
import { CreateAdoptanteDto } from './dto/create-adoptante.dto';
import { UpdateAdoptanteDto } from './dto/update-adoptante.dto';

@Injectable()
export class AdoptanteService {
  create(createAdoptanteDto: CreateAdoptanteDto) {
    return 'This action adds a new adoptante';
  }

  findAll() {
    return `This action returns all adoptante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adoptante`;
  }

  update(id: number, updateAdoptanteDto: UpdateAdoptanteDto) {
    return `This action updates a #${id} adoptante`;
  }

  remove(id: number) {
    return `This action removes a #${id} adoptante`;
  }
}

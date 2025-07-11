import { Injectable} from '@nestjs/common';
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoptante } from './entities/adoptante.entity';

@Injectable()
export class AdoptanteService {

  constructor(

    @InjectRepository(Adoptante)
    private readonly AdoptantesRepository: Repository<Adoptante>
  ) {

  }
  async create(createAdoptanteInput: CreateAdoptanteInput): Promise<Adoptante> {
    
    const created = this.AdoptantesRepository.create(createAdoptanteInput);
    return await this.AdoptantesRepository.save(created);

    }

  async findAll(): Promise<Adoptante[]> {
    return await this.AdoptantesRepository.find();
  }

  async findOne(id: number) {

    return await this.AdoptantesRepository.findOne({where:{id}});

    }

  async update(id: number, updateAdoptanteInput: UpdateAdoptanteInput): Promise<Adoptante> {

    const updated = await this.AdoptantesRepository.preload(updateAdoptanteInput);
    if (!updated) {
      throw new Error(`Adoptante with id ${id} not found`);
      }
    return await this.AdoptantesRepository.save(updated);
  }

  async remove(id: number):  Promise<Adoptante> {

    const removed = await this.AdoptantesRepository.findOne({where:{id}});
    if (!removed) {
      throw new Error(`Adoptante with id ${id} not found`);
    }
    return await this.AdoptantesRepository.remove(removed);
  }
}

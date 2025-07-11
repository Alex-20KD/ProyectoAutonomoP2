import { Injectable} from '@nestjs/common';
import { CreateMascotaInput } from './dto/create-mascota.input';
import { UpdateMascotaInput } from './dto/update-mascota.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MascotaService {

  constructor(
    
    @InjectRepository(Mascota)
    private readonly mascotasRepository: Repository<Mascota>

  ) {}

  async create(createMascotaInput: CreateMascotaInput): Promise<Mascota> {
    const created = this.mascotasRepository.create(createMascotaInput);
    return await this.mascotasRepository.save(created);
  }

  async findAll(): Promise<Mascota[]> {

    return await this.mascotasRepository.find();
  }

  async findOne(id: number) {

    return await this.mascotasRepository.findOne({ where: { id } });
    }

  async update(id: number, updateMascotaInput: UpdateMascotaInput): Promise<Mascota> {

    const updated = await this.mascotasRepository.preload(updateMascotaInput);
    if (!updated) {
      throw new Error(`Mascota with id ${id} not found`);
    }
    return await this.mascotasRepository.save(updated);
  }

  async remove(id: number): Promise<Mascota> {

    const removed = await this.mascotasRepository.findOne({ where: { id } });
    if (!removed) {
      throw new Error(`Mascota with id ${id} not found`);
      }
    return await this.mascotasRepository.remove(removed);
    }
}

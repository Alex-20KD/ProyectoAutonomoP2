import { Injectable} from '@nestjs/common';
import { CreateHistorialAdoptanteInput } from './dto/create-historial_adopcione.input';
import { UpdateHistorialAdoptanteInput } from './dto/update-historial_adopcione.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialAdoptante } from './entities/historial_adopcione.entity';

@Injectable()
export class HistorialAdoptanteService {

  constructor(

    @InjectRepository(HistorialAdoptante)
    private readonly historialAdoptanteRepository: Repository<HistorialAdoptante>

  ) {}
  async create(createHistorialAdoptanteInput: CreateHistorialAdoptanteInput): Promise<HistorialAdoptante> {
    const created = this.historialAdoptanteRepository.create(createHistorialAdoptanteInput);
    return await this.historialAdoptanteRepository.save(created);

    }

  async findAll(): Promise<HistorialAdoptante[]> {

    return await this.historialAdoptanteRepository.find();
  }

  async findOne(id: number) {
    
    return await this.historialAdoptanteRepository.findOne({ where: { id } });

  }

  async update(id: number, updateHistorialAdoptanteInput: UpdateHistorialAdoptanteInput): Promise<HistorialAdoptante> {

    const updated = await this.historialAdoptanteRepository.preload(updateHistorialAdoptanteInput);
    if (!updated) {
      throw new Error(`HistorialAdoptante with id ${id} not found`);
    }
    return await this.historialAdoptanteRepository.save(updated);
 }

  async remove(id: number): Promise<HistorialAdoptante> {

    const removed = await this.historialAdoptanteRepository.findOne({ where: { id } });
    if (!removed) {
      throw new Error(`HistorialAdoptante with id ${id} not found`);
    }
    return await this.historialAdoptanteRepository.remove(removed);
  }
}

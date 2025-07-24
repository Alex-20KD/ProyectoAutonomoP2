import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoptante } from './entities/adoptante.entity';
import { CreateAdoptanteDto } from './dto/create-adoptante.dto';
import { UpdateAdoptanteDto } from './dto/update-adoptante.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdoptanteService {
  // URL del servicio de notificaciones WebSocket
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify';

  constructor(
    @InjectRepository(Adoptante)
    private readonly adoptantesRepository: Repository<Adoptante>,
    // Inyección de HttpService para realizar llamadas HTTP
    private readonly httpService: HttpService,
    // ¡CORRECCIÓN CLAVE AQUÍ! Inyección del repositorio
  ) {}

  async create(createAdoptanteDto: CreateAdoptanteDto): Promise<Adoptante> {
    const created = this.adoptantesRepository.create(createAdoptanteDto);
    const savedAdoptante = await this.adoptantesRepository.save(created);

    // Envío de notificación al servicio WebSocket
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_creado', // Tipo de evento
          data: savedAdoptante, // Datos del evento
          service: 'microservice-adoptantes', // Origen del evento
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de adoptante creado:', error.response?.data || error.message);
    }

    return savedAdoptante;
  }

  // >>> ASEGÚRATE DE QUE ESTE MÉTODO ESTÉ CORRECTO PARA DEVOLVER DATOS DE LA DB <<<
  findAll(): Promise<Adoptante[]> {
    return this.adoptantesRepository.find(); // ¡Esto es lo crucial!
  }

  async findOne(id: number): Promise<Adoptante> {
    const adoptante = await this.adoptantesRepository.findOne({ where: { id } });
    if (!adoptante) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`);
    }
    return adoptante;
  }

  async update(id: number, updateAdoptanteDto: UpdateAdoptanteDto): Promise<Adoptante> {
    const updated = await this.adoptantesRepository.preload({
      ...updateAdoptanteDto,
    });

    if (!updated) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`);
    }
    const savedAdoptante = await this.adoptantesRepository.save(updated);

    // Envío de notificación al servicio WebSocket tras actualización
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_actualizado',
          data: savedAdoptante,
          service: 'microservice-adoptantes',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de adoptante actualizado:', error.response?.data || error.message);
    }

    return savedAdoptante;
  }

  async remove(id: number): Promise<Adoptante> {
    const removed = await this.adoptantesRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`);
    }
    await this.adoptantesRepository.remove(removed);

    // Envío de notificación al servicio WebSocket tras eliminación
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_eliminado',
          data: { id: removed.id, name: removed.name }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-adoptantes',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de adoptante eliminado:', error.response?.data || error.message);
    }

    return removed;
  }
}
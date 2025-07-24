import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity';
import { CreateVisitaDomiciliariaDto } from './dto/create-visita_domiciliaria.dto';
import { UpdateVisitaDomiciliariaDto } from './dto/update-visita_domiciliaria.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VisitaDomiciliariaService {
  // URL del servicio de notificaciones WebSocket
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify'; // Ajusta si es necesario

  constructor(
    @InjectRepository(VisitaDomiciliaria)
    private readonly visitaDomiciliariaRepository: Repository<VisitaDomiciliaria>,
    // Inyección de HttpService para realizar llamadas HTTP
    private readonly httpService: HttpService,
  ) {}

  async create(createVisitaDomiciliariaDto: CreateVisitaDomiciliariaDto): Promise<VisitaDomiciliaria> {
    const created = this.visitaDomiciliariaRepository.create(createVisitaDomiciliariaDto as DeepPartial<VisitaDomiciliaria>);
    const savedVisita = await this.visitaDomiciliariaRepository.save(created);

    // Envío de notificación al servicio WebSocket
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'visita_creada', // Tipo de evento
          data: savedVisita, // Datos del evento
          service: 'microservice-visita-domiciliaria', // Origen del evento
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de visita creada:', error.response?.data || error.message);
    }

    return savedVisita;
  }

  async findAll(): Promise<VisitaDomiciliaria[]> {
    return await this.visitaDomiciliariaRepository.find();
  }

  async findOne(id: number): Promise<VisitaDomiciliaria> {
    const visita = await this.visitaDomiciliariaRepository.findOne({ where: { id } });
    if (!visita) {
      throw new NotFoundException(`Visita domiciliaria con ID "${id}" no encontrada.`);
    }
    return visita;
  }

  async update(id: number, updateVisitaDomiciliariaDto: UpdateVisitaDomiciliariaDto): Promise<VisitaDomiciliaria> {
    const updated = await this.visitaDomiciliariaRepository.preload({
      ...updateVisitaDomiciliariaDto,
    });

    if (!updated) {
      throw new NotFoundException(`Visita domiciliaria con ID "${id}" no encontrada.`);
    }
    const savedVisita = await this.visitaDomiciliariaRepository.save(updated);

    // Envío de notificación al servicio WebSocket tras actualización
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'visita_actualizada',
          data: savedVisita,
          service: 'microservice-visita-domiciliaria',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de visita actualizada:', error.response?.data || error.message);
    }

    return savedVisita;
  }

  async remove(id: number): Promise<VisitaDomiciliaria> {
    const removed = await this.visitaDomiciliariaRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Visita domiciliaria con ID "${id}" no encontrada.`);
    }
    await this.visitaDomiciliariaRepository.remove(removed);

    // Envío de notificación al servicio WebSocket tras eliminación
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'visita_eliminada',
          data: { id: removed.id, resultado: removed.resultado }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-visita-domiciliaria',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de visita eliminada:', error.response?.data || error.message);
    }

    return removed;
  }
}
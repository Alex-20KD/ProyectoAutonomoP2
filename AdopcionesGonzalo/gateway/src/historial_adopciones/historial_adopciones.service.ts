import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialAdopcione } from './entities/historial_adopcione.entity';
import { CreateHistorialAdopcioneDto } from './dto/create-historial_adopcione.dto';
import { UpdateHistorialAdopcioneDto } from './dto/update-historial_adopcione.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HistorialAdopcioneService {
  // URL del servicio de notificaciones WebSocket
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify'; // Ajusta si es necesario

  constructor(
    @InjectRepository(HistorialAdopcione)
    private readonly HistorialAdopcioneRepository: Repository<HistorialAdopcione>,
    // Inyección de HttpService para realizar llamadas HTTP
    private readonly httpService: HttpService,
  ) {}

  async create(createHistorialAdopcioneDto: CreateHistorialAdopcioneDto): Promise<HistorialAdopcione> { // Nombre de la variable corregido
    const created = this.HistorialAdopcioneRepository.create(createHistorialAdopcioneDto);
    const savedHistorial = await this.HistorialAdopcioneRepository.save(created);

    // Envío de notificación al servicio WebSocket
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'historial_creado', // Tipo de evento
          data: savedHistorial, // Datos del evento
          service: 'microservice-historial-adoptante', // Origen del evento
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de historial creado:', error.response?.data || error.message);
    }

    return savedHistorial;
  }

  async findAll(): Promise<HistorialAdopcione[]> {
    return await this.HistorialAdopcioneRepository.find();
  }

  async findOne(id: string): Promise<HistorialAdopcione> { // ID es string por UUID
    const historial = await this.HistorialAdopcioneRepository.findOne({ where: { id } });
    if (!historial) {
      throw new NotFoundException(`Historial de adoptante con ID "${id}" no encontrado.`);
    }
    return historial;
  }

  async update(id: string, updateHistorialAdopcioneDto: UpdateHistorialAdopcioneDto): Promise<HistorialAdopcione> { // ID es string por UUID
    const updated = await this.HistorialAdopcioneRepository.preload({
      ...updateHistorialAdopcioneDto,
    });

    if (!updated) {
      throw new NotFoundException(`Historial de adoptante con ID "${id}" no encontrado.`);
    }
    const savedHistorial = await this.HistorialAdopcioneRepository.save(updated);

    // Envío de notificación al servicio WebSocket tras actualización
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'historial_actualizado',
          data: savedHistorial,
          service: 'microservice-historial-adoptante',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de historial actualizado:', error.response?.data || error.message);
    }

    return savedHistorial;
  }

  async remove(id: string): Promise<HistorialAdopcione> { // ID es string por UUID
    const removed = await this.HistorialAdopcioneRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Historial de adoptante con ID "${id}" no encontrado.`);
    }
    await this.HistorialAdopcioneRepository.remove(removed);

    // Envío de notificación al servicio WebSocket tras eliminación
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'historial_eliminado',
          data: { id: removed.id }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-historial-adoptante',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de historial eliminado:', error.response?.data || error.message);
    }

    return removed;
  }
}
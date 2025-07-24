import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm'; // Importa DeepPartial
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud_adopcion.dto';
import { UpdateSolicitudAdopcionDto } from './dto/update-solicitud_adopcion.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SolicitudAdopcionService {
  // URL del servicio de notificaciones WebSocket
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify'; // Ajusta si es necesario

  constructor(
    @InjectRepository(SolicitudAdopcion)
    private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>,
    // Inyección de HttpService para realizar llamadas HTTP
    private readonly httpService: HttpService,
  ) {}

  async create(createSolicitudAdopcionDto: CreateSolicitudAdopcionDto): Promise<SolicitudAdopcion> {
    // --- CORRECCIÓN AQUÍ: Usar .create() para inicializar y .save() para guardar ---
    const created = this.solicitudAdopcionRepository.create(createSolicitudAdopcionDto);
    const savedSolicitud = await this.solicitudAdopcionRepository.save(created); // <-- Esto guarda en la DB


    // Envío de notificación al servicio WebSocket
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'solicitud_creada', // Tipo de evento
          data: savedSolicitud, // Datos del evento
          service: 'microservice-solicitud-adopcion', // Origen del evento
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de solicitud creada:', error.response?.data || error.message);
    }

    return savedSolicitud;
  }

  async findAll(): Promise<SolicitudAdopcion[]> {
    return this.solicitudAdopcionRepository.find({
      relations: ['adoptante', 'mascota', 'acuerdosAdopcion'], // Carga las relaciones necesarias
    });
  }

  async findOne(id: number): Promise<SolicitudAdopcion> { // ID es number (UUID)
    const solicitud = await this.solicitudAdopcionRepository.findOne({ where: { id } });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud de adopción con ID "${id}" no encontrada.`);
    }
    return solicitud;
  }

  async update(id: number, updateSolicitudAdopcionDto: UpdateSolicitudAdopcionDto): Promise<SolicitudAdopcion> { // ID es number (UUID)
    const updated = await this.solicitudAdopcionRepository.preload({
      ...updateSolicitudAdopcionDto,
    });

    if (!updated) {
      throw new NotFoundException(`Solicitud de adopción con ID "${id}" no encontrada.`);
    }
    const savedSolicitud = await this.solicitudAdopcionRepository.save(updated);

    // Envío de notificación al servicio WebSocket tras actualización
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'solicitud_actualizada',
          data: savedSolicitud,
          service: 'microservice-solicitud-adopcion',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de solicitud actualizada:', error.response?.data || error.message);
    }

    return savedSolicitud;
  }

  async remove(id: number): Promise<SolicitudAdopcion> { // ID es number (UUID)
    const removed = await this.solicitudAdopcionRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Solicitud de adopción con ID "${id}" no encontrada.`);
    }
    await this.solicitudAdopcionRepository.remove(removed);

    // Envío de notificación al servicio WebSocket tras eliminación
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'solicitud_eliminada',
          data: { id: removed.id, estado: removed.estado }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-solicitud-adopcion',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de solicitud eliminada:', error.response?.data || error.message);
    }

    return removed;
  }
}
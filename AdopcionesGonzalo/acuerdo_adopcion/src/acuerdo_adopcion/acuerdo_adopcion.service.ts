import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity';
import { CreateAcuerdoAdopcionDto } from './dto/create-acuerdo_adopcion.dto';
import { UpdateAcuerdoAdopcionDto } from './dto/update-acuerdo_adopcion.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AcuerdoAdopcionService {
  // URL del servicio de notificaciones WebSocket
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify'; // Ajusta si es necesario

  constructor(
    @InjectRepository(AcuerdoAdopcion)
    private readonly acuerdoAdopcionRepository: Repository<AcuerdoAdopcion>,
    // Inyección de HttpService para realizar llamadas HTTP
    private readonly httpService: HttpService,
  ) {}

  async create(createAcuerdoAdopcionDto: CreateAcuerdoAdopcionDto): Promise<AcuerdoAdopcion> {
    const created = this.acuerdoAdopcionRepository.create(createAcuerdoAdopcionDto as DeepPartial<AcuerdoAdopcion>);
    const savedAcuerdo = await this.acuerdoAdopcionRepository.save(created);

    // Envío de notificación al servicio WebSocket
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'acuerdo_creado', // Tipo de evento
          data: savedAcuerdo, // Datos del evento
          service: 'microservice-acuerdo-adopcion', // Origen del evento
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de acuerdo creado:', error.response?.data || error.message);
    }

    return savedAcuerdo;
  }

  // >>> ASEGÚRATE DE QUE ESTE MÉTODO ESTÉ CORRECTO <<<
  findAll(): Promise<AcuerdoAdopcion[]> {
    return this.acuerdoAdopcionRepository.find(); // Esto es lo importante: usar .find() del repositorio
  }

  async findOne(id: number): Promise<AcuerdoAdopcion> { // ID es number (UUID)
    const acuerdo = await this.acuerdoAdopcionRepository.findOne({ where: { id } });
    if (!acuerdo) {
      throw new NotFoundException(`Acuerdo de adopción con ID "${id}" no encontrado.`);
    }
    return acuerdo;
  }

  async update(id: number, updateAcuerdoAdopcionDto: UpdateAcuerdoAdopcionDto): Promise<AcuerdoAdopcion> { // ID es number (UUID)
    const updated = await this.acuerdoAdopcionRepository.preload({
      ...updateAcuerdoAdopcionDto,
    });

    if (!updated) {
      throw new NotFoundException(`Acuerdo de adopción con ID "${id}" no encontrado.`);
    }
    const savedAcuerdo = await this.acuerdoAdopcionRepository.save(updated);

    // Envío de notificación al servicio WebSocket tras actualización
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'acuerdo_actualizado',
          data: savedAcuerdo,
          service: 'microservice-acuerdo-adopcion',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de acuerdo actualizado:', error.response?.data || error.message);
    }

    return savedAcuerdo;
  }

  async remove(id: number): Promise<AcuerdoAdopcion> { // ID es number (UUID)
    const removed = await this.acuerdoAdopcionRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Acuerdo de adopción con ID "${id}" no encontrado.`);
    }
    await this.acuerdoAdopcionRepository.remove(removed);

    // Envío de notificación al servicio WebSocket tras eliminación
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'acuerdo_eliminado',
          data: { id: removed.id, tipoAcuerdo: removed.tipoAcuerdo }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-acuerdo-adopcion',
        }),
      );
    } catch (error) {
      console.error('Error al enviar notificación de acuerdo eliminado:', error.response?.data || error.message);
    }

    return removed;
  }
}
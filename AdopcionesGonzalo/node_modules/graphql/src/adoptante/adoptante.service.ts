import { Injectable, NotFoundException } from '@nestjs/common'; // Importa NotFoundException
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoptante } from './entities/adoptante.entity';
import { HttpService } from '@nestjs/axios'; // Importa HttpService
import { firstValueFrom } from 'rxjs'; // Importa firstValueFrom para usar async/await

@Injectable()
export class AdoptanteService {
  // Asegúrate de que esta URL coincida con la dirección real del servicio de notificaciones de Python
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify';

  constructor(
    @InjectRepository(Adoptante)
    private readonly adoptantesRepository: Repository<Adoptante>,
    private readonly httpService: HttpService, // Inyecta HttpService
  ) {}

  async create(createAdoptanteInput: CreateAdoptanteInput): Promise<Adoptante> {
    const created = this.adoptantesRepository.create(createAdoptanteInput);
    const savedAdoptante = await this.adoptantesRepository.save(created);

    // --- Notificar al servicio de WebSockets sobre la creación ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_creado', // Tipo de evento, definido por el servicio Python
          data: savedAdoptante, // Los datos del adoptante recién creado
          service: 'microservice-adoptantes', // Opcional: Para identificar quién envía el evento
        }),
      );
      console.log('Notificación "adoptante_creado" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de adoptante creado:', error.response?.data || error.message);
      // No lanzamos el error para no bloquear la operación principal
    }
    // -----------------------------------------------------------

    return savedAdoptante;
  }

  async findAll(): Promise<Adoptante[]> {
    return await this.adoptantesRepository.find();
  }

  async findOne(id: number): Promise<Adoptante> {
    const adoptante = await this.adoptantesRepository.findOne({ where: { id } });
    if (!adoptante) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`); // Uso de NotFoundException
    }
    return adoptante;
  }

  async update(id: number, updateAdoptanteInput: UpdateAdoptanteInput): Promise<Adoptante> {
    // Aseguramos que el ID esté en el input para preload
    const updated = await this.adoptantesRepository.preload({
...updateAdoptanteInput,
    });

    if (!updated) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`); // Uso de NotFoundException
    }
    const savedAdoptante = await this.adoptantesRepository.save(updated);

    // --- Notificar al servicio de WebSockets sobre la actualización ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_actualizado', // Tipo de evento
          data: savedAdoptante, // Datos actualizados del adoptante
          service: 'microservice-adoptantes',
        }),
      );
      console.log('Notificación "adoptante_actualizado" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de adoptante actualizado:', error.response?.data || error.message);
    }
    // ---------------------------------------------------------------

    return savedAdoptante;
  }

  async remove(id: number): Promise<Adoptante> {
    const removed = await this.adoptantesRepository.findOne({ where: { id } });
    if (!removed) {
      throw new NotFoundException(`Adoptante con ID "${id}" no encontrado.`); // Uso de NotFoundException
    }
    await this.adoptantesRepository.remove(removed);

    // --- Notificar al servicio de WebSockets sobre la eliminación ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'adoptante_eliminado', // Tipo de evento
          data: { id: removed.id, nombre: removed.name }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-adoptantes',
        }),
      );
      console.log('Notificación "adoptante_eliminado" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de adoptante eliminado:', error.response?.data || error.message);
    }
    // -------------------------------------------------------------

    return removed;
  }
}
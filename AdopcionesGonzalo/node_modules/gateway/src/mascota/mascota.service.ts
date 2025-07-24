import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity'; // Asegúrate que esta ruta sea correcta
import { CreateMascotaDto } from './dto/create-mascota.dto'; // DTO para REST
import { UpdateMascotaDto } from './dto/update-mascota.dto'; // DTO para REST
import { HttpService } from '@nestjs/axios'; // Importa HttpService
import { firstValueFrom } from 'rxjs'; // Para usar async/await con HttpService

@Injectable()
export class MascotaService {
  // Asegúrate de que esta URL coincida con la dirección real del servicio de notificaciones de Python
  private readonly NOTIFICATION_SERVICE_URL = 'http://localhost:8000/api/v1/notify';

  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    private readonly httpService: HttpService, // Inyecta HttpService
  ) {}

  async create(createMascotaDto: CreateMascotaDto): Promise<Mascota> {
    const newMascota = this.mascotaRepository.create(createMascotaDto);
    const savedMascota = await this.mascotaRepository.save(newMascota);

    // --- Notificar al servicio de WebSockets sobre la creación ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'mascota_creada', // Tipo de evento
          data: savedMascota, // Los datos de la mascota recién creada
          service: 'microservice-mascotas', // Para identificar quién envía el evento
        }),
      );
      console.log('Notificación "mascota_creada" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de mascota creada:', error.response?.data || error.message);
    }
    // -----------------------------------------------------------

    return savedMascota;
  }

  // >>> ¡ASEGÚRATE DE QUE ESTE MÉTODO ESTÉ CORRECTO Y DEVUELVA DATOS DE LA DB! <<<
  findAll(): Promise<Mascota[]> {
    return this.mascotaRepository.find(); // Esto es lo que debe hacer para devolver todos los registros
  }

  async findOne(id: number): Promise<Mascota> {
    const mascota = await this.mascotaRepository.findOne({ where: { id } });
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID "${id}" no encontrada.`);
    }
    return mascota;
  }

  async update(id: number, updateMascotaDto: UpdateMascotaDto): Promise<Mascota> {
    const mascotaToUpdate = await this.mascotaRepository.preload({
      ...updateMascotaDto,
    });

    if (!mascotaToUpdate) {
      throw new NotFoundException(`Mascota con ID "${id}" no encontrada.`);
    }
    const savedMascota = await this.mascotaRepository.save(mascotaToUpdate);

    // --- Notificar al servicio de WebSockets sobre la actualización ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'mascota_actualizada', // Tipo de evento
          data: savedMascota, // Datos actualizados de la mascota
          service: 'microservice-mascotas',
        }),
      );
      console.log('Notificación "mascota_actualizada" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de mascota actualizada:', error.response?.data || error.message);
    }
    // ---------------------------------------------------------------

    return savedMascota;
  }

  async remove(id: number): Promise<Mascota> {
    const mascotaToRemove = await this.mascotaRepository.findOne({ where: { id } });
    if (!mascotaToRemove) {
      throw new NotFoundException(`Mascota con ID "${id}" no encontrada.`);
    }
    await this.mascotaRepository.remove(mascotaToRemove);

    // --- Notificar al servicio de WebSockets sobre la eliminación ---
    try {
      await firstValueFrom(
        this.httpService.post(this.NOTIFICATION_SERVICE_URL, {
          type: 'mascota_eliminada', // Tipo de evento
          // CORRECCIÓN: Usa 'mascotaToRemove' en lugar de 'removed'
          data: { id: mascotaToRemove.id, name: mascotaToRemove.name }, // Envía datos básicos para identificar lo eliminado
          service: 'microservice-mascotas',
        }),
      );
      console.log('Notificación "mascota_eliminada" enviada al servicio de WebSockets.');
    } catch (error) {
      console.error('Error al enviar notificación de mascota eliminada:', error.response?.data || error.message);
    }
    // -------------------------------------------------------------

    return mascotaToRemove;
  }
}
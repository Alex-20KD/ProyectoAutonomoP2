import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity'; // Posible modificación de ruta
import { CreateSolicitudAdopcionInput } from './dto/create-solicitud_adopcion.input'; // Posible modificación de ruta
import { UpdateSolicitudAdopcionInput } from './dto/update-solicitud_adopcion.input'; // Posible modificación de ruta

@Injectable()
export class SolicitudAdopcionService {
  constructor(
    @InjectRepository(SolicitudAdopcion)
    private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>,
  ) {}

  async create(
    createSolicitudAdopcionInput: CreateSolicitudAdopcionInput,
  ): Promise<SolicitudAdopcion> {
    const newSolicitud = this.solicitudAdopcionRepository.create(
      createSolicitudAdopcionInput,
    );
    return await this.solicitudAdopcionRepository.save(newSolicitud);
  }

  async findAll(): Promise<SolicitudAdopcion[]> {
    return await this.solicitudAdopcionRepository.find();
  }

  async findOne(id: number): Promise<SolicitudAdopcion> {
    const solicitud = await this.solicitudAdopcionRepository.findOne({
      where: { id },
    });
    if (!solicitud) {
      throw new NotFoundException(
        `Solicitud de adopción con ID "${id}" no encontrada.`,
      );
    }
    return solicitud;
  }

  async update(
    id: number,
    updateSolicitudAdopcionInput: UpdateSolicitudAdopcionInput,
  ): Promise<SolicitudAdopcion> {
    const solicitudToUpdate = await this.solicitudAdopcionRepository.preload({
      ...updateSolicitudAdopcionInput,
    });

    if (!solicitudToUpdate) {
      throw new NotFoundException(
        `Solicitud de adopción con ID "${id}" no encontrada.`,
      );
    }
    return await this.solicitudAdopcionRepository.save(solicitudToUpdate);
  }

  async remove(id: number): Promise<SolicitudAdopcion> {
    const solicitudToRemove = await this.solicitudAdopcionRepository.findOne({
      where: { id },
    });
    if (!solicitudToRemove) {
      throw new NotFoundException(
        `Solicitud de adopción con ID "${id}" no encontrada.`,
      );
    }
    await this.solicitudAdopcionRepository.remove(solicitudToRemove);
    return solicitudToRemove;
  }
}
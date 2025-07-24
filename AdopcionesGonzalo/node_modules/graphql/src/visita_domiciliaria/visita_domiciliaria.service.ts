import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity'; // Posible modificación de ruta
import { CreateVisitaDomiciliariaInput } from './dto/create-visita_domiciliaria.input'; // Posible modificación de ruta
import { UpdateVisitaDomiciliariaInput } from './dto/update-visita_domiciliaria.input'; // Posible modificación de ruta

@Injectable()
export class VisitaDomiciliariaService {
  constructor(
    @InjectRepository(VisitaDomiciliaria)
    private readonly visitaDomiciliariaRepository: Repository<VisitaDomiciliaria>,
  ) {}

  async create(
    createVisitaDomiciliariaInput: CreateVisitaDomiciliariaInput,
  ): Promise<VisitaDomiciliaria> {
    const newVisita = this.visitaDomiciliariaRepository.create(
      createVisitaDomiciliariaInput,
    );
    return await this.visitaDomiciliariaRepository.save(newVisita);
  }

  async findAll(): Promise<VisitaDomiciliaria[]> {
    return await this.visitaDomiciliariaRepository.find();
  }

  async findOne(id: number): Promise<VisitaDomiciliaria> {
    const visita = await this.visitaDomiciliariaRepository.findOne({
      where: { id },
    });
    if (!visita) {
      throw new NotFoundException(
        `Visita domiciliaria con ID "${id}" no encontrada.`,
      );
    }
    return visita;
  }

  async update(
    id: number,
    updateVisitaDomiciliariaInput: UpdateVisitaDomiciliariaInput,
  ): Promise<VisitaDomiciliaria> {
    const visitaToUpdate = await this.visitaDomiciliariaRepository.preload({
      ...updateVisitaDomiciliariaInput, // El ID ya viene en updateVisitaDomiciliariaInput
    });

    if (!visitaToUpdate) {
      throw new NotFoundException(
        `Visita domiciliaria con ID "${id}" no encontrada.`,
      );
    }
    return await this.visitaDomiciliariaRepository.save(visitaToUpdate);
  }

  async remove(id: number): Promise<VisitaDomiciliaria> {
    const visitaToRemove = await this.visitaDomiciliariaRepository.findOne({
      where: { id },
    });
    if (!visitaToRemove) {
      throw new NotFoundException(
        `Visita domiciliaria con ID "${id}" no encontrada.`,
      );
    }
    await this.visitaDomiciliariaRepository.remove(visitaToRemove);
    return visitaToRemove;
  }
}
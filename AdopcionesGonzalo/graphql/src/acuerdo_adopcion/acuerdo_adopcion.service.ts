import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity'; // Posible modificación de ruta
import { CreateAcuerdoAdopcionInput } from './dto/create-acuerdo_adopcion.input'; // Posible modificación de ruta
import { UpdateAcuerdoAdopcionInput } from './dto/update-acuerdo_adopcion.input'; // Posible modificación de ruta

@Injectable()
export class AcuerdoAdopcionService {
  constructor(
    @InjectRepository(AcuerdoAdopcion)
    private readonly acuerdoAdopcionRepository: Repository<AcuerdoAdopcion>,
  ) {}

  async create(
    createAcuerdoAdopcionInput: CreateAcuerdoAdopcionInput,
  ): Promise<AcuerdoAdopcion> {
    const newAcuerdo = this.acuerdoAdopcionRepository.create(
      createAcuerdoAdopcionInput,
    );
    return await this.acuerdoAdopcionRepository.save(newAcuerdo);
  }

  async findAll(): Promise<AcuerdoAdopcion[]> {
    return await this.acuerdoAdopcionRepository.find();
  }

  async findOne(id: number): Promise<AcuerdoAdopcion> {
    const acuerdo = await this.acuerdoAdopcionRepository.findOne({
      where: { id },
    });
    if (!acuerdo) {
      throw new NotFoundException(
        `Acuerdo de adopción con ID "${id}" no encontrado.`,
      );
    }
    return acuerdo;
  }

  async update(
    id: number,
    updateAcuerdoAdopcionInput: UpdateAcuerdoAdopcionInput,
  ): Promise<AcuerdoAdopcion> {
    const acuerdoToUpdate = await this.acuerdoAdopcionRepository.preload({
      ...updateAcuerdoAdopcionInput, // El ID ya viene en updateAcuerdoAdopcionInput
    });

    if (!acuerdoToUpdate) {
      throw new NotFoundException(
        `Acuerdo de adopción con ID "${id}" no encontrado.`,
      );
    }
    return await this.acuerdoAdopcionRepository.save(acuerdoToUpdate);
  }

  async remove(id: number): Promise<AcuerdoAdopcion> {
    const acuerdoToRemove = await this.acuerdoAdopcionRepository.findOne({
      where: { id },
    });
    if (!acuerdoToRemove) {
      throw new NotFoundException(
        `Acuerdo de adopción con ID "${id}" no encontrado.`,
      );
    }
    await this.acuerdoAdopcionRepository.remove(acuerdoToRemove);
    return acuerdoToRemove;
  }
}
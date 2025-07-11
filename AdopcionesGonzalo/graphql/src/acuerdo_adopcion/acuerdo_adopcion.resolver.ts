import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'; // Asegúrate de importar ID si lo usas en algún lugar, aunque aquí usamos Int
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity'; // Posible modificación de ruta
import { CreateAcuerdoAdopcionInput } from './dto/create-acuerdo_adopcion.input'; // Posible modificación de ruta
import { UpdateAcuerdoAdopcionInput } from './dto/update-acuerdo_adopcion.input'; // Posible modificación de ruta

@Resolver(() => AcuerdoAdopcion)
export class AcuerdoAdopcionResolver {
  constructor(
    private readonly acuerdoAdopcionService: AcuerdoAdopcionService,
  ) {}

  @Mutation(() => AcuerdoAdopcion, { name: 'createAcuerdoAdopcion' })
  createAcuerdoAdopcion(
    @Args('createAcuerdoAdopcionInput')
    createAcuerdoAdopcionInput: CreateAcuerdoAdopcionInput,
  ): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.create(createAcuerdoAdopcionInput);
  }

  @Query(() => [AcuerdoAdopcion], { name: 'acuerdosAdopcion' }) // Nombre de la query en plural
  findAll(): Promise<AcuerdoAdopcion[]> {
    return this.acuerdoAdopcionService.findAll();
  }

  @Query(() => AcuerdoAdopcion, { name: 'acuerdoAdopcion' }) // Nombre de la query en singular
  findOne(
    @Args('id', { type: () => Int }) // Usamos Int para IDs numéricos
    id: number,
  ): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.findOne(id);
  }

  @Mutation(() => AcuerdoAdopcion, { name: 'updateAcuerdoAdopcion' })
  updateAcuerdoAdopcion(
    @Args('updateAcuerdoAdopcionInput')
    updateAcuerdoAdopcionInput: UpdateAcuerdoAdopcionInput,
  ): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.update(
      updateAcuerdoAdopcionInput.id, // El ID viene del DTO de actualización
      updateAcuerdoAdopcionInput,
    );
  }

  @Mutation(() => AcuerdoAdopcion, { name: 'removeAcuerdoAdopcion' })
  removeAcuerdoAdopcion(
    @Args('id', { type: () => Int }) // Usamos Int para IDs numéricos
    id: number,
  ): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.remove(id);
  }
}
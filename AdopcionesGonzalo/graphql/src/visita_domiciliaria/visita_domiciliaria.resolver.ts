import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'; // Asegúrate de importar ID si lo usas en algún lugar, aunque aquí usamos Int
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity'; // Posible modificación de ruta
import { CreateVisitaDomiciliariaInput } from './dto/create-visita_domiciliaria.input'; // Posible modificación de ruta
import { UpdateVisitaDomiciliariaInput } from './dto/update-visita_domiciliaria.input'; // Posible modificación de ruta

@Resolver(() => VisitaDomiciliaria)
export class VisitaDomiciliariaResolver {
  constructor(
    private readonly visitaDomiciliariaService: VisitaDomiciliariaService,
  ) {}

  @Mutation(() => VisitaDomiciliaria, { name: 'createVisitaDomiciliaria' })
  createVisitaDomiciliaria(
    @Args('createVisitaDomiciliariaInput')
    createVisitaDomiciliariaInput: CreateVisitaDomiciliariaInput,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.create(createVisitaDomiciliariaInput);
  }

  @Query(() => [VisitaDomiciliaria], { name: 'visitasDomiciliarias' }) // Nombre de la query en plural
  findAll(): Promise<VisitaDomiciliaria[]> {
    return this.visitaDomiciliariaService.findAll();
  }

  @Query(() => VisitaDomiciliaria, { name: 'visitaDomiciliaria' }) // Nombre de la query en singular
  findOne(
    @Args('id', { type: () => Int }) // Usamos Int para IDs numéricos
    id: number,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.findOne(id);
  }

  @Mutation(() => VisitaDomiciliaria, { name: 'updateVisitaDomiciliaria' })
  updateVisitaDomiciliaria(
    @Args('updateVisitaDomiciliariaInput')
    updateVisitaDomiciliariaInput: UpdateVisitaDomiciliariaInput,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.update(
      updateVisitaDomiciliariaInput.id, // El ID viene del DTO de actualización
      updateVisitaDomiciliariaInput,
    );
  }

  @Mutation(() => VisitaDomiciliaria, { name: 'removeVisitaDomiciliaria' })
  removeVisitaDomiciliaria(
    @Args('id', { type: () => Int }) // Usamos Int para IDs numéricos
    id: number,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.remove(id);
  }
}
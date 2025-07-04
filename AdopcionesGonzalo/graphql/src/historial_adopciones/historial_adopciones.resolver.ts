import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistorialAdopcionesService } from './historial_adopciones.service';
import { HistorialAdopcione } from './entities/historial_adopcione.entity';
import { CreateHistorialAdopcioneInput } from './dto/create-historial_adopcione.input';
import { UpdateHistorialAdopcioneInput } from './dto/update-historial_adopcione.input';

@Resolver(() => HistorialAdopcione)
export class HistorialAdopcionesResolver {
  constructor(private readonly historialAdopcionesService: HistorialAdopcionesService) {}

  @Mutation(() => HistorialAdopcione)
  createHistorialAdopcione(@Args('createHistorialAdopcioneInput') createHistorialAdopcioneInput: CreateHistorialAdopcioneInput) {
    return this.historialAdopcionesService.create(createHistorialAdopcioneInput);
  }

  @Query(() => [HistorialAdopcione], { name: 'historialAdopciones' })
  findAll() {
    return this.historialAdopcionesService.findAll();
  }

  @Query(() => HistorialAdopcione, { name: 'historialAdopcione' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.historialAdopcionesService.findOne(id);
  }

  @Mutation(() => HistorialAdopcione)
  updateHistorialAdopcione(@Args('updateHistorialAdopcioneInput') updateHistorialAdopcioneInput: UpdateHistorialAdopcioneInput) {
    return this.historialAdopcionesService.update(updateHistorialAdopcioneInput.id, updateHistorialAdopcioneInput);
  }

  @Mutation(() => HistorialAdopcione)
  removeHistorialAdopcione(@Args('id', { type: () => Int }) id: number) {
    return this.historialAdopcionesService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity';
import { CreateSolicitudAdopcionInput } from './dto/create-solicitud_adopcion.input';
import { UpdateSolicitudAdopcionInput } from './dto/update-solicitud_adopcion.input';

@Resolver(() => SolicitudAdopcion)
export class SolicitudAdopcionResolver {
  constructor(private readonly solicitudAdopcionService: SolicitudAdopcionService) {}

  @Mutation(() => SolicitudAdopcion)
  createSolicitudAdopcion(@Args('createSolicitudAdopcionInput') createSolicitudAdopcionInput: CreateSolicitudAdopcionInput) {
    return this.solicitudAdopcionService.create(createSolicitudAdopcionInput);
  }

  @Query(() => [SolicitudAdopcion], { name: 'solicitudAdopcion' })
  findAll() {
    return this.solicitudAdopcionService.findAll();
  }

  @Query(() => SolicitudAdopcion, { name: 'solicitudAdopcion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudAdopcionService.findOne(id);
  }

  @Mutation(() => SolicitudAdopcion)
  updateSolicitudAdopcion(@Args('updateSolicitudAdopcionInput') updateSolicitudAdopcionInput: UpdateSolicitudAdopcionInput) {
    return this.solicitudAdopcionService.update(updateSolicitudAdopcionInput.id, updateSolicitudAdopcionInput);
  }

  @Mutation(() => SolicitudAdopcion)
  removeSolicitudAdopcion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudAdopcionService.remove(id);
  }
}

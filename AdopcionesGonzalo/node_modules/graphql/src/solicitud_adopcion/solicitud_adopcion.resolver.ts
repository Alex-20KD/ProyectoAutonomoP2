import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity'; // Posible modificación de ruta
import { CreateSolicitudAdopcionInput } from './dto/create-solicitud_adopcion.input'; // Posible modificación de ruta
import { UpdateSolicitudAdopcionInput } from './dto/update-solicitud_adopcion.input'; // Posible modificación de ruta

@Resolver(() => SolicitudAdopcion)
export class SolicitudAdopcionResolver {
  constructor( private readonly solicitudAdopcionService: SolicitudAdopcionService) {}

  @Mutation(() => SolicitudAdopcion, { name: 'createSolicitudAdopcion' })
  createSolicitudAdopcion(@Args('createSolicitudAdopcionInput') createSolicitudAdopcionInput: CreateSolicitudAdopcionInput)
  : Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.create(createSolicitudAdopcionInput);
  }

  @Query(() => [SolicitudAdopcion], { name: 'solicitudesAdopcion' }) // Nombre de la query en plural
  findAll(): Promise<SolicitudAdopcion[]> {
    return this.solicitudAdopcionService.findAll();
  }

  @Query(() => SolicitudAdopcion, { name: 'solicitudAdopcion' }) // Nombre de la query en singular
  findOne(@Args('id', { type: () => Int }) id: number,)
  : Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.findOne(id);
  }

  @Mutation(() => SolicitudAdopcion, { name: 'updateSolicitudAdopcion' })
  updateSolicitudAdopcion(@Args('updateSolicitudAdopcionInput') updateSolicitudAdopcionInput: UpdateSolicitudAdopcionInput)
  : Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.update(updateSolicitudAdopcionInput.id, updateSolicitudAdopcionInput);
  }

  @Mutation(() => SolicitudAdopcion, { name: 'removeSolicitudAdopcion' })
  removeSolicitudAdopcion(@Args('id', { type: () => Int }) id: number,)
  : Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.remove(id);
  }
}
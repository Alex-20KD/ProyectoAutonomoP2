// api-gateway/src/modules/adoptante-gateway/adoptante.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'; // <-- Asegúrate de que Resolver esté importado
import { AdoptanteClientService } from './adoptante-client.service';
import { AdoptanteType } from './dto/adoptante.type';
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';

@Resolver(() => AdoptanteType)
export class AdoptanteResolver {
  constructor(private readonly adoptanteClientService: AdoptanteClientService) {}

  @Query(() => [AdoptanteType], { name: 'adoptantes', description: 'Obtiene todos los adoptantes' })
  async findAllAdoptantes(): Promise<AdoptanteType[]> {
    return this.adoptanteClientService.findAll();
  }

  @Query(() => AdoptanteType, { name: 'adoptante', description: 'Obtiene un adoptante por ID', nullable: true })
  async findOneAdoptante(@Args('id', { type: () => ID }) id: string): Promise<AdoptanteType | null> {
    return this.adoptanteClientService.findOne(id);
  }

  @Mutation(() => AdoptanteType, { name: 'createAdoptante', description: 'Crea un nuevo adoptante' })
  async createAdoptante(@Args('input') input: CreateAdoptanteInput): Promise<AdoptanteType> {
    return this.adoptanteClientService.create(input);
  }

  @Mutation(() => AdoptanteType, { name: 'updateAdoptante', description: 'Actualiza un adoptante existente' })
  async updateAdoptante(
    @Args('id', { type: () => ID }) id: string, // El ID se pasa como un argumento GraphQL separado
    @Args('input') input: UpdateAdoptanteInput,
  ): Promise<AdoptanteType> {
    return this.adoptanteClientService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeAdoptante', description: 'Elimina un adoptante por ID' })
  async removeAdoptante(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.adoptanteClientService.remove(id);
  }
}
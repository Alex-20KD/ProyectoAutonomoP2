import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdoptanteService } from './adoptante.service';
import { Adoptante } from './entities/adoptante.entity';
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';

@Resolver(() => Adoptante)
export class AdoptanteResolver {
  constructor(private readonly adoptanteService: AdoptanteService) {}

  @Mutation(() => Adoptante)
  createAdoptante(@Args('createAdoptanteInput') createAdoptanteInput: CreateAdoptanteInput)
  : Promise<Adoptante> {
    return this.adoptanteService.create(createAdoptanteInput);
  }

  @Query(() => [Adoptante], { name: 'adoptantes' })
  findAll(): Promise<Adoptante[]> {
    return this.adoptanteService.findAll();
  }

  @Query(() => Adoptante, { name: 'adoptante' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.adoptanteService.findOne(id);
  }

  @Mutation(() => Adoptante)
  updateAdoptante(@Args('updateAdoptanteInput') updateAdoptanteInput: UpdateAdoptanteInput)
  : Promise<Adoptante> {
    return this.adoptanteService.update(updateAdoptanteInput.id, updateAdoptanteInput);
  }

  @Mutation(() => Adoptante)
  removeAdoptante(@Args('id', { type: () => Number}) id: number): Promise<Adoptante> {
    return this.adoptanteService.remove(id);
  }
}

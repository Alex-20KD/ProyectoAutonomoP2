import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdoptanteService } from './adoptante.service';
import { Adoptante } from './entities/adoptante.entity';
import { CreateAdoptanteInput } from './dto/create-adoptante.input';
import { UpdateAdoptanteInput } from './dto/update-adoptante.input';

@Resolver(() => Adoptante)
export class AdoptanteResolver {
  constructor(private readonly adoptanteService: AdoptanteService) {}

  @Mutation(() => Adoptante)
  createAdoptante(@Args('createAdoptanteInput') createAdoptanteInput: CreateAdoptanteInput) {
    return this.adoptanteService.create(createAdoptanteInput);
  }

  @Query(() => [Adoptante], { name: 'adoptante' })
  findAll() {
    return this.adoptanteService.findAll();
  }

  @Query(() => Adoptante, { name: 'adoptante' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adoptanteService.findOne(id);
  }

  @Mutation(() => Adoptante)
  updateAdoptante(@Args('updateAdoptanteInput') updateAdoptanteInput: UpdateAdoptanteInput) {
    return this.adoptanteService.update(updateAdoptanteInput.id, updateAdoptanteInput);
  }

  @Mutation(() => Adoptante)
  removeAdoptante(@Args('id', { type: () => Int }) id: number) {
    return this.adoptanteService.remove(id);
  }
}

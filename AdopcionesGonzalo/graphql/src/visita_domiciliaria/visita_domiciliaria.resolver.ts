import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity';
import { CreateVisitaDomiciliariaInput } from './dto/create-visita_domiciliaria.input';
import { UpdateVisitaDomiciliariaInput } from './dto/update-visita_domiciliaria.input';

@Resolver(() => VisitaDomiciliaria)
export class VisitaDomiciliariaResolver {
  constructor(private readonly visitaDomiciliariaService: VisitaDomiciliariaService) {}

  @Mutation(() => VisitaDomiciliaria)
  createVisitaDomiciliaria(@Args('createVisitaDomiciliariaInput') createVisitaDomiciliariaInput: CreateVisitaDomiciliariaInput) {
    return this.visitaDomiciliariaService.create(createVisitaDomiciliariaInput);
  }

  @Query(() => [VisitaDomiciliaria], { name: 'visitaDomiciliaria' })
  findAll() {
    return this.visitaDomiciliariaService.findAll();
  }

  @Query(() => VisitaDomiciliaria, { name: 'visitaDomiciliaria' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.visitaDomiciliariaService.findOne(id);
  }

  @Mutation(() => VisitaDomiciliaria)
  updateVisitaDomiciliaria(@Args('updateVisitaDomiciliariaInput') updateVisitaDomiciliariaInput: UpdateVisitaDomiciliariaInput) {
    return this.visitaDomiciliariaService.update(updateVisitaDomiciliariaInput.id, updateVisitaDomiciliariaInput);
  }

  @Mutation(() => VisitaDomiciliaria)
  removeVisitaDomiciliaria(@Args('id', { type: () => Int }) id: number) {
    return this.visitaDomiciliariaService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity';
import { CreateAcuerdoAdopcionInput } from './dto/create-acuerdo_adopcion.input';
import { UpdateAcuerdoAdopcionInput } from './dto/update-acuerdo_adopcion.input';

@Resolver(() => AcuerdoAdopcion)
export class AcuerdoAdopcionResolver {
  constructor(private readonly acuerdoAdopcionService: AcuerdoAdopcionService) {}

  @Mutation(() => AcuerdoAdopcion)
  createAcuerdoAdopcion(@Args('createAcuerdoAdopcionInput') createAcuerdoAdopcionInput: CreateAcuerdoAdopcionInput) {
    return this.acuerdoAdopcionService.create(createAcuerdoAdopcionInput);
  }

  @Query(() => [AcuerdoAdopcion], { name: 'acuerdoAdopcion' })
  findAll() {
    return this.acuerdoAdopcionService.findAll();
  }

  @Query(() => AcuerdoAdopcion, { name: 'acuerdoAdopcion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.acuerdoAdopcionService.findOne(id);
  }

  @Mutation(() => AcuerdoAdopcion)
  updateAcuerdoAdopcion(@Args('updateAcuerdoAdopcionInput') updateAcuerdoAdopcionInput: UpdateAcuerdoAdopcionInput) {
    return this.acuerdoAdopcionService.update(updateAcuerdoAdopcionInput.id, updateAcuerdoAdopcionInput);
  }

  @Mutation(() => AcuerdoAdopcion)
  removeAcuerdoAdopcion(@Args('id', { type: () => Int }) id: number) {
    return this.acuerdoAdopcionService.remove(id);
  }
}

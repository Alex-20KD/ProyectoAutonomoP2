import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MascotaService } from './mascota.service';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaInput } from './dto/create-mascota.input';
import { UpdateMascotaInput } from './dto/update-mascota.input';

@Resolver(() => Mascota)
export class MascotaResolver {
  constructor(private readonly mascotaService: MascotaService) {}

  @Mutation(() => Mascota)
  createMascota(@Args('createMascotaInput') createMascotaInput: CreateMascotaInput)
  : Promise<Mascota> {
    return this.mascotaService.create(createMascotaInput);
  }

  @Query(() => [Mascota], { name: 'mascotas' })
  findAll(): Promise<Mascota[]> {
    return this.mascotaService.findAll();
  }

  @Query(() => Mascota, { name: 'mascota' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.mascotaService.findOne(id);
  }

  @Mutation(() => Mascota)
  updateMascota(@Args('updateMascotaInput') updateMascotaInput: UpdateMascotaInput)
  : Promise<Mascota> {
    return this.mascotaService.update(updateMascotaInput.id, updateMascotaInput);
  }

  @Mutation(() => Mascota)
  removeMascota(@Args('id', { type: () => Number }) id: number): Promise<Mascota> {
    return this.mascotaService.remove(id);
  }
}

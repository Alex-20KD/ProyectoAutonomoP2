import { CreateMascotaInput } from './create-mascota.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMascotaInput extends PartialType(CreateMascotaInput) {
  @Field(() => Int)
  id: number;
}

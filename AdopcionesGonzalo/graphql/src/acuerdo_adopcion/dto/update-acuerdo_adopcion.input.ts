import { CreateAcuerdoAdopcionInput } from './create-acuerdo_adopcion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAcuerdoAdopcionInput extends PartialType(CreateAcuerdoAdopcionInput) {
  @Field(() => Int)
  id: number;
}

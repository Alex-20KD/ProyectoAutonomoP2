import { CreateAcuerdoAdopcionInput } from './create-acuerdo_adopcion.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateAcuerdoAdopcionInput  extends PartialType(CreateAcuerdoAdopcionInput) {

  @Field(() => ID)
  @IsUUID()
  id: number;

}

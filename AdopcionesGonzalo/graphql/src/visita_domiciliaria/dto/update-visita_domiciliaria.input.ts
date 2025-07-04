import { CreateVisitaDomiciliariaInput } from './create-visita_domiciliaria.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVisitaDomiciliariaInput extends PartialType(CreateVisitaDomiciliariaInput) {
  @Field(() => Int)
  id: number;
}

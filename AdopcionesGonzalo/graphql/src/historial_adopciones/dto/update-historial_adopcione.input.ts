import { CreateHistorialAdopcioneInput } from './create-historial_adopcione.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHistorialAdopcioneInput extends PartialType(CreateHistorialAdopcioneInput) {
  @Field(() => Int)
  id: number;
}

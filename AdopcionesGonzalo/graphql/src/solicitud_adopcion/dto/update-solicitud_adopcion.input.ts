import { CreateSolicitudAdopcionInput } from './create-solicitud_adopcion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSolicitudAdopcionInput extends PartialType(CreateSolicitudAdopcionInput) {
  @Field(() => Int)
  id: number;
}

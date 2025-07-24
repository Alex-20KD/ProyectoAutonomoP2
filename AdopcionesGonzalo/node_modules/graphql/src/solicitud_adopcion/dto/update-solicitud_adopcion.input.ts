import { CreateSolicitudAdopcionInput } from './create-solicitud_adopcion.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateSolicitudAdopcionInput  extends PartialType(CreateSolicitudAdopcionInput) {

  @Field(() => ID)
  @IsUUID()
  id: number;

}

import { VisitaDomiciliaria } from '../entities/visita_domiciliaria.entity';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateVisitaDomiciliariaInput  extends PartialType(VisitaDomiciliaria) {

  @Field(() => ID)
  @IsUUID()
  id: number;

}

import { IsUUID } from 'class-validator';
import { CreateMascotaInput } from './create-mascota.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMascotaInput extends PartialType(CreateMascotaInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: number;
  
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMascotaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

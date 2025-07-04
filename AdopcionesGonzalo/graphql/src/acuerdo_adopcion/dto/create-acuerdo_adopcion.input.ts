import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAcuerdoAdopcionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

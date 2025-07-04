import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVisitaDomiciliariaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

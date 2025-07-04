import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VisitaDomiciliaria {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

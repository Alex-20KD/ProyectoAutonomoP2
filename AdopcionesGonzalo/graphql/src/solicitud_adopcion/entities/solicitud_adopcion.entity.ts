import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SolicitudAdopcion {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

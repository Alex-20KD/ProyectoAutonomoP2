// api-gateway/src/modules/adoptante-gateway/dto/adoptante.type.ts
import { Field, ID, ObjectType } from '@nestjs/graphql'; // <-- ¡Asegúrate que ObjectType esté importado!

@ObjectType() // <-- ¡Asegúrate que este decorador esté presente!
export class AdoptanteType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  telefono!: number;

  @Field()
  direccion!: string;

  @Field()
  tipo_documento!: string;

  @Field()
  numero_documento!: number;

  @Field()
  fecha_registro!: Date;

  @Field()
  status!: boolean;
}
// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'; // ¡Importar!
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // ¡Importar!
import { join } from 'path';

// ... (otros imports como AdoptanteGatewayModule)
import { AdoptanteGatewayModule } from './modules/adoptante-gateway/adoptante-gateway.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({ // <--- ¡Asegúrate que esta configuración esté aquí!
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    AdoptanteGatewayModule, // <--- ¡Y este módulo también!
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
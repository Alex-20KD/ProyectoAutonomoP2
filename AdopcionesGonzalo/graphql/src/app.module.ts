import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptanteModule } from './adoptante/adoptante.module';
import { MascotaModule } from './mascota/mascota.module';
import { SolicitudAdopcionModule } from './solicitud_adopcion/solicitud_adopcion.module';
import { VisitaDomiciliariaModule } from './visita_domiciliaria/visita_domiciliaria.module';
import { AcuerdoAdopcionModule } from './acuerdo_adopcion/acuerdo_adopcion.module';
import { HistorialAdopcionesModule } from './historial_adopciones/historial_adopciones.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';  // Assuming you're using TypeORM for database interactions
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';  // For path manipulation
// Assuming you have a config module for configuration management

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo de base de datos
    database: 'db.sqlite', // Nombre del archivo de la base de datos
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true, // Carga automática de entidades
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AdoptanteModule, MascotaModule, SolicitudAdopcionModule, VisitaDomiciliariaModule, AcuerdoAdopcionModule, HistorialAdopcionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

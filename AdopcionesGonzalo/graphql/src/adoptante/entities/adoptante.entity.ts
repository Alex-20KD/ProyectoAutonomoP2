// src/adoptante/entities/adoptante.entity.ts
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export enum AdoptanteEstado {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
  SUSPENDIDO = 'Suspendido',
  PENDIENTE_VERIFICACION = 'Pendiente_Verificacion',
}

registerEnumType(AdoptanteEstado, {
  name: 'AdoptanteEstado', // Este será el nombre del ENUM en tu esquema GraphQL
});

@ObjectType({ description: 'Representa a una persona interesada en adoptar una mascota.' })
@Entity('Adoptante')
export class Adoptante {
  @Field(() => Int, { description: 'Identificador único del adoptante.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Nombre completo del adoptante.' })
  @Column()
  nombre: string;

  @Field({ description: 'Apellido(s) del adoptante.' })
  @Column()
  apellido: string;

  @Field({ description: 'Correo electrónico único del adoptante.' })
  @Column({ unique: true })
  correo: string;

  @Field({ description: 'Número de contacto telefónico del adoptante.' })
  @Column({ length: 20 })
  telefono: string;

  @Field({ description: 'Dirección completa de residencia del adoptante.' })
  @Column('text')
  direccion: string;

  @Field({ description: 'Ciudad de residencia del adoptante.' })
  @Column({ length: 100 })
  ciudad: string;

  @Field({ description: 'País de residencia del adoptante.' })
  @Column({ length: 100 })
  pais: string;

  @Field({ description: 'Tipo de documento de identidad del adoptante (DNI, Pasaporte, etc.).' })
  @Column()
  tipo_documento: string;

  @Field({ description: 'Número del documento de identidad del adoptante.' })
  @Column({ length: 50, unique: true })
  numero_documento: string;

  @Field({ description: 'Fecha y hora en que el adoptante se registró en el sistema.' })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @Field(() => AdoptanteEstado, { description: 'Estado actual del adoptante en el sistema.' })
  @Column({
    type: 'varchar', // <-- ¡CAMBIO AQUÍ! Usar varchar o text para SQLite
    // Puedes mantener 'enum' aquí para la validación del lado de TypeORM si lo deseas,
    // pero el tipo de columna en la DB será 'varchar'.
    // Alternativamente, puedes eliminar 'enum' y solo especificar 'varchar'
    enum: AdoptanteEstado, // Esto le dice a TypeORM los valores válidos
    default: AdoptanteEstado.PENDIENTE_VERIFICACION
  })
  estado: AdoptanteEstado;
}
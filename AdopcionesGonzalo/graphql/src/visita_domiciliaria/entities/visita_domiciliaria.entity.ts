import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Adoptante } from '../../adoptante/entities/adoptante.entity'; // Posible modificación de ruta
// import { Personal } from '../../personal/entities/personal.entity'; // Descomentar y ajustar ruta si tienes una entidad Personal

@Entity('VisitaDomiciliaria')
@ObjectType()
export class VisitaDomiciliaria {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field(() => Int)
  @Index() // Opcional: crea un índice en esta columna para búsquedas eficientes
  adoptanteId!: number; // Columna para la FK explícita

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  fechaVisita!: Date;

  @Column({ type: 'text' })
  @Field(() => String)
  direccionVerificada!: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  observaciones?: string;

  @Column({ type: 'varchar', length: 50 }) // Será un string para el resultado
  @Field(() => String)
  resultado!: string; // 'Aprobada', 'Condicional', 'Rechazada'

  @Column({ nullable: true }) // Permite que sea opcional si no tienes la entidad Personal
  @Field(() => Int, { nullable: true })
  @Index() // Opcional: crea un índice en esta columna para búsquedas eficientes
  inspectorId?: number; // Columna para la FK explícita (si tienes entidad Personal)

  // Relación ManyToOne con Adoptante
  @ManyToOne(() => Adoptante, (adoptante) => adoptante.visitasDomiciliarias, {
    onDelete: 'CASCADE', // Opcional: Si se elimina un adoptante, se eliminan sus visitas
  })
  @JoinColumn({ name: 'adoptanteId' }) // Especifica la columna FK
  @Field(() => Adoptante)
  adoptante!: Adoptante;

  // Relación ManyToOne con Personal (descomentar si tienes la entidad Personal)
  /*
  @ManyToOne(() => Personal, (personal) => personal.visitasDomiciliarias)
  @JoinColumn({ name: 'inspectorId' })
  @Field(() => Personal, { nullable: true })
  inspector?: Personal;
  */
}
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SolicitudAdopcion } from '../../solicitud_adopcion/entities/solicitud_adopcion.entity'; 

@Entity('AcuerdoAdopcion')
@ObjectType()
export class AcuerdoAdopcion {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field(() => Int)
  @Index()
  solicitudId!: number; // Columna para la FK explícita

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  fechaAcuerdo!: Date;

  @Column({ type: 'varchar', length: 50 }) // Será un string para el tipo de acuerdo
  @Field(() => String)
  tipoAcuerdo!: string; // 'Temporal', 'Permanente'

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  duracionMeses?: number;

  @Column({ type: 'date' })
  @Field(() => Date)
  fechaInicio!: Date;

  @Column({ type: 'date', nullable: true })
  @Field(() => Date, { nullable: true })
  fechaFinEstimada?: Date;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  condicionesEspeciales?: string;

  @Column({ type: 'varchar', length: 50, default: 'Activo' }) // Estado del acuerdo
  @Field(() => String)
  estadoAcuerdo!: string; // 'Activo', 'Finalizado', 'Incumplido'

  // Relación ManyToOne con SolicitudAdopcion
  @ManyToOne(() => SolicitudAdopcion,(solicitudAdopcion) => solicitudAdopcion.acuerdosAdopcion,{ onDelete: 'CASCADE' },)
  @JoinColumn({ name: 'solicitudId' })
  @Field(() => SolicitudAdopcion)
  solicitud!: SolicitudAdopcion;
}
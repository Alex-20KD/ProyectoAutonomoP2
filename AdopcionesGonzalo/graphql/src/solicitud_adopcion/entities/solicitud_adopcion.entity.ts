import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Adoptante } from '../../adoptante/entities/adoptante.entity';
import { Mascota } from '../../mascota/entities/mascota.entity';
import { AcuerdoAdopcion } from '../../acuerdo_adopcion/entities/acuerdo_adopcion.entity'; // Importa AcuerdoAdopcion

@Entity('SolicitudAdopcion') 
@ObjectType()
export class SolicitudAdopcion {
  @PrimaryGeneratedColumn() 
  @Field(() => ID)
  id!: number; 

 
  @Column()
  @Field(() => ID)
  adoptanteId!: number; 

  @Column()
  @Field(() => ID)
  mascotaId!: number; 

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  fechaSolicitud!: Date;

  @Column() 
  @Field(() => String)
  estado!: string; 

  @Column() 
  @Field(() => String)
  tipoAdopcion!: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  comentariosAdoptante?: string;

  @Column({ type: 'datetime', nullable: true })
  @Field(() => Date, { nullable: true })
  fechaAprobacionRechazo?: Date;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  motivoRechazo?: string;

  // Relación ManyToOne con Adoptante
  @ManyToOne(() => Adoptante, (adoptante) => adoptante.solicitudesAdopcion) 
  @JoinColumn({ name: 'adoptanteId' }) // Especifica la columna FK
  @Field(() => Adoptante)
  adoptante!: Adoptante; 

  // Relación ManyToOne con Mascota
  @ManyToOne(() => Mascota, (mascota) => mascota.solicitudesAdopcion) 
  @JoinColumn({ name: 'mascotaId' }) 
  @Field(() => Mascota)
  mascota!: Mascota; 

  // --- AÑADE ESTA RELACIÓN UNO-A-MUCHOS ---
  @OneToMany(() => AcuerdoAdopcion, (acuerdo) => acuerdo.solicitud)
  @Field(() => [AcuerdoAdopcion], { nullable: true })
  acuerdosAdopcion?: AcuerdoAdopcion[];
}
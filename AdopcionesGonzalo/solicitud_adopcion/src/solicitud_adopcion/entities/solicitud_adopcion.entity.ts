import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('SolicitudAdopcion')
export class SolicitudAdopcion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  adoptanteId!: string;

  @Column()
  mascotaId!: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaSolicitud!: Date;

  @Column()
  estado!: string;

  @Column()
  tipoAdopcion!: string;

  @Column({ type: 'text', nullable: true })
  comentariosAdoptante?: string;

  @Column({ type: 'datetime', nullable: true })
  fechaAprobacionRechazo?: Date;

  @Column({ type: 'text', nullable: true })
  motivoRechazo?: string;
}
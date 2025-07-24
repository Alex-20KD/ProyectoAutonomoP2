import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Adoptante } from '../../adoptante/entities/adoptante.entity';
import { Mascota } from '../../mascota/entities/mascota.entity';
import { AcuerdoAdopcion } from '../../acuerdo_adopcion/entities/acuerdo_adopcion.entity';
import { VisitaDomiciliaria } from 'src/visita_domiciliaria/entities/visita_domiciliaria.entity';

@Entity('SolicitudAdopcion')
export class SolicitudAdopcion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @ManyToOne(() => Adoptante, (adoptante) => adoptante.solicitudesAdopcion)
  @JoinColumn({ name: 'adoptanteId' })
  adoptante!: Adoptante;

  @ManyToOne(() => Mascota, (mascota) => mascota.solicitudesAdopcion)
  @JoinColumn({ name: 'mascotaId' })
  mascota!: Mascota;

  @OneToMany(() => AcuerdoAdopcion, (acuerdo) => acuerdo.solicitud)
  acuerdosAdopcion?: AcuerdoAdopcion[];

  // --- ¡AÑADE ESTO! Relación inversa con SolicitudAdopcion ---
  @OneToMany(() => SolicitudAdopcion, (solicitudAdopcion) => solicitudAdopcion.adoptante)
  solicitudesAdopcion!: SolicitudAdopcion[];

  // Si también tienes VisitasDomiciliarias asociadas a un Adoptante, añádelo aquí:
  @OneToMany(() => VisitaDomiciliaria, (visitaDomiciliaria) => visitaDomiciliaria.adoptante)
  visitasDomiciliarias!: VisitaDomiciliaria[];
}
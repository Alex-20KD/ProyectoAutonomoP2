import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SolicitudAdopcion } from '../../solicitud_adopcion/entities/solicitud_adopcion.entity';

@Entity('AcuerdoAdopcion')
export class AcuerdoAdopcion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Index()
  solicitudId!: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaAcuerdo!: Date;

  @Column({ type: 'varchar', length: 50 })
  tipoAcuerdo!: string;

  @Column({ type: 'int', nullable: true })
  duracionMeses?: number;

  @Column({ type: 'date' })
  fechaInicio!: Date;

  @Column({ type: 'date', nullable: true })
  fechaFinEstimada?: Date;

  @Column({ type: 'text', nullable: true })
  condicionesEspeciales?: string;

  @Column({ type: 'varchar', length: 50, default: 'Activo' })
  estadoAcuerdo!: string;

  @ManyToOne(() => SolicitudAdopcion,(solicitudAdopcion) => solicitudAdopcion.acuerdosAdopcion,{ onDelete: 'CASCADE' },)
  @JoinColumn({ name: 'solicitudId' })
  solicitud!: SolicitudAdopcion;
}
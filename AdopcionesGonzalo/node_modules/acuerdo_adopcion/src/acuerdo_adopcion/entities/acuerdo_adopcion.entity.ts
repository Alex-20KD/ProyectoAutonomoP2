import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
@Entity('AcuerdoAdopcion')
export class AcuerdoAdopcion {
  @PrimaryGeneratedColumn()
  id!: number;

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

}
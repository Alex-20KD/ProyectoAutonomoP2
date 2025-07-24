
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('VisitaDomiciliaria')
export class VisitaDomiciliaria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  adoptanteId!: string; // Clave foránea que apunta al ID de Adoptante (UUID)

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaVisita!: Date;

  @Column({ type: 'text' })
  direccionVerificada!: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'varchar', length: 50 })
  resultado!: string;

  @Column({ nullable: true })
  @Index()
  inspectorId?: number;

}
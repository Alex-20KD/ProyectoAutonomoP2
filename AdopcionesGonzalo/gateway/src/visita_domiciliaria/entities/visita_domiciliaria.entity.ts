// src/visita_domiciliaria/entities/visita_domiciliaria.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';
import { Adoptante } from '../../adoptante/entities/adoptante.entity'; // Asegúrate de importar Adoptante

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

  // --- ¡AÑADE O VERIFICA QUE ESTA RELACIÓN EXISTE EXACTAMENTE ASÍ! ---
  @ManyToOne(() => Adoptante, (adoptante) => adoptante.visitasDomiciliarias, {
    onDelete: 'CASCADE', // O la acción que desees al eliminar un Adoptante
  })
  @JoinColumn({ name: 'adoptanteId' }) // Especifica la columna FK en esta tabla
  adoptante!: Adoptante; // Esta es la propiedad 'adoptante' que debe existir aquí
}
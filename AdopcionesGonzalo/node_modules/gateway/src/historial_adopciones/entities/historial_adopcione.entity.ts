import { Adoptante } from 'src/adoptante/entities/adoptante.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('HistorialAdoptante')
export class HistorialAdopcione {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  solicitud_id: number;

  @Column()
  adopciones_permanentes: number;

  @Column()
  adopciones_temporales: number;

  @Column({ type: 'datetime' })
  fecha_ultima_adopcion: Date;

  @Column()
  calificacion: number;

  @Column()
  notas: string;

  // Solo una definición de la relación OneToOne.
  // La propiedad inversa en Adoptante debe llamarse 'historial'
  @OneToOne(() => Adoptante, (adoptante) => adoptante.historial)
  @JoinColumn() // JoinColumn es necesario para el lado propietario de la relación OneToOne
  adoptante!: Adoptante;
}
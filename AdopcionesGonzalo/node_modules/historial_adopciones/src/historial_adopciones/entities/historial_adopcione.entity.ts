import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('HistorialAdoptante')
export class HistorialAdopcione {
  @PrimaryGeneratedColumn()
  id: number;

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

}
import { Adoptante } from 'src/adoptante/entities/adoptante.entity';
import { SolicitudAdopcion } from 'src/solicitud_adopcion/entities/solicitud_adopcion.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Mascota')
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  especie: string;

  @Column()
  raza: string;

  @Column({ type: 'int' })
  edad: number;

  @Column()
  genero: string;

  @Column()
  descripcion: string;

  @Column()
  foto_url: string;

  @Column({ default: true })
  estado_adopcion: boolean;

  @ManyToOne(() => Adoptante, (adoptante) => adoptante.mascotas, { nullable: true })
  adoptante: Adoptante;

  @OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.mascota)
  solicitudesAdopcion!: SolicitudAdopcion[]; // Esta es la única definición correcta
}
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { SolicitudAdopcion } from 'src/solicitud_adopcion/entities/solicitud_adopcion.entity';
import { HistorialAdopcione } from 'src/historial_adopciones/entities/historial_adopcione.entity';
import { VisitaDomiciliaria } from 'src/visita_domiciliaria/entities/visita_domiciliaria.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Adoptante')
export class Adoptante {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  telefono!: number;

  @Column()
  direccion!: string;

  @Column()
  tipo_documento!: string;

  @Column()
  numero_documento!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro!: Date;

  @Column({ default: true })
  status!: boolean;

  // Esta es la única definición correcta para la relación OneToOne con HistorialAdopcione
  @OneToOne(() => HistorialAdopcione, (historial) => historial.adoptante, { cascade: true })
  @JoinColumn()
  historial!: HistorialAdopcione; // Usamos '!' para indicar que TypeORM la inicializará

  @OneToMany(() => Mascota, (mascota) => mascota.adoptante)
  mascotas!: Mascota[]; // Usamos '!' si siempre es un array, aunque esté vacío

  @OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.adoptante)
  solicitudesAdopcion!: SolicitudAdopcion[]; // Usamos '!' si siempre es un array

  @OneToMany(() => VisitaDomiciliaria, (visita) => visita.adoptante)
  visitasDomiciliarias!: VisitaDomiciliaria[]; // Usamos '!' si siempre es un array
}
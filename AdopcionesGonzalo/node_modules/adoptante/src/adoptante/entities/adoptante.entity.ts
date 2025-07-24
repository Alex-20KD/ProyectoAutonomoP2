// microservicio-adoptantes/src/adoptante/entities/adoptante.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Adoptante')
export class Adoptante {
  @PrimaryGeneratedColumn()
  id!: number;

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

  // ¡Elimina las propiedades de relación con otras entidades aquí!
  // mascotas!: Mascota[];
  // solicitudesAdopcion!: SolicitudAdopcion[];
  // historial!: HistorialAdopcione;
  // visitasDomiciliarias!: VisitaDomiciliaria[];
}
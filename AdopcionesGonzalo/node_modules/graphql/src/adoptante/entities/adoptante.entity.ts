import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { SolicitudAdopcion } from 'src/solicitud_adopcion/entities/solicitud_adopcion.entity';
import { HistorialAdoptante } from 'src/historial_adopciones/entities/historial_adopcione.entity';
import { VisitaDomiciliaria } from 'src/visita_domiciliaria/entities/visita_domiciliaria.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Adoptante')
export class Adoptante {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: number;
  
  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field(() => Int)
  telefono!: number;

  @Column()
  @Field()
  direccion!: string;

  @Column()
  @Field()
  tipo_documento!: string;

  @Column()
  @Field(() => Int)
  numero_documento!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  fecha_registro!: Date;

  @Column({ default: true })
  @Field()
  status!: boolean;

  @OneToOne(() => HistorialAdoptante, (historial) => historial.adoptante, { cascade: true })
  @JoinColumn()
  @Field(() => HistorialAdoptante, { nullable: true })
  historial: HistorialAdoptante;
  
  // --- AÑADE ESTA RELACIÓN UNO-A-MUCHOS ---
  @OneToMany(() => Mascota, (mascota) => mascota.adoptante)
  @Field(() => [Mascota], { nullable: true })
  mascotas: Mascota[];

  // Relación OneToMany con SolicitudAdopcion
  @OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.adoptante)
  @Field(() => [SolicitudAdopcion], { nullable: true })
  solicitudesAdopcion?: SolicitudAdopcion[];

  // --- AÑADE ESTA RELACIÓN UNO-A-MUCHOS ---
  @OneToMany(() => VisitaDomiciliaria, (visita) => visita.adoptante)
  @Field(() => [VisitaDomiciliaria], { nullable: true })
  visitasDomiciliarias?: VisitaDomiciliaria[];
}

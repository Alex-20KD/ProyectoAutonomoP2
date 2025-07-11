import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Adoptante } from 'src/adoptante/entities/adoptante.entity';
import { SolicitudAdopcion } from 'src/solicitud_adopcion/entities/solicitud_adopcion.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('Mascota')
export class Mascota {

  @PrimaryGeneratedColumn()
  @Field(() =>ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  especie: string;

  @Column()
  @Field()
  raza: string;

  @Column({ type: 'int' })  
  @Field(() => Int)
  edad: number;

  @Column()
  @Field()
  genero: string;

  @Column()
  @Field()
  descripcion: string;

  @Column()
  @Field()
  foto_url: string;

  @Column({ default: true })
  @Field()
  estado_adopcion: boolean;

  @ManyToOne(() => Adoptante, (adoptante) => adoptante.mascotas, { nullable: true })
  @Field(() => Adoptante, { nullable: true })
  adoptante: Adoptante;

  // Relación OneToMany con SolicitudAdopcion
  @OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.mascota)
  @Field(() => [SolicitudAdopcion], { nullable: true })
  solicitudesAdopcion?: SolicitudAdopcion[];
}

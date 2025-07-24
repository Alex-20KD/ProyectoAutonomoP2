import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Adoptante } from 'src/adoptante/entities/adoptante.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('HistorialAdoptante')
export class HistorialAdoptante {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  solicitud_id: number;

  @Column()
  @Field()
  adopciones_permanentes: number;

  @Column()
  @Field()
  adopciones_temporales: number;

  @Column()
  @Field()
  fecha_ultima_adopcion: Date;

  @Column()
  @Field()
  calificacion: number;
  
  @Column()
  @Field()
  notas: string; 

  // --- AÑADE ESTA RELACIÓN INVERSA ---
  @OneToOne(() => Adoptante, (adoptante) => adoptante.historial)
  @Field(() => Adoptante)
  adoptante: Adoptante;
}
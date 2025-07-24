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

}
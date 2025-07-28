import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './mascota/entities/mascota.entity';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    // Verificar si ya hay datos
    const count = await this.mascotaRepository.count();
    if (count > 0) {
      console.log('Base de datos ya contiene datos, saltando seed');
      return;
    }

    console.log('Creando datos de prueba...');

    const mascotasPrueba = [
      {
        name: 'Max',
        especie: 'Perro',
        raza: 'Golden Retriever',
        edad: 3,
        genero: 'Macho',
        descripcion: 'Perro muy amigable y juguetón, ideal para familias con niños',
        foto_url: 'https://example.com/max.jpg',
        estado_adopcion: true,
      },
      {
        name: 'Luna',
        especie: 'Gato',
        raza: 'Siamés',
        edad: 2,
        genero: 'Hembra',
        descripcion: 'Gata tranquila y cariñosa, perfecta para apartamentos',
        foto_url: 'https://example.com/luna.jpg',
        estado_adopcion: true,
      },
      {
        name: 'Rocky',
        especie: 'Perro',
        raza: 'Pastor Alemán',
        edad: 5,
        genero: 'Macho',
        descripcion: 'Perro leal y protector, necesita espacio para correr',
        foto_url: 'https://example.com/rocky.jpg',
        estado_adopcion: true,
      },
      {
        name: 'Mimi',
        especie: 'Gato',
        raza: 'Persa',
        edad: 1,
        genero: 'Hembra',
        descripcion: 'Gatita joven muy dulce y sociable',
        foto_url: 'https://example.com/mimi.jpg',
        estado_adopcion: true,
      },
      {
        name: 'Toby',
        especie: 'Perro',
        raza: 'Beagle',
        edad: 4,
        genero: 'Macho',
        descripcion: 'Perro adoptado recientemente (no disponible)',
        foto_url: 'https://example.com/toby.jpg',
        estado_adopcion: false,
      },
    ];

    for (const mascotaData of mascotasPrueba) {
      const mascota = this.mascotaRepository.create(mascotaData);
      await this.mascotaRepository.save(mascota);
    }

    console.log(`✅ Se crearon ${mascotasPrueba.length} mascotas de prueba`);
  }
}

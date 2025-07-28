import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3002; // Usando puerto 3002 para evitar conflicto
  await app.listen(port);
  console.log(`🐾 Servicio de Mascotas ejecutándose en http://localhost:${port}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET  http://localhost:${port}/mascotas - Todas las mascotas`);
  console.log(`   GET  http://localhost:${port}/mascotas/disponibles - Mascotas disponibles`);
  console.log(`   POST http://localhost:${port}/mascotas - Crear mascota`);
}
bootstrap();

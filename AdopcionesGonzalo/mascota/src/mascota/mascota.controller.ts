import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { CreateMascotaDto } from './dto/create-mascota.dto'; 
import { UpdateMascotaDto } from './dto/update-mascota.dto'; 
import { Mascota } from './entities/mascota.entity'; 

@Controller('mascotas') // Es buena práctica usar el plural para los recursos REST
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createMascotaDto: CreateMascotaDto): Promise<Mascota> {
    return this.mascotaService.create(createMascotaDto);
  }

  @Get()
  findAll(): Promise<Mascota[]> {
    // >>> ¡ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ ASÍ Y NO DEVUELVA UN STRING ESTÁTICO! <<<
    return this.mascotaService.findAll();
  }

  @Get('disponibles')
  findDisponibles(): Promise<Mascota[]> {
    // Endpoint específico para mascotas disponibles para adopción
    return this.mascotaService.findDisponibles();
  }

  @Get(':id') // La ruta ahora es /mascotas/:id
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Mascota> {
    return this.mascotaService.findOne(id);
  }

  @Patch(':id') 
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateMascotaDto: UpdateMascotaDto,
  ): Promise<Mascota> {
    return this.mascotaService.update(id, updateMascotaDto);
  }

  @Delete(':id') 
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.mascotaService.remove(id);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { AdoptanteService } from './adoptante.service';
import { CreateAdoptanteDto } from './dto/create-adoptante.dto';
import { UpdateAdoptanteDto } from './dto/update-adoptante.dto';
import { Adoptante } from './entities/adoptante.entity'; 

@Controller('adoptantes') // Es buena práctica usar el plural para los recursos REST
export class AdoptanteController {
  constructor(private readonly adoptanteService: AdoptanteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created para la creación exitosa
  async create(@Body() createAdoptanteDto: CreateAdoptanteDto): Promise<Adoptante> {
    return this.adoptanteService.create(createAdoptanteDto);
  }

  @Get()
  findAll(): Promise<Adoptante[]> {
    // >>> ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ ASÍ Y NO DEVUELVA UN number ESTÁTICO <<<
    return this.adoptanteService.findAll();
  }

  @Get(':id') // La ruta ahora es /adoptantes/:id
  async findOne(@Param('id', ParseUUIDPipe) id: number): Promise<Adoptante> {
    return this.adoptanteService.findOne(id);
  }

  @Patch(':id') // La ruta ahora es /adoptantes/:id
  async update(
    @Param('id', ParseUUIDPipe) id: number, // Asegura que el ID de la URL sea un UUID number
    @Body() updateAdoptanteDto: UpdateAdoptanteDto,
  ): Promise<Adoptante> {
    return this.adoptanteService.update(id, updateAdoptanteDto);
  }

  @Delete(':id') // La ruta ahora es /adoptantes/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content para eliminaciones exitosas
  async remove(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    await this.adoptanteService.remove(id);
  }
}
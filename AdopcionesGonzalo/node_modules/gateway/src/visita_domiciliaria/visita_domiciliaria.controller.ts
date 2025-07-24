import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { CreateVisitaDomiciliariaDto } from './dto/create-visita_domiciliaria.dto';
import { UpdateVisitaDomiciliariaDto } from './dto/update-visita_domiciliaria.dto';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity'; // Importa la entidad para tipado de retorno

@Controller('visitas-domiciliarias') // Es buena práctica usar el plural para los recursos REST
export class VisitaDomiciliariaController {
  constructor(private readonly visitaDomiciliariaService: VisitaDomiciliariaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created para la creación exitosa
  async create(@Body() createVisitaDomiciliariaDto: CreateVisitaDomiciliariaDto): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.create(createVisitaDomiciliariaDto);
  }

  @Get()
  async findAll(): Promise<VisitaDomiciliaria[]> {
    return this.visitaDomiciliariaService.findAll();
  }

  @Get(':id') // La ruta ahora es /visitas-domiciliarias/:id
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.findOne(id);
  }

  @Patch(':id') // La ruta ahora es /visitas-domiciliarias/:id
  async update(
    @Param('id', ParseIntPipe) id: number, // Usamos ParseIntPipe
    @Body() updateVisitaDomiciliariaDto: UpdateVisitaDomiciliariaDto,
  ): Promise<VisitaDomiciliaria> {
    return this.visitaDomiciliariaService.update(id, updateVisitaDomiciliariaDto);
  }

  @Delete(':id') // La ruta ahora es /visitas-domiciliarias/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content para eliminaciones exitosas
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.visitaDomiciliariaService.remove(id);
  }
}
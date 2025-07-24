import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { CreateVisitaDomiciliariaDto } from './dto/create-visita_domiciliaria.dto';
import { UpdateVisitaDomiciliariaDto } from './dto/update-visita_domiciliaria.dto';
import { VisitaDomiciliaria } from './entities/visita_domiciliaria.entity';

@Controller('visita-domiciliaria')
export class VisitaDomiciliariaController {
  constructor(private readonly visitaDomiciliariaService: VisitaDomiciliariaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVisitaDomiciliariaDto: CreateVisitaDomiciliariaDto): Promise<VisitaDomiciliaria> {
    // ¡Aquí se llama al servicio!
    return this.visitaDomiciliariaService.create(createVisitaDomiciliariaDto);
  }

  @Get()
  findAll(): Promise<VisitaDomiciliaria[]> {
    // ¡Aquí se llama al servicio!
    return this.visitaDomiciliariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<VisitaDomiciliaria> {
    // ¡Aquí se llama al servicio!
    return this.visitaDomiciliariaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitaDomiciliariaDto: UpdateVisitaDomiciliariaDto,
  ): Promise<VisitaDomiciliaria> {
    // ¡Aquí se llama al servicio!
    return this.visitaDomiciliariaService.update(id, updateVisitaDomiciliariaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content para eliminación exitosa
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Asumiendo que el servicio devuelve Promise<VisitaDomiciliaria> en remove
    // Y queremos que el controlador devuelva Promise<void> para 204 No Content
    return this.visitaDomiciliariaService.remove(id).then(() => { /* No hacer nada con el resultado */ });
    // Si tu servicio remove() ya devuelve Promise<void>, puedes simplemente:
    // return this.visitaDomiciliariaService.remove(id);
  }
}
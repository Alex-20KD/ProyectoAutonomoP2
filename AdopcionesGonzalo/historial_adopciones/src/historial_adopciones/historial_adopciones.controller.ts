import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { HistorialAdopcioneService } from './historial_adopciones.service'; // ¡CORREGIDO AQUÍ!
import { CreateHistorialAdopcioneDto } from './dto/create-historial_adopcione.dto';
import { UpdateHistorialAdopcioneDto } from './dto/update-historial_adopcione.dto';
import { HistorialAdopcione } from './entities/historial_adopcione.entity'; // Asegúrate de importar la entidad

@Controller('historial-adopciones')
export class HistorialAdopcionesController { // El nombre del controlador puede mantenerse en plural
  constructor(private readonly historialAdopcionesService: HistorialAdopcioneService) {} // ¡CORREGIDO AQUÍ el tipo inyectado!

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHistorialAdopcioneDto: CreateHistorialAdopcioneDto): Promise<HistorialAdopcione> {
    return this.historialAdopcionesService.create(createHistorialAdopcioneDto);
  }

  @Get()
  findAll(): Promise<HistorialAdopcione[]> {
    return this.historialAdopcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number): Promise<HistorialAdopcione> {
    return this.historialAdopcionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: number, @Body() updateHistorialAdopcioneDto: UpdateHistorialAdopcioneDto): Promise<HistorialAdopcione> {
    return this.historialAdopcionesService.update(id, updateHistorialAdopcioneDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: number): Promise<HistorialAdopcione> {
    return this.historialAdopcionesService.remove(id);
  }
}
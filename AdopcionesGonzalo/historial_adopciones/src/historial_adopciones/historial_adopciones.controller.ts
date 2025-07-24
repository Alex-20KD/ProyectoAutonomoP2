import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialAdopcionesService } from './historial_adopciones.service';
import { CreateHistorialAdopcioneDto } from './dto/create-historial_adopcione.dto';
import { UpdateHistorialAdopcioneDto } from './dto/update-historial_adopcione.dto';

@Controller('historial-adopciones')
export class HistorialAdopcionesController {
  constructor(private readonly historialAdopcionesService: HistorialAdopcionesService) {}

  @Post()
  create(@Body() createHistorialAdopcioneDto: CreateHistorialAdopcioneDto) {
    return this.historialAdopcionesService.create(createHistorialAdopcioneDto);
  }

  @Get()
  findAll() {
    return this.historialAdopcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialAdopcionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialAdopcioneDto: UpdateHistorialAdopcioneDto) {
    return this.historialAdopcionesService.update(+id, updateHistorialAdopcioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialAdopcionesService.remove(+id);
  }
}

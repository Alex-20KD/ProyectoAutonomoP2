import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud_adopcion.dto';
import { UpdateSolicitudAdopcionDto } from './dto/update-solicitud_adopcion.dto';

@Controller('solicitud-adopcion')
export class SolicitudAdopcionController {
  constructor(private readonly solicitudAdopcionService: SolicitudAdopcionService) {}

  @Post()
  create(@Body() createSolicitudAdopcionDto: CreateSolicitudAdopcionDto) {
    return this.solicitudAdopcionService.create(createSolicitudAdopcionDto);
  }

  @Get()
  findAll() {
    return this.solicitudAdopcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudAdopcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudAdopcionDto: UpdateSolicitudAdopcionDto) {
    return this.solicitudAdopcionService.update(+id, updateSolicitudAdopcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudAdopcionService.remove(+id);
  }
}

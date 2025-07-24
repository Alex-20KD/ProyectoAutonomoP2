import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { SolicitudAdopcionService } from './solicitud_adopcion.service';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud_adopcion.dto';
import { UpdateSolicitudAdopcionDto } from './dto/update-solicitud_adopcion.dto';
import { SolicitudAdopcion } from './entities/solicitud_adopcion.entity'; // Importa la entidad para tipado de retorno

@Controller('solicitudes-adopcion') // Es buena práctica usar el plural
export class SolicitudAdopcionController {
  constructor(private readonly solicitudAdopcionService: SolicitudAdopcionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSolicitudAdopcionDto: CreateSolicitudAdopcionDto): Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.create(createSolicitudAdopcionDto);
  }

  @Get()
  async findAll(): Promise<SolicitudAdopcion[]> {
    return this.solicitudAdopcionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SolicitudAdopcion> { // ¡CAMBIADO AQUÍ!
    return this.solicitudAdopcionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, // ¡CAMBIADO AQUÍ!
    @Body() updateSolicitudAdopcionDto: UpdateSolicitudAdopcionDto,
  ): Promise<SolicitudAdopcion> {
    return this.solicitudAdopcionService.update(id, updateSolicitudAdopcionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> { // ¡CAMBIADO AQUÍ!
    await this.solicitudAdopcionService.remove(id);
  }
}
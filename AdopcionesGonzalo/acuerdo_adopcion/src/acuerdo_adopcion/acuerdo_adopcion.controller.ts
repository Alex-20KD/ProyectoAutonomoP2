import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus,  NotFoundException, ParseUUIDPipe, } from '@nestjs/common';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { CreateAcuerdoAdopcionDto } from './dto/create-acuerdo_adopcion.dto';
import { UpdateAcuerdoAdopcionDto } from './dto/update-acuerdo_adopcion.dto';
import { AcuerdoAdopcion } from './entities/acuerdo_adopcion.entity'; // Importa la entidad para tipado de retorno

@Controller('acuerdos-adopcion') // Es buena práctica usar el plural para los recursos REST
export class AcuerdoAdopcionController {
  constructor(private readonly acuerdoAdopcionService: AcuerdoAdopcionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created para la creación exitosa
  async create(@Body() createAcuerdoAdopcionDto: CreateAcuerdoAdopcionDto): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.create(createAcuerdoAdopcionDto);
  }

  @Get()
  findAll(): Promise<AcuerdoAdopcion[]> {
    return this.acuerdoAdopcionService.findAll();
  }

  @Get(':id') // La ruta ahora es /acuerdos-adopcion/:id
  async findOne(@Param('id', ParseUUIDPipe) id: number): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.findOne(id);
  }

  @Patch(':id') // La ruta ahora es /acuerdos-adopcion/:id
  async update(
    @Param('id', ParseUUIDPipe) id: number, // Usamos ParseUUIDPipe
    @Body() updateAcuerdoAdopcionDto: UpdateAcuerdoAdopcionDto,
  ): Promise<AcuerdoAdopcion> {
    return this.acuerdoAdopcionService.update(id, updateAcuerdoAdopcionDto);
  }

  @Delete(':id') // La ruta ahora es /acuerdos-adopcion/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content para eliminaciones exitosas
  async remove(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    await this.acuerdoAdopcionService.remove(id);
  }
}
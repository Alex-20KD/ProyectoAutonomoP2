import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcuerdoAdopcionService } from './acuerdo_adopcion.service';
import { CreateAcuerdoAdopcionDto } from './dto/create-acuerdo_adopcion.dto';
import { UpdateAcuerdoAdopcionDto } from './dto/update-acuerdo_adopcion.dto';

@Controller('acuerdo-adopcion')
export class AcuerdoAdopcionController {
  constructor(private readonly acuerdoAdopcionService: AcuerdoAdopcionService) {}

  @Post()
  create(@Body() createAcuerdoAdopcionDto: CreateAcuerdoAdopcionDto) {
    return this.acuerdoAdopcionService.create(createAcuerdoAdopcionDto);
  }

  @Get()
  findAll() {
    return this.acuerdoAdopcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acuerdoAdopcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcuerdoAdopcionDto: UpdateAcuerdoAdopcionDto) {
    return this.acuerdoAdopcionService.update(+id, updateAcuerdoAdopcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acuerdoAdopcionService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitaDomiciliariaService } from './visita_domiciliaria.service';
import { CreateVisitaDomiciliariaDto } from './dto/create-visita_domiciliaria.dto';
import { UpdateVisitaDomiciliariaDto } from './dto/update-visita_domiciliaria.dto';

@Controller('visita-domiciliaria')
export class VisitaDomiciliariaController {
  constructor(private readonly visitaDomiciliariaService: VisitaDomiciliariaService) {}

  @Post()
  create(@Body() createVisitaDomiciliariaDto: CreateVisitaDomiciliariaDto) {
    return this.visitaDomiciliariaService.create(createVisitaDomiciliariaDto);
  }

  @Get()
  findAll() {
    return this.visitaDomiciliariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitaDomiciliariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitaDomiciliariaDto: UpdateVisitaDomiciliariaDto) {
    return this.visitaDomiciliariaService.update(+id, updateVisitaDomiciliariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitaDomiciliariaService.remove(+id);
  }
}

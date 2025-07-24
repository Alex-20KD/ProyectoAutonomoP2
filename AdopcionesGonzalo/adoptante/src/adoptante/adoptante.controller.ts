import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdoptanteService } from './adoptante.service';
import { CreateAdoptanteDto } from './dto/create-adoptante.dto';
import { UpdateAdoptanteDto } from './dto/update-adoptante.dto';

@Controller('adoptante')
export class AdoptanteController {
  constructor(private readonly adoptanteService: AdoptanteService) {}

  @Post()
  create(@Body() createAdoptanteDto: CreateAdoptanteDto) {
    return this.adoptanteService.create(createAdoptanteDto);
  }

  @Get()
  findAll() {
    return this.adoptanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptanteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdoptanteDto: UpdateAdoptanteDto) {
    return this.adoptanteService.update(+id, updateAdoptanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptanteService.remove(+id);
  }
}

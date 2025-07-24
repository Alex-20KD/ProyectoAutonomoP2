import { PartialType } from '@nestjs/mapped-types'; // Necesitas instalar @nestjs/mapped-types si no lo tienes
import { IsNumber } from 'class-validator'; // Mantiene IsUUID si los IDs son UUIDs, si son números, usa IsInt
import { CreateMascotaDto } from './create-mascota.dto';
//import { Type } from 'class-transformer';  

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
    @IsNumber() 
    id: number; 
}
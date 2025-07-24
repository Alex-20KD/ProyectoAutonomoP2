// api-gateway/src/modules/adoptante-gateway/adoptante-client.service.ts
import { Injectable } from '@nestjs/common'; // <-- Asegúrate de que Injectable esté importado
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AdoptanteClientService {
  private readonly ADOPTANTE_SERVICE_URL = 'http://localhost:3001/adoptante'; // Ajusta el puerto según tu configuración

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any[]> {
    const response: AxiosResponse<any[]> = await firstValueFrom(this.httpService.get<any[]>(this.ADOPTANTE_SERVICE_URL));
    return response.data;
  }

  async findOne(id: string): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(this.httpService.get<any>(`${this.ADOPTANTE_SERVICE_URL}/${id}`));
    return response.data;
  }

  async create(createAdoptanteDto: any): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(this.httpService.post<any>(this.ADOPTANTE_SERVICE_URL, createAdoptanteDto));
    return response.data;
  }

  async update(id: string, updateAdoptanteDto: any): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(this.httpService.patch<any>(`${this.ADOPTANTE_SERVICE_URL}/${id}`, updateAdoptanteDto));
    return response.data;
  }

  async remove(id: string): Promise<boolean> {
    await firstValueFrom(this.httpService.delete(`${this.ADOPTANTE_SERVICE_URL}/${id}`));
    return true;
  }
}
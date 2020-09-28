import { Injectable } from '@nestjs/common';
import { ServicioListarSalas } from 'src/dominio/sala/servicio/servicio-listar-salas';
import { SalaDto } from './dto/sala.dto';

@Injectable()
export class ManejadorListarSalas {
  constructor(private _servicioListarSalas: ServicioListarSalas) {}

  async ejecutar(): Promise<SalaDto[]> {
    return await this._servicioListarSalas.ejecutar();
  }
}

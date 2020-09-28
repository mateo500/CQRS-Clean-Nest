import { Injectable } from '@nestjs/common';
import { ServicioListarSalaPorId } from 'src/dominio/sala/servicio/servicio-listar-sala-por-id';
import { SalaDto } from './dto/sala.dto';

@Injectable()
export class ManejadorListarSalaPorId {
  constructor(private _servicioListarSalaPorId: ServicioListarSalaPorId) {}

  async ejecutar(salaId: string): Promise<SalaDto> {
    return await this._servicioListarSalaPorId.ejecutar(salaId);
  }
}

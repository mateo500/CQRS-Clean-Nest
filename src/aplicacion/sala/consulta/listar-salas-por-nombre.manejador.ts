import { Injectable } from '@nestjs/common';
import { ServicioListarSalaPorNombre } from 'src/dominio/sala/servicio/servicio-listar-sala-por-nombre';
import { SalaDto } from './dto/sala.dto';

@Injectable()
export class ManejadorListarSalaPorNombre {
  constructor(
    private _servicioListarSalaPorNombre: ServicioListarSalaPorNombre,
  ) {}

  async ejecutar(nombre: string): Promise<SalaDto[]> {
    return await this._servicioListarSalaPorNombre.ejecutar(nombre);
  }
}

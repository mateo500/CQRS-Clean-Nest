import { Injectable } from '@nestjs/common';
import { ServicioListarDiasDescuentos } from 'src/dominio/usuario/servicio/servicio-listar-dias-descuento';

@Injectable()
export class ManejadorListarDiasDescuentos {
  constructor(
    private _servicioListarDiasDescuentos: ServicioListarDiasDescuentos,
  ) {}

  async ejecutar(): Promise<{ diasDeDescuento: string[] }> {
    return await this._servicioListarDiasDescuentos.ejecutar();
  }
}

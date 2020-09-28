import { Injectable } from '@nestjs/common';
import { ListarDiasDescuentosHelper } from './helpers/listar-dias-descuento.helper';

@Injectable()
export class ServicioListarDiasDescuentos {
  constructor(
    private readonly _listarDiasDeDescuentosHelper: ListarDiasDescuentosHelper,
  ) {}

  async ejecutar(): Promise<{ diasDeDescuento: string[] }> {
    return await this._listarDiasDeDescuentosHelper.obtenerDiasDeFichero();
  }
}

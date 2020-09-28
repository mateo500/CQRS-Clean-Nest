import { Injectable } from '@nestjs/common';
import { ServicioActualizarDiasDescuento } from 'src/dominio/usuario/servicio/servicio-actualizar-dias-descuento';
import { ComandoActualizarDiasDeDescuentos } from './actualizar-dias-descuentos.comando';

@Injectable()
export class ManejadorActualizarDiasDeDescuentos {
  constructor(
    private readonly _servicioActualizarDiasDescuento: ServicioActualizarDiasDescuento,
  ) {}

  async ejecutar(
    comandoActualizarDiasDeDescuentos: ComandoActualizarDiasDeDescuentos,
  ) {
    const usuario = await this._servicioActualizarDiasDescuento.ejecutar(
      comandoActualizarDiasDeDescuentos.diasDeDescuento,
    );

    return usuario;
  }
}

import { Injectable } from '@nestjs/common';
import { ServicioSolicitarDescuento } from 'src/dominio/usuario/servicio/servicio-solicitar-descuento';

@Injectable()
export class ManejadorSolicitarDescuentos {
  constructor(
    private _servicioSolicitarDescuento: ServicioSolicitarDescuento,
  ) {}

  async ejecutar(
    nombre: string,
    tipoMembresia: string,
  ): Promise<{
    descuentoPorContinuidad: number;
    descuentoPorDia: number;
  }> {
    return await this._servicioSolicitarDescuento.ejecutar(
      nombre,
      tipoMembresia,
    );
  }
}

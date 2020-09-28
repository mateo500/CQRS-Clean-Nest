import { Injectable } from '@nestjs/common';
import { ErrorDiaDeDescuentoNoValido } from 'src/dominio/errores/error-dia-de-descuento-no-valido';
import { DIAS_AUTORIZADOS_PARA_DESCUENTOS } from '../constants/dias-descuento';
import { ActualizarDiasDeDescuentoHelper } from './helpers/actualizar-dias-descuento.helper';

@Injectable()
export class ServicioActualizarDiasDescuento {
  constructor(
    private readonly _actualizarDiasDeDescuentoHelper: ActualizarDiasDeDescuentoHelper,
  ) {}

  async ejecutar(diasActualizados: string[]) {
    diasActualizados.forEach(dia => {
      if (!DIAS_AUTORIZADOS_PARA_DESCUENTOS.includes(dia)) {
        throw new ErrorDiaDeDescuentoNoValido(
          'Dia de descuento no valido',
          400,
        );
      }
    });

    this._actualizarDiasDeDescuentoHelper.actualizarDiasEnFichero(
      diasActualizados,
    );
  }
}

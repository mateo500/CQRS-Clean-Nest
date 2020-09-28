import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorDiaDeDescuentoNoValido extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorDiaDeDescuentoNoValido.name, statusCode);
  }
}

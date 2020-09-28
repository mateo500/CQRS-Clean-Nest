import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorValorRequerido extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorValorRequerido.name, statusCode);
  }
}

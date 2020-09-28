import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorEstadoNoValido extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorEstadoNoValido.name, statusCode);
  }
}

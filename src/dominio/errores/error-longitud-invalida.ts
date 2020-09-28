import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorLongitudInvalida extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorLongitudInvalida.name, statusCode);
  }
}

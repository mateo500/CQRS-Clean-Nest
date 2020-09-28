import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorRolInvalido extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorRolInvalido.name, statusCode);
  }
}

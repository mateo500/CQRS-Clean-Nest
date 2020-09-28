import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorUsuarioNoEncontrado extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorUsuarioNoEncontrado.name, statusCode);
  }
}

import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorUsuarioNoAutorizado extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorUsuarioNoAutorizado.name, statusCode);
  }
}

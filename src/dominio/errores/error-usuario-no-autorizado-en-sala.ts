import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorUsuarioNoAutorizadoEnSala extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorUsuarioNoAutorizadoEnSala.name, statusCode);
  }
}

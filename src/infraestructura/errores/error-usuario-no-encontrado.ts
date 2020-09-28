import { ErrorDeInfraestructura } from './error-de-infraestructura';

export class ErrorUsuarioNoEncontradoEnBaseDeDatos extends ErrorDeInfraestructura {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorUsuarioNoEncontradoEnBaseDeDatos.name, statusCode);
  }
}

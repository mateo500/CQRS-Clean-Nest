import { ErrorDeInfraestructura } from './error-de-infraestructura';

export class ErrorSalaNoEncontradaEnBaseDeDatos extends ErrorDeInfraestructura {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorSalaNoEncontradaEnBaseDeDatos.name, statusCode);
  }
}

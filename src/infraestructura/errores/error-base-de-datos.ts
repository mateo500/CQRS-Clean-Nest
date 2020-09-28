import { ErrorDeInfraestructura } from './error-de-infraestructura';

export class ErrorEnBaseDeDatos extends ErrorDeInfraestructura {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorEnBaseDeDatos.name, statusCode);
  }
}

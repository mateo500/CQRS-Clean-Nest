import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorSalaFueraDeServicio extends ErrorDeNegocio {
  constructor(mensaje: string, statusCode?: number) {
    super(mensaje, ErrorSalaFueraDeServicio.name, statusCode);
  }
}

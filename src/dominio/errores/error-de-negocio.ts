export class ErrorDeNegocio extends Error {
  statusCode: number;

  constructor(mensaje: string, clase?: string, statusCode?: number) {
    super(mensaje);
    this.name = clase || ErrorDeNegocio.name;
    this.statusCode = statusCode || 500;
  }
}

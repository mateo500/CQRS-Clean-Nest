export class ErrorDeInfraestructura extends Error {
  statusCode: number;

  constructor(mensaje: string, clase?: string, statusCode?: number) {
    super(mensaje);
    this.name = clase || ErrorDeInfraestructura.name;
    this.statusCode = statusCode || 500;
  }
}

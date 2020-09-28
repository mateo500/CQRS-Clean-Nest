import { Injectable } from '@nestjs/common';
import { ServicioEliminarSala } from 'src/dominio/sala/servicio/servicio-eliminar-sala';

@Injectable()
export class ManejadorEliminarSala {
  constructor(private _servicioEliminarSala: ServicioEliminarSala) {}

  async ejecutar(_id: string) {
    return await this._servicioEliminarSala.ejecutar(_id);
  }
}

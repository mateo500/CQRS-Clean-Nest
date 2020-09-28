import { Injectable } from '@nestjs/common';
import { ServicioEliminarUsuario } from 'src/dominio/usuario/servicio/servicio-eliminar-usuario';

@Injectable()
export class ManejadorEliminarUsuario {
  constructor(private _servicioEliminarUsuario: ServicioEliminarUsuario) {}

  async ejecutar(nombre: string) {
    const usuario = await this._servicioEliminarUsuario.ejecutar(nombre);

    return usuario;
  }
}

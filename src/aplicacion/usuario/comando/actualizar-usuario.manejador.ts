import { Injectable } from '@nestjs/common';
import { ServicioActualizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';
import { ComandoActualizarUsuario } from './actualizar-usuario.comando';

@Injectable()
export class ManejadorActualizarUsuario {
  constructor(private _servicioActualizarUsuario: ServicioActualizarUsuario) {}

  async ejecutar(
    nombre: string,
    comandoActualizarUsuario: ComandoActualizarUsuario,
  ) {
    const usuario = await this._servicioActualizarUsuario.ejecutar(
      nombre,
      comandoActualizarUsuario,
    );

    return usuario;
  }
}

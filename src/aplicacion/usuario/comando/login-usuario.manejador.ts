import { Injectable } from '@nestjs/common';
import { ComandoLoginUsuario } from './login-usuario.comando';
import { ServicioLoginUsuario } from 'src/dominio/usuario/servicio/servicio-login-usuario';

@Injectable()
export class ManejadorLoginUsuario {
  constructor(private _servicioLoginUsuario: ServicioLoginUsuario) {}

  async ejecutar(comandoLoginUsuario: ComandoLoginUsuario) {
    const usuario = await this._servicioLoginUsuario.ejecutar(
      comandoLoginUsuario.nombre,
      comandoLoginUsuario.clave,
    );

    return usuario;
  }
}

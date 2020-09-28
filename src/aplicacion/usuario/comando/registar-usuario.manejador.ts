import { Injectable } from '@nestjs/common';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { ComandoRegistrarUsuario } from './registrar-usuario.comando';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

@Injectable()
export class ManejadorRegistrarUsuario {
  constructor(private _servicioRegistrarUsuario: ServicioRegistrarUsuario) {}

  async ejecutar(comandoRegistrarUsuario: ComandoRegistrarUsuario) {
    const nuevoUsuario = new Usuario(
      comandoRegistrarUsuario.nombre,
      comandoRegistrarUsuario.clave,
      comandoRegistrarUsuario.roles,
      comandoRegistrarUsuario.ingresos,
      comandoRegistrarUsuario.pagos,
      comandoRegistrarUsuario.activo,
      comandoRegistrarUsuario.entradasRestantes,
    );

    return await this._servicioRegistrarUsuario.ejecutar(nuevoUsuario);
  }
}

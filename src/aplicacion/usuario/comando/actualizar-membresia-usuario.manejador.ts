import { Injectable } from '@nestjs/common';
import { ServicioActualizarMembresia } from 'src/dominio/usuario/servicio/servicio-actualizar-membresia';
import { ComandoActualizarMembresia } from './actualizar-membresia-usuario.comando';

@Injectable()
export class ManejadorActualizarMembresia {
  constructor(
    private readonly _servicioActualizarMembresia: ServicioActualizarMembresia,
  ) {}

  async ejecutar(
    comandoActualizarMembresia: ComandoActualizarMembresia,
    nombre: string,
  ) {
    if (comandoActualizarMembresia.valor) {
      const usuario = await this._servicioActualizarMembresia.ejecutar(
        nombre,
        comandoActualizarMembresia.tipoMembresia,
        comandoActualizarMembresia.valor,
      );

      return usuario;
    } else {
      const usuario = await this._servicioActualizarMembresia.ejecutar(
        nombre,
        comandoActualizarMembresia.tipoMembresia,
      );

      return usuario;
    }
  }
}

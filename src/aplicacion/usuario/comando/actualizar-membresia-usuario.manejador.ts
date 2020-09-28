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
    const usuario = await this._servicioActualizarMembresia.ejecutar(
      nombre,
      comandoActualizarMembresia.pago.tipoMembresia,
    );

    return usuario;
  }
}

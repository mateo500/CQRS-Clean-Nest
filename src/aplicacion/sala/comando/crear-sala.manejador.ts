import { Injectable } from '@nestjs/common';
import { Sala } from 'src/dominio/sala/modelo/sala';
import { ServicioCrearSala } from 'src/dominio/sala/servicio/servicio-crear-sala';
import { ComandoCrearSala } from './crear-sala.comando';

@Injectable()
export class ManejadorCrearSala {
  constructor(private _servicioCrearSala: ServicioCrearSala) {}

  async ejecutar(comandoCrearSala: ComandoCrearSala) {
    const nuevaSala = new Sala(
      comandoCrearSala.nombreSala,
      comandoCrearSala.descripcion,
      comandoCrearSala.rolesAutorizados,
      comandoCrearSala.diasDisponible,
      comandoCrearSala.estado,
    );

    return await this._servicioCrearSala.ejecutar(nuevaSala);
  }
}

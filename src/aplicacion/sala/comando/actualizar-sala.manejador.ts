import { Injectable } from '@nestjs/common';
import { ServicioActualizarSala } from 'src/dominio/sala/servicio/servicio-actualizar-sala';
import { ComandoActualizarSala } from './actualizar-sala.comando';

@Injectable()
export class ManejadorActualizarSala {
  constructor(private _servicioActualizarSala: ServicioActualizarSala) {}

  async ejecutar(salaId: string, comandoActualizarSala: ComandoActualizarSala) {
    const nuevaSala = await this._servicioActualizarSala.ejecutar(
      salaId,
      comandoActualizarSala,
    );

    return nuevaSala;
  }
}

import { Injectable } from '@nestjs/common';
import { ServicioAccederSala } from 'src/dominio/sala/servicio/servicio-acceder-sala';
import { SalaDto } from './dto/sala.dto';

@Injectable()
export class ManejadorAccederSala {
  constructor(private _servicioAccederSala: ServicioAccederSala) {}

  async ejecutar(salaId: string, rolesUsuario: string[]): Promise<SalaDto> {
    return await this._servicioAccederSala.ejecutar(salaId, rolesUsuario);
  }
}

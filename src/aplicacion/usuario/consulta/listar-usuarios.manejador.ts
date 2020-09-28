import { Injectable } from '@nestjs/common';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { ServicioListarUsuarios } from 'src/dominio/usuario/servicio/servicio-listar-usuarios';

@Injectable()
export class ManejadorListarUsuarios {
  constructor(private _servicioListarUsuarios: ServicioListarUsuarios) {}

  async ejecutar(): Promise<UsuarioDto[]> {
    return await this._servicioListarUsuarios.ejecutar();
  }
}

import { Injectable } from '@nestjs/common';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { ServicioListarUsuarioPorNombre } from 'src/dominio/usuario/servicio/servicio-listar-usuario-por-nombre';

@Injectable()
export class ManejadorListarUsuarioPorNombre {
  constructor(
    private _servicioListarUsuarioPorNombre: ServicioListarUsuarioPorNombre,
  ) {}

  async ejecutar(nombre: string): Promise<UsuarioDto> {
    return await this._servicioListarUsuarioPorNombre.ejecutar(nombre);
  }
}

import { DaoUsuario } from '../puerto/dao/dao-usuario';

export class ServicioListarUsuarioPorNombre {
  constructor(private readonly _daoUsuario: DaoUsuario) {}

  async ejecutar(nombre: string) {
    const usuarioEncontrado = await this._daoUsuario.listarPorNombre(nombre);

    return usuarioEncontrado;
  }
}

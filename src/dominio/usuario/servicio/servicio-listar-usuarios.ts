import { DaoUsuario } from '../puerto/dao/dao-usuario';

export class ServicioListarUsuarios {
  constructor(private readonly _daoUsuario: DaoUsuario) {}

  async ejecutar() {
    const usuarioEncontrados = await this._daoUsuario.listar();

    return usuarioEncontrados;
  }
}

import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';

export class ServicioEliminarUsuario {
  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

  async ejecutar(nombre: string) {
    const usuarioEliminado = await this._repositorioUsuario.eliminarPorNombre(
      nombre,
    );

    return usuarioEliminado;
  }
}

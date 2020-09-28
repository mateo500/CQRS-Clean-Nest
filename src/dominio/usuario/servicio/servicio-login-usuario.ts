import { DaoUsuario } from '../puerto/dao/dao-usuario';
import { verify } from 'argon2';
import { ErrorUsuarioNoAutorizado } from 'src/dominio/errores/error-usuario-no-autorizado';
import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';

export class ServicioLoginUsuario {
  constructor(
    private readonly _daoUsuario: DaoUsuario,
    private readonly _repositorioUsuario: RepositorioUsuario,
  ) {}

  async ejecutar(nombre: string, clave: string) {
    const usuarioEncontrado = await this._daoUsuario.listarPorNombre(nombre);

    const claveConcuerda = await verify(usuarioEncontrado.clave, clave);

    if (!claveConcuerda || !usuarioEncontrado.activo) {
      throw new ErrorUsuarioNoAutorizado(
        'contraseña incorrecta o cuenta desactivada, porfavor comunicate con un administrador',
        401,
      );
    }

    await this._repositorioUsuario.agregarIngreso(usuarioEncontrado.nombre);

    if (
      usuarioEncontrado.entradasRestantes > 0 &&
      !usuarioEncontrado.roles.includes('admin')
    ) {
      return await this._repositorioUsuario.reducirNumeroDeEntradas(
        usuarioEncontrado.nombre,
        usuarioEncontrado.entradasRestantes - 1,
      );
    }

    return usuarioEncontrado;
  }
}

import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { Usuario } from '../modelo/usuario';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { hash } from 'argon2';

export class ServicioRegistrarUsuario {
  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

  async ejecutar(usuario: Usuario) {
    const buscarUsuario = await this._repositorioUsuario.existeNombreUsuario(
      usuario.nombre,
    );

    if (buscarUsuario) {
      throw new ErrorDeNegocio(
        `El nombre de usuario ${usuario.nombre} ya esta en uso`,
        ServicioRegistrarUsuario.name,
        400,
      );
    }

    const claveHashed = await hash(usuario.getClave);

    usuario.setClaveHashed = claveHashed;

    const usuarioCreado = await this._repositorioUsuario.guardar(usuario);

    return usuarioCreado;
  }
}

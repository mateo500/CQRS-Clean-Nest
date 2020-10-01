import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { hash } from 'bcrypt';
import { ComandoActualizarUsuario } from 'src/aplicacion/usuario/comando/actualizar-usuario.comando';

export class ServicioActualizarUsuario {
  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

  async ejecutar(nombre: string, datos: ComandoActualizarUsuario) {
    Object.keys(datos).forEach(function(key) {
      if (typeof datos[key] === 'undefined') {
        delete datos[key];
      }
    }); //remover propiedades undefined/

    if (datos.clave) {
      const claveHashed = await hash(datos.clave, 10);
      datos = { ...datos, clave: claveHashed };
    }

    const usuarioEncontrado = await this._repositorioUsuario.actualizarPorNombre(
      nombre,
      datos,
    );

    return usuarioEncontrado;
  }
}

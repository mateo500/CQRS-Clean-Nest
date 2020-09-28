import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';
import { TIPO_MEMBRESIAS } from '../constants/tipo-membresias';
import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';

export class ServicioActualizarMembresia {
  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

  async ejecutar(nombre: string, tipoMembresia: string) {
    if (!Object.keys(TIPO_MEMBRESIAS).includes(tipoMembresia)) {
      throw new ErrorRolInvalido('la membresia/rol introducida no es valida');
    }

    const membresiaActualizada = await this._repositorioUsuario.actualizarMembresia(
      TIPO_MEMBRESIAS[tipoMembresia],
      nombre,
    );

    return membresiaActualizada;
  }
}

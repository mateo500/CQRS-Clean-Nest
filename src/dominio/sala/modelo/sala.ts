import { ErrorEstadoNoValido } from 'src/dominio/errores/error-estado-no-valido';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';
import { Roles } from 'src/dominio/usuario/modelo/usuario';

export const NUMERO_MINIMO_CARACTERES_DESCRIPCION = 3;
export const NUMERO_MINIMO_CARACTERES_NOMBRE_SALA = 3;

export class Sala {
  readonly nombreSala: string;
  readonly descripcion: string;
  readonly rolesAutorizados: string[];
  readonly diasDisponible: string[];
  readonly estado: string;

  constructor(
    _nombreSala: string,
    _descripcion: string,
    _rolesAutorizados: string[],
    _diasDisponible: string[],
    _estado: string,
  ) {
    this.validarTamanoDescripcion(_descripcion);
    this.validarRoles(_rolesAutorizados);
    this.validarTamanoNombreSala(_nombreSala);
    this.validarEstado(_estado);

    this.nombreSala = _nombreSala;
    this.descripcion = _descripcion;
    this.rolesAutorizados = _rolesAutorizados;
    this.diasDisponible = _diasDisponible;
    this.estado = _estado;
  }

  private validarTamanoDescripcion(descripcion: string) {
    if (descripcion.length < NUMERO_MINIMO_CARACTERES_DESCRIPCION) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la descripcion debe ser ${NUMERO_MINIMO_CARACTERES_DESCRIPCION}`,
        400,
      );
    }
  }

  private validarTamanoNombreSala(nombre: string) {
    if (nombre.length < NUMERO_MINIMO_CARACTERES_NOMBRE_SALA) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo del nombre de la sala debe ser ${NUMERO_MINIMO_CARACTERES_NOMBRE_SALA}`,
        400,
      );
    }
  }

  private validarRoles(roles: string[]) {
    roles.forEach(rol => {
      if (!roles.includes(Roles[rol])) {
        throw new ErrorRolInvalido('El Rol ingresado no es valido', 400);
      }
    });
  }

  private validarEstado(estado: string) {
    if (estado !== 'disponible' && estado !== 'no-disponible') {
      throw new ErrorEstadoNoValido('El estado ingresado no es valido', 400);
    }
  }

  get getNombreSala(): string {
    return this.nombreSala;
  }

  get getDescripcion(): string {
    return this.descripcion;
  }

  get getRolesAutorizados(): string[] {
    return this.rolesAutorizados;
  }

  get getDiasDisponible(): string[] {
    return this.diasDisponible;
  }

  get getEstado(): string {
    return this.estado;
  }
}

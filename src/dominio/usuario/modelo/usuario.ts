import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';

export enum Roles {
  admin = 'admin',
  premium = 'premium',
  iniciante = 'iniciante',
  casual = 'casual',
}

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;

export class Usuario {
  readonly nombre: string;

  clave: string;

  readonly roles: string[];

  readonly ingresos: any[];

  readonly pagos: any[];

  readonly activo: boolean;

  readonly entradasRestantes: number;

  constructor(
    _nombre: string,
    _clave: string,
    _roles: string[],
    _ingresos: any[],
    _pagos: any[],
    _activo: boolean,
    _entradasRestantes: number,
  ) {
    this.validarRoles(_roles);
    this.validarTamanoClave(_clave);
    this.validarNombre(_nombre);
    this.nombre = _nombre;
    this.clave = _clave;
    this.roles = _roles;
    this.ingresos = _ingresos;
    this.pagos = _pagos;
    this.activo = _activo;
    this.entradasRestantes = _entradasRestantes;
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
        400,
      );
    }
  }

  private validarRoles(roles: string[]) {
    if (roles.length >= 1) {
      for (const rol of roles) {
        if (!roles.includes(Roles[rol])) {
          throw new ErrorRolInvalido('El Rol ingresado no es valido', 400);
        }
      }
    }
  }

  private validarNombre(nombre: string) {
    if (nombre.length < 3) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo del nombre debe ser ${3}`,
        400,
      );
    }
  }

  get getNombre(): string {
    return this.nombre;
  }

  get getClave(): string {
    return this.clave;
  }

  get getRoles(): string[] {
    return this.roles;
  }

  get getIngresos(): any[] {
    return this.ingresos;
  }

  get getPagos(): any[] {
    return this.pagos;
  }

  get getActivo(): boolean {
    return this.activo;
  }

  get getEntradasRestantes(): number {
    return this.entradasRestantes;
  }

  set setClaveHashed(clave: string) {
    this.clave = clave;
  }
}

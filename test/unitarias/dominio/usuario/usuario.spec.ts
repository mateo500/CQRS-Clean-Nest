import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';

describe('Usuario', () => {
  const _Usuario = Usuario as any;

  const rolesStub = ['admin', 'premium'];

  it('usuario con clave menor que 4 debería retornar error', () => {
    return expect(
      async () => new _Usuario('juan', '12', rolesStub),
    ).rejects.toStrictEqual(
      new ErrorLongitudInvalida('El tamaño mínimo de la clave debe ser 4'),
    );
  });

  it('rol invalido deberia retornar error', () => {
    return expect(
      async () => new _Usuario('juan', '12', ['admin2']),
    ).rejects.toStrictEqual(
      new ErrorRolInvalido('El Rol ingresado no es valido'),
    );
  });

  it('usuario con clave igual a 4 debería crear bien', () => {
    const usuario = new _Usuario('juan', '4123', ['admin'], [], [], false, 0);

    expect(usuario.nombre).toEqual('juan');
    expect(usuario.clave).toEqual('4123');
    expect(usuario.roles).toEqual(['admin']);
    expect(usuario.ingresos.length).toEqual(0);
    expect(usuario.pagos.length).toEqual(0);
    expect(usuario.activo).toBeFalsy();
    expect(usuario.entradasRestantes).toBe(0);
  });
});

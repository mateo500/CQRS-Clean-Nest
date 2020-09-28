import { ErrorEstadoNoValido } from 'src/dominio/errores/error-estado-no-valido';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';
import {
  NUMERO_MINIMO_CARACTERES_DESCRIPCION,
  NUMERO_MINIMO_CARACTERES_NOMBRE_SALA,
  Sala,
} from 'src/dominio/sala/modelo/sala';

describe('Sala', () => {
  const _Sala = Sala as any;

  it('deberia retornar error por nombre corto', () => {
    return expect(
      async () => new _Sala('sa', 'helloworld', ['admin']),
    ).rejects.toStrictEqual(
      new ErrorLongitudInvalida(
        `El tamaño mínimo del nombre de la sala debe ser ${NUMERO_MINIMO_CARACTERES_NOMBRE_SALA}`,
        400,
      ),
    );
  });

  it('deberia retornar error por descripcion corta', () => {
    return expect(
      async () => new Sala('pilates', 'he', ['admin'], ['lunes'], 'disponible'),
    ).rejects.toStrictEqual(
      new ErrorLongitudInvalida(
        `El tamaño mínimo de la descripcion debe ser ${NUMERO_MINIMO_CARACTERES_DESCRIPCION}`,
        400,
      ),
    );
  });

  it('deberia retornar error por estado incorrecto', () => {
    return expect(
      async () =>
        new Sala('pilates', 'hacer pilates', ['admin'], ['lunes'], 'ocupada'),
    ).rejects.toStrictEqual(
      new ErrorEstadoNoValido('El estado ingresado no es valido', 400),
    );
  });

  it('deberia retornar error por roles incorrectos', () => {
    return expect(
      async () =>
        new Sala(
          'pilates',
          'hacer pilates',
          ['deportista'],
          ['lunes'],
          'ocupada',
        ),
    ).rejects.toStrictEqual(
      new ErrorRolInvalido('El Rol ingresado no es valido', 400),
    );
  });

  it('deberia crear la sala correctamente', () => {
    const nuevaSala = new Sala(
      'pilates',
      'hacer pilates',
      ['admin'],
      ['lunes'],
      'disponible',
    );

    expect(nuevaSala.nombreSala).toBe('pilates');
    expect(nuevaSala.descripcion).toBe('hacer pilates');
    expect(nuevaSala.rolesAutorizados.length).toBe(1);
    expect(nuevaSala.estado).toBe('disponible');
    expect(nuevaSala.diasDisponible.length).toBe(1);
  });
});

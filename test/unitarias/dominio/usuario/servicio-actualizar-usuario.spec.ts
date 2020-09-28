import { SinonStubbedInstance } from 'sinon';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioActualizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioActualizarUsuario', () => {
  let servicioActualizarUsuario: ServicioActualizarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'actualizarPorNombre',
    ]);
    servicioActualizarUsuario = new ServicioActualizarUsuario(
      repositorioUsuarioStub,
    );
  });

  it('deberia fallar al no econtrar el usuario en base de datos', async () => {
    repositorioUsuarioStub.actualizarPorNombre.returns(
      Promise.reject(
        new ErrorUsuarioNoEncontradoEnBaseDeDatos(
          'usuario no encontrado en base de datos',
          404,
        ),
      ),
    );

    const datosPrueba: any = { nombre: 'camilo' };

    await expect(
      servicioActualizarUsuario.ejecutar('diego', datosPrueba),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoEncontradoEnBaseDeDatos(
        'usuario no encontrado en base de datos',
        404,
      ),
    );
    expect(repositorioUsuarioStub.actualizarPorNombre.getCalls().length).toBe(
      1,
    );
  });

  it('deberia actualizar el usuario en base de datos', async () => {
    const usuarioPrueba = {
      _id: '1234567899',
      nombre: 'diego',
      clave: 'clave',
      roles: ['admin'],
      ingresos: [],
      pagos: [],
      activo: true,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    repositorioUsuarioStub.actualizarPorNombre.returns(
      Promise.resolve(usuarioPrueba),
    );

    const datosPrueba: any = { nombre: 'camilo' };

    await expect(
      servicioActualizarUsuario.ejecutar('diego', datosPrueba),
    ).resolves.toEqual(usuarioPrueba);
    expect(repositorioUsuarioStub.actualizarPorNombre.getCalls().length).toBe(
      1,
    );
  });
});

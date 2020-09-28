import { SinonStubbedInstance } from 'sinon';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioActualizarMembresia } from 'src/dominio/usuario/servicio/servicio-actualizar-membresia';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioActualizarMembresia', () => {
  let servicioActualizarMembresia: ServicioActualizarMembresia;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'actualizarMembresia',
    ]);
    servicioActualizarMembresia = new ServicioActualizarMembresia(
      repositorioUsuarioStub,
    );
  });

  it('deberia falla al no encontrar el usuario en la base de datos', async () => {
    repositorioUsuarioStub.actualizarMembresia.returns(
      Promise.reject(
        new ErrorUsuarioNoEncontradoEnBaseDeDatos(
          'usuario no encontrado en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioActualizarMembresia.ejecutar('diego', 'premium'),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoEncontradoEnBaseDeDatos(
        'usuario no encontrado en base de datos',
        404,
      ),
    );
    expect(repositorioUsuarioStub.actualizarMembresia.getCalls().length).toBe(
      1,
    );
  });

  it('deberia actualizar la membresia del usuario', async () => {
    const usuarioPrueba = {
      _id: '1234567899',
      nombre: 'diego',
      clave: 'clave',
      roles: [],
      ingresos: [],
      pagos: [],
      activo: true,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    repositorioUsuarioStub.actualizarMembresia.returns(
      Promise.resolve({ ...usuarioPrueba, roles: ['premium'] }),
    );

    await expect(
      servicioActualizarMembresia.ejecutar('diego', 'premium'),
    ).resolves.toEqual({ ...usuarioPrueba, roles: ['premium'] });
    expect(repositorioUsuarioStub.actualizarMembresia.getCalls().length).toBe(
      1,
    );
  });
});

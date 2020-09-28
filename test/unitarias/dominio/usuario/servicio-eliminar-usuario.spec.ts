import { SinonStubbedInstance } from 'sinon';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioEliminarUsuario } from 'src/dominio/usuario/servicio/servicio-eliminar-usuario';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioEliminarUsuario', () => {
  let servicioEliminarUsuario: ServicioEliminarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'eliminarPorNombre',
    ]);
    servicioEliminarUsuario = new ServicioEliminarUsuario(
      repositorioUsuarioStub,
    );
  });

  it('deberia arrojar error si el usuario no existe en base de datos', async () => {
    repositorioUsuarioStub.eliminarPorNombre.returns(
      Promise.reject(
        new ErrorUsuarioNoEncontradoEnBaseDeDatos(
          'usuario no encontrado en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioEliminarUsuario.ejecutar('diego'),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoEncontradoEnBaseDeDatos(
        'usuario no encontrado en base de datos',
        404,
      ),
    );
  });

  it('deberia eliminar el usuario en db y retornar el usuario eliminado', async () => {
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

    repositorioUsuarioStub.eliminarPorNombre.returns(
      Promise.resolve(usuarioPrueba),
    );

    const usuarioEliminado = await servicioEliminarUsuario.ejecutar('diego');

    expect(usuarioEliminado).toEqual(usuarioPrueba);
    expect(repositorioUsuarioStub.eliminarPorNombre.getCalls().length).toBe(1);
  });
});

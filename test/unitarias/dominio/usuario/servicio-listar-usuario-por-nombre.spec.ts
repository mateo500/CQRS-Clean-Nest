import { SinonStubbedInstance } from 'sinon';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ServicioListarUsuarioPorNombre } from 'src/dominio/usuario/servicio/servicio-listar-usuario-por-nombre';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioListarUsuarioPorNombre', () => {
  let servicioListarUsuarioPorNombre: ServicioListarUsuarioPorNombre;
  let daoUsuarioStub: SinonStubbedInstance<DaoUsuario>;

  beforeEach(() => {
    daoUsuarioStub = createStubObj<DaoUsuario>(['listarPorNombre']);
    servicioListarUsuarioPorNombre = new ServicioListarUsuarioPorNombre(
      daoUsuarioStub,
    );
  });

  it('deberia arrojar error si no se encuentra el usuario en base de datos', async () => {
    daoUsuarioStub.listarPorNombre.returns(
      Promise.reject(
        new ErrorUsuarioNoEncontradoEnBaseDeDatos(
          'usuario no encontrado en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioListarUsuarioPorNombre.ejecutar('usuarioTest'),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoEncontradoEnBaseDeDatos(
        'usuario no encontrado en base de datos',
        404,
      ),
    );
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
  });

  it('deberia retornar el usuario encontrado', async () => {
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

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioPrueba));

    const usuarioEncontrado = await servicioListarUsuarioPorNombre.ejecutar(
      'diego',
    );

    expect(usuarioEncontrado).toEqual(usuarioPrueba);
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
  });
});

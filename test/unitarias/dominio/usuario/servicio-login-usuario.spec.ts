import { hash } from 'bcrypt';
import { SinonStubbedInstance } from 'sinon';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioLoginUsuario } from 'src/dominio/usuario/servicio/servicio-login-usuario';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioLoginUsusario', () => {
  let servicioLoginUsuario: ServicioLoginUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;
  let daoUsuarioStub: SinonStubbedInstance<DaoUsuario>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'existeNombreUsuario',
      'guardar',
      'agregarIngreso',
      'reducirNumeroDeEntradas',
    ]);
    daoUsuarioStub = createStubObj<DaoUsuario>(['listarPorNombre']);
    servicioLoginUsuario = new ServicioLoginUsuario(
      daoUsuarioStub,
      repositorioUsuarioStub,
    );
  });

  it('si el nombre de usuario no existe, deberia retornar error', async () => {
    daoUsuarioStub.listarPorNombre.returns(
      Promise.reject(
        new ErrorUsuarioNoEncontradoEnBaseDeDatos(
          'usuario no encontrado en base de datos',
          404,
        ),
      ),
    );

    const testUser = new Usuario('diego', '4123', ['admin'], [], [], false, 0);

    await expect(
      servicioLoginUsuario.ejecutar(testUser.getNombre, testUser.getClave),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoEncontradoEnBaseDeDatos(
        'usuario no encontrado en base de datos',
        404,
      ),
    );
  });

  it('si la clave del usuario no concuerda con la almacenada en base de datos, deberia arrojar error', async () => {
    const clave = '12345';
    const claveHashedEnDb = await hash(clave, 10);

    daoUsuarioStub.listarPorNombre.returns(
      Promise.resolve({
        _id: '1234567899',
        nombre: 'diego',
        clave: claveHashedEnDb,
        roles: ['admin'],
        ingresos: [],
        pagos: [],
        activo: true,
        entradasRestantes: 0,
        createdAt: '',
        updatedAt: '',
      }),
    );

    const claveIncorrecta = '12345678';

    const registerUser = await servicioLoginUsuario
      .ejecutar('diego', claveIncorrecta)
      .catch(error => error.message);

    expect(registerUser).toBe(
      'contraseña incorrecta o cuenta desactivada, porfavor comunicate con un administrador',
    );
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
  });

  it('si la clave del usuario concuerda con la almacenada en base de datos pero la cuenta esta inactiva, deberia arrojar error', async () => {
    const clave = '12345';
    const claveHashedEnDb = await hash(clave, 10);

    daoUsuarioStub.listarPorNombre.returns(
      Promise.resolve({
        _id: '1234567899',
        nombre: 'diego',
        clave: claveHashedEnDb,
        roles: ['admin'],
        ingresos: [],
        pagos: [],
        activo: false,
        entradasRestantes: 0,
        createdAt: '',
        updatedAt: '',
      }),
    );

    const registrarUsuarioError = await servicioLoginUsuario
      .ejecutar('diego', clave)
      .catch(error => error.message);

    expect(registrarUsuarioError).toBe(
      'contraseña incorrecta o cuenta desactivada, porfavor comunicate con un administrador',
    );
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
  });

  it('si la clave del usuario concuerda con la almacenada en base de datos, deberia retornar informacion del usuario', async () => {
    const clave = '12345';
    const claveHashedEnDb = await hash(clave, 10);

    const usuarioPrueba = {
      _id: '1234567899',
      nombre: 'diego',
      clave: claveHashedEnDb,
      roles: ['admin'],
      ingresos: [],
      pagos: [],
      activo: true,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioPrueba));

    repositorioUsuarioStub.agregarIngreso.returns(Promise.resolve());

    const claveCorrecta = '12345';

    expect(await servicioLoginUsuario.ejecutar('diego', claveCorrecta)).toEqual(
      usuarioPrueba,
    );
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
    expect(repositorioUsuarioStub.agregarIngreso.getCalls().length).toBe(1);
  });

  it('se deberia agregar un ingreso al usuario logearse', async () => {
    const clave = '12345';
    const claveHashedEnDb = await hash(clave, 10);

    const usuarioPrueba = {
      _id: '1234567899',
      nombre: 'diego',
      clave: claveHashedEnDb,
      roles: ['admin'],
      ingresos: [],
      pagos: [],
      activo: true,
      entradasRestantes: 10,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioPrueba));

    repositorioUsuarioStub.agregarIngreso.returns(Promise.resolve());

    await servicioLoginUsuario.ejecutar('diego', clave);

    expect(
      repositorioUsuarioStub.agregarIngreso.calledWith(usuarioPrueba.nombre),
    ).toBeTruthy();

    expect(repositorioUsuarioStub.agregarIngreso.getCalls().length).toBe(1);
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
  });

  it('deberia retornar usuario con una entrada descontada si el usuario no es admin', async () => {
    const clave = '12345';
    const claveHashedEnDb = await hash(clave, 10);

    const usuarioPrueba = {
      _id: '1234567899',
      nombre: 'diego',
      clave: claveHashedEnDb,
      roles: ['premium'],
      ingresos: [],
      pagos: [],
      activo: true,
      entradasRestantes: 10,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioPrueba));

    repositorioUsuarioStub.agregarIngreso.returns(Promise.resolve());

    repositorioUsuarioStub.reducirNumeroDeEntradas.returns(
      Promise.resolve({
        ...usuarioPrueba,
        entradasRestantes: usuarioPrueba.entradasRestantes - 1,
      }),
    );

    const usuarioLoggedIn = await servicioLoginUsuario.ejecutar(
      usuarioPrueba.nombre,
      clave,
    );

    expect(usuarioLoggedIn).toEqual(usuarioLoggedIn);
    expect(
      repositorioUsuarioStub.reducirNumeroDeEntradas.getCalls().length,
    ).toBe(1);
    expect(daoUsuarioStub.listarPorNombre.getCalls().length).toBe(1);
    expect(repositorioUsuarioStub.agregarIngreso.getCalls().length).toBe(1);
  });
});

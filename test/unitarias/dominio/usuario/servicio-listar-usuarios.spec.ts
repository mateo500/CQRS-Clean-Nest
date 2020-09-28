import { SinonStubbedInstance } from 'sinon';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ServicioListarUsuarios } from 'src/dominio/usuario/servicio/servicio-listar-usuarios';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioListarUsuarios', () => {
  let servicioListarUsuarios: ServicioListarUsuarios;
  let daoUsuarioStub: SinonStubbedInstance<DaoUsuario>;

  beforeEach(() => {
    daoUsuarioStub = createStubObj<DaoUsuario>(['listar']);
    servicioListarUsuarios = new ServicioListarUsuarios(daoUsuarioStub);
  });

  it('deberia retornar un array vacio al no haber usuarios registrados', async () => {
    daoUsuarioStub.listar.returns(Promise.resolve([]));

    const usuarios = await servicioListarUsuarios.ejecutar();

    expect(usuarios.length).toBe(0);
    expect(daoUsuarioStub.listar.getCalls().length).toBe(1);
  });

  it('deberia retornar un array con usuarios', async () => {
    const usuariosPrueba = [
      {
        _id: '1234567899',
        nombre: 'diego',
        clave: 'clave',
        roles: ['admin'],
        ingresos: [],
        pagos: [],
        activo: false,
        entradasRestantes: 0,
        createdAt: '',
        updatedAt: '',
      },
      {
        _id: '12345698656',
        nombre: 'ramon',
        clave: 'clave',
        roles: ['admin'],
        ingresos: [],
        pagos: [],
        activo: false,
        entradasRestantes: 0,
        createdAt: '',
        updatedAt: '',
      },
    ];

    daoUsuarioStub.listar.returns(Promise.resolve(usuariosPrueba));

    const usuarios = await servicioListarUsuarios.ejecutar();

    expect(usuarios.length).toBe(2);
    for (const usuario of usuarios) {
      expect(usuario).toHaveProperty('_id');
      expect(usuario).toHaveProperty('nombre');
      expect(usuario).toHaveProperty('clave');
      expect(usuario).toHaveProperty('roles');
      expect(usuario).toHaveProperty('ingresos');
      expect(usuario).toHaveProperty('pagos');
      expect(usuario).toHaveProperty('activo');
      expect(usuario).toHaveProperty('entradasRestantes');
      expect(usuario).toHaveProperty('createdAt');
      expect(usuario).toHaveProperty('updatedAt');
    }
  });
});

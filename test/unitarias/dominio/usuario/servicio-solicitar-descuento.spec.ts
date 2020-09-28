import { SinonStubbedInstance } from 'sinon';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ListarDiasDescuentosHelper } from 'src/dominio/usuario/servicio/helpers/listar-dias-descuento.helper';
import { SolicitarDescuentoHelper } from 'src/dominio/usuario/servicio/helpers/solicitar-descuento.helper';
import { ServicioSolicitarDescuento } from 'src/dominio/usuario/servicio/servicio-solicitar-descuento';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioSolicitarDescuento', () => {
  let daoUsuarioStub: SinonStubbedInstance<DaoUsuario>;
  let servicioSolicitarDescuento: ServicioSolicitarDescuento;
  const listarDiasDescuentosHelperStub: ListarDiasDescuentosHelper = new ListarDiasDescuentosHelper();
  const solicictarDiasDescuentoHelper: SolicitarDescuentoHelper = new SolicitarDescuentoHelper();

  beforeEach(() => {
    daoUsuarioStub = createStubObj<DaoUsuario>(['listarPorNombre']);
    servicioSolicitarDescuento = new ServicioSolicitarDescuento(
      daoUsuarioStub,
      solicictarDiasDescuentoHelper,
      listarDiasDescuentosHelperStub,
    );
  });

  it('deberia retornar error por membresia incorrecta', async () => {
    await expect(
      servicioSolicitarDescuento.ejecutar('diego', 'yoga'),
    ).rejects.toStrictEqual(
      new ErrorRolInvalido('la membresia/rol introducida no es valida'),
    );
  });

  it('deberia aplicar 5% de descuento por numero de entradas', async () => {
    const usuarioEnDb: any = {
      _id: '1234567899',
      nombre: 'diego',
      clave: 'clave',
      roles: ['premium'],
      ingresos: [
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
      ],
      pagos: [],
      activo: false,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioEnDb));

    await expect(
      servicioSolicitarDescuento.ejecutar('diego', 'premium'),
    ).resolves.toHaveProperty('descuentoPorContinuidad', 114000);
  });

  it('deberia aplicar 10% de descuento por numero de entradas', async () => {
    const usuarioEnDb: any = {
      _id: '1234567899',
      nombre: 'diego',
      clave: 'clave',
      roles: ['premium'],
      ingresos: [
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
      ],
      pagos: [],
      activo: false,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioEnDb));

    await expect(
      servicioSolicitarDescuento.ejecutar('diego', 'premium'),
    ).resolves.toHaveProperty('descuentoPorContinuidad', 108000);
  });

  it('deberia aplicar 15% de descuento por numero de entradas', async () => {
    const usuarioEnDb: any = {
      _id: '1234567899',
      nombre: 'diego',
      clave: 'clave',
      roles: ['premium'],
      ingresos: [
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
        { mes: new Date().getMonth() + 1 - 1 },
      ],
      pagos: [],
      activo: false,
      entradasRestantes: 0,
      createdAt: '',
      updatedAt: '',
    };

    daoUsuarioStub.listarPorNombre.returns(Promise.resolve(usuarioEnDb));

    await expect(
      servicioSolicitarDescuento.ejecutar('diego', 'premium'),
    ).resolves.toHaveProperty('descuentoPorContinuidad', 102000);
  });
});

import { SinonStubbedInstance } from 'sinon';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalas } from 'src/dominio/sala/servicio/servicio-listar-salas';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioListarSalas', () => {
  let servicioListarSalas: ServicioListarSalas;
  let daoSalaStub: SinonStubbedInstance<DaoSala>;

  beforeEach(() => {
    daoSalaStub = createStubObj<DaoSala>(['listar']);
    servicioListarSalas = new ServicioListarSalas(daoSalaStub);
  });

  it('deberia devolver un array vacio si no hay salas', async () => {
    daoSalaStub.listar.returns(Promise.resolve([]));

    expect((await servicioListarSalas.ejecutar()).length).toBe(0);
    expect(daoSalaStub.listar.getCalls().length).toBe(1);
  });

  it('deberia listar todas las salas creadas', async () => {
    const salasTesteo = [
      {
        _id: '1213531351',
        nombreSala: 'sala pilates',
        descripcion: 'sala para pilates',
        rolesAutorizados: ['casual'],
        diasDisponible: ['lunes', 'martes', 'miercoles'],
        estado: 'disponible',
        createdAt: '',
        updatedAt: '',
      },
      {
        _id: '12135319899',
        nombreSala: 'sala yoga',
        descripcion: 'sala para yoga',
        rolesAutorizados: ['premium'],
        diasDisponible: ['lunes', 'martes'],
        estado: 'disponible',
        createdAt: '',
        updatedAt: '',
      },
    ];

    daoSalaStub.listar.returns(Promise.resolve(salasTesteo));

    await expect(servicioListarSalas.ejecutar()).resolves.toEqual(salasTesteo);
    expect(daoSalaStub.listar.getCalls().length).toBe(1);
  });
});

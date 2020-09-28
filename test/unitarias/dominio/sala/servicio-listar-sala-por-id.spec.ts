import { SinonStubbedInstance } from 'sinon';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalaPorId } from 'src/dominio/sala/servicio/servicio-listar-sala-por-id';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioListarSalaPorId', () => {
  let servicioListarSalaPorId: ServicioListarSalaPorId;
  let daoSalaStub: SinonStubbedInstance<DaoSala>;

  beforeEach(() => {
    daoSalaStub = createStubObj<DaoSala>(['listarPorId']);
    servicioListarSalaPorId = new ServicioListarSalaPorId(daoSalaStub);
  });

  it('deberia fallar al no encontrar salas por el id', async () => {
    daoSalaStub.listarPorId.returns(
      Promise.reject(
        new ErrorSalaNoEncontradaEnBaseDeDatos(
          'sala no encontrada en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioListarSalaPorId.ejecutar('1213531351'),
    ).rejects.toStrictEqual(
      new ErrorSalaNoEncontradaEnBaseDeDatos(
        'sala no encontrada en base de datos',
        404,
      ),
    );

    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });

  it('deberia listar listar sala por el id dado', async () => {
    const salaTesteo = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['casual'],
      diasDisponible: ['lunes', 'martes', 'miercoles'],
      estado: 'disponible',
      createdAt: '',
      updatedAt: '',
    };

    daoSalaStub.listarPorId.returns(Promise.resolve(salaTesteo));

    await expect(
      servicioListarSalaPorId.ejecutar('1213531351'),
    ).resolves.toEqual(salaTesteo);
    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });
});

import { SinonStubbedInstance } from 'sinon';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalaPorNombre } from 'src/dominio/sala/servicio/servicio-listar-sala-por-nombre';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioListarSalaPorNombre', () => {
  let servicioListarSalaPorNombre: ServicioListarSalaPorNombre;
  let daoSalaStub: SinonStubbedInstance<DaoSala>;

  beforeEach(() => {
    daoSalaStub = createStubObj<DaoSala>(['listarPorNombre']);
    servicioListarSalaPorNombre = new ServicioListarSalaPorNombre(daoSalaStub);
  });

  it('deberia retornar error al no haber salas en la base de datos con el nombre dado', async () => {
    daoSalaStub.listarPorNombre.returns(
      Promise.reject(
        new ErrorSalaNoEncontradaEnBaseDeDatos(
          'sala no encontrada en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioListarSalaPorNombre.ejecutar('sala abdominales'),
    ).rejects.toStrictEqual(
      new ErrorSalaNoEncontradaEnBaseDeDatos(
        'sala no encontrada en base de datos',
        404,
      ),
    );

    expect(daoSalaStub.listarPorNombre.getCalls().length).toBe(1);
  });

  it('deberia listar las salas por nombre dado', async () => {
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
        nombreSala: 'sala pilates',
        descripcion: 'sala para pilates',
        rolesAutorizados: ['premium'],
        diasDisponible: ['lunes', 'martes'],
        estado: 'disponible',
        createdAt: '',
        updatedAt: '',
      },
    ];

    daoSalaStub.listarPorNombre.returns(Promise.resolve(salasTesteo));

    await expect(
      servicioListarSalaPorNombre.ejecutar('sala pilates'),
    ).resolves.toEqual(salasTesteo);
    expect(daoSalaStub.listarPorNombre.getCalls().length).toBe(1);
  });
});

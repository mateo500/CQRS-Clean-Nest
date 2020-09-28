import { SinonStubbedInstance } from 'sinon';
import { ErrorSalaFueraDeServicio } from 'src/dominio/errores/error-sala-fuera-de-servicio';
import { ErrorUsuarioNoAutorizadoEnSala } from 'src/dominio/errores/error-usuario-no-autorizado-en-sala';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioAccederSala } from 'src/dominio/sala/servicio/servicio-acceder-sala';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioAccederSala', () => {
  let daoSalaStub: SinonStubbedInstance<DaoSala>;
  let servicioAccederSala: ServicioAccederSala;

  beforeEach(() => {
    daoSalaStub = createStubObj<DaoSala>(['listarPorId']);
    servicioAccederSala = new ServicioAccederSala(daoSalaStub);
  });

  it('deberia retornar error al no estar autorizado para ingresar segun el rol', async () => {
    const salaEncontradaEnDb = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['premium'],
      diasDisponible: ['domingos'],
      estado: 'no-disponible',
      createdAt: '',
      updatedAt: '',
    };

    daoSalaStub.listarPorId.returns(Promise.resolve(salaEncontradaEnDb));

    await expect(
      servicioAccederSala.ejecutar('1213531351', ['casual']),
    ).rejects.toStrictEqual(
      new ErrorUsuarioNoAutorizadoEnSala(
        `Usuario no autorizado en sala: ${salaEncontradaEnDb.nombreSala}`,
        400,
      ),
    );

    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });

  it('deberia retornar error al no estar disponible la sala', async () => {
    const salaEncontradaEnDb = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['premium'],
      diasDisponible: [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
      ],
      estado: 'no-disponible',
      createdAt: '',
      updatedAt: '',
    };

    daoSalaStub.listarPorId.returns(Promise.resolve(salaEncontradaEnDb));

    await expect(
      servicioAccederSala.ejecutar('1213531351', ['premium']),
    ).rejects.toStrictEqual(
      new ErrorSalaFueraDeServicio(
        `La sala ${salaEncontradaEnDb.nombreSala} no esta disponible en el momento`,
      ),
    );

    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });

  it('deberia retornar error al no estar disponible debido al dia', async () => {
    const salaEncontradaEnDb = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['premium'],
      diasDisponible: [],
      estado: 'disponible',
      createdAt: '',
      updatedAt: '',
    };

    daoSalaStub.listarPorId.returns(Promise.resolve(salaEncontradaEnDb));

    await expect(
      servicioAccederSala.ejecutar('1213531351', ['premium']),
    ).rejects.toStrictEqual(
      new ErrorSalaFueraDeServicio(
        `La sala ${salaEncontradaEnDb.nombreSala} no esta disponible en el momento`,
      ),
    );

    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });

  it('deberia acceder a la sala y retornar la sala encontrada', async () => {
    const salaEncontradaEnDb = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['premium'],
      diasDisponible: [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
      ],
      estado: 'disponible',
      createdAt: '',
      updatedAt: '',
    };

    daoSalaStub.listarPorId.returns(Promise.resolve(salaEncontradaEnDb));

    await expect(
      servicioAccederSala.ejecutar('1213531351', ['premium']),
    ).resolves.toEqual(salaEncontradaEnDb);

    expect(daoSalaStub.listarPorId.getCalls().length).toBe(1);
  });
});

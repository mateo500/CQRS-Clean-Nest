import { SinonStubbedInstance } from 'sinon';
import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioActualizarSala } from 'src/dominio/sala/servicio/servicio-actualizar-sala';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioActualizarSala', () => {
  let repositorioSalaStub: SinonStubbedInstance<RepositorioSala>;
  let servicioActualizarSala: ServicioActualizarSala;

  beforeEach(() => {
    repositorioSalaStub = createStubObj<RepositorioSala>(['actualizar']);
    servicioActualizarSala = new ServicioActualizarSala(repositorioSalaStub);
  });

  it('deberia falla al no encontrar la sala en base de datos', async () => {
    repositorioSalaStub.actualizar.returns(
      Promise.reject(
        new ErrorSalaNoEncontradaEnBaseDeDatos(
          'sala no encontrada en base de datos',
          404,
        ),
      ),
    );

    const datosPrueba: any = { nombreSala: 'sala aerobicos' };

    await expect(
      servicioActualizarSala.ejecutar('1213811384', datosPrueba),
    ).rejects.toStrictEqual(
      new ErrorSalaNoEncontradaEnBaseDeDatos(
        'sala no encontrada en base de datos',
        404,
      ),
    );

    expect(repositorioSalaStub.actualizar.getCalls().length).toBe(1);
  });

  it('deberia actualizar la sala y retornar la sala actualizada', async () => {
    const salaRespuestaDb = {
      _id: '1213531351',
      nombreSala: 'sala pilates',
      descripcion: 'sala para pilates',
      rolesAutorizados: ['casual'],
      diasDisponible: ['lunes', 'martes', 'miercoles'],
      estado: 'disponible',
      createdAt: '',
      updatedAt: '',
    };

    const datosPrueba: any = { nombreSala: 'sala aerobicos' };

    repositorioSalaStub.actualizar.returns(
      Promise.resolve({
        ...salaRespuestaDb,
        nombreSala: datosPrueba.nombreSala,
      }),
    );

    await expect(
      servicioActualizarSala.ejecutar('1213531351', datosPrueba),
    ).resolves.toEqual({
      ...salaRespuestaDb,
      nombreSala: datosPrueba.nombreSala,
    });
    expect(repositorioSalaStub.actualizar.getCalls().length).toBe(1);
  });
});

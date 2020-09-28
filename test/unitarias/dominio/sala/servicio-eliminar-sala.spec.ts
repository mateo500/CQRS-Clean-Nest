import { SinonStubbedInstance } from 'sinon';
import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioEliminarSala } from 'src/dominio/sala/servicio/servicio-eliminar-sala';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioEliminarSala', () => {
  let repositorioSalaStub: SinonStubbedInstance<RepositorioSala>;
  let servicioEliminarSala: ServicioEliminarSala;

  beforeEach(() => {
    repositorioSalaStub = createStubObj<RepositorioSala>(['eliminar']);
    servicioEliminarSala = new ServicioEliminarSala(repositorioSalaStub);
  });

  it('deberia fallar al no encontrar la sala en base de datos', async () => {
    repositorioSalaStub.eliminar.returns(
      Promise.reject(
        new ErrorSalaNoEncontradaEnBaseDeDatos(
          'sala no encontrada en base de datos',
          404,
        ),
      ),
    );

    await expect(
      servicioEliminarSala.ejecutar('1213531351'),
    ).rejects.toStrictEqual(
      new ErrorSalaNoEncontradaEnBaseDeDatos(
        'sala no encontrada en base de datos',
        404,
      ),
    );

    expect(repositorioSalaStub.eliminar.getCalls().length).toBe(1);
  });

  it('deberia eliminar la sala y retornar el documento eliminado', async () => {
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

    repositorioSalaStub.eliminar.returns(Promise.resolve(salaRespuestaDb));

    await expect(servicioEliminarSala.ejecutar('1213531351')).resolves.toEqual(
      salaRespuestaDb,
    );
    expect(repositorioSalaStub.eliminar.getCalls().length).toBe(1);
  });
});

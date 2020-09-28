import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { SinonStubbedInstance } from 'sinon';
import { ServicioCrearSala } from 'src/dominio/sala/servicio/servicio-crear-sala';
import { createStubObj } from 'test/util/create-object.stub';
import { Sala } from 'src/dominio/sala/modelo/sala';

describe('ServicioCrearSala', () => {
  let repositorioSalaStub: SinonStubbedInstance<RepositorioSala>;
  let servicioCrearSala: ServicioCrearSala;

  beforeEach(() => {
    repositorioSalaStub = createStubObj<RepositorioSala>(['guardar']);
    servicioCrearSala = new ServicioCrearSala(repositorioSalaStub);
  });

  it('deberia crear la sala', async () => {
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

    const nuevaSala = new Sala(
      'sala pilates',
      'sala para pilates',
      ['casual'],
      ['lunes', 'martes', 'miercoles'],
      'disponible',
    );

    repositorioSalaStub.guardar.returns(Promise.resolve(salaRespuestaDb));

    await expect(servicioCrearSala.ejecutar(nuevaSala)).resolves.toEqual(
      salaRespuestaDb,
    );
    expect(repositorioSalaStub.guardar.getCalls().length).toBe(1);
  });
});

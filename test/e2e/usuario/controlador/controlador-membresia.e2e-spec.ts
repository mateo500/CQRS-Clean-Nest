import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsuarioModule } from 'src/infraestructura/usuario/usuario.module';
import { ServicioListarUsuarios } from 'src/dominio/usuario/servicio/servicio-listar-usuarios';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { AppModule } from 'src/app.module';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';

describe('Controller Membresias', () => {
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;

  beforeEach(() => {
    jest.setTimeout(30000);
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it('deberia listar los dias de descuento', async () => {
    const serverReponse: any = request(server)
      .get('/membresias/descuentos')
      .set('rolAdmin', 'admin')
      .expect(HttpStatus.OK)
      .then(response => response.body);

    expect(await serverReponse).toHaveProperty('mensaje');
    expect(await serverReponse).toHaveProperty('payload');
  });

  it('deberia actualizar la membresia del usuario', async () => {
    const serverResponse = request(server)
      .put('/membresias/testingUserJest')
      .set('rolAdmin', 'admin')
      .send({ tipoMembresia: 'premium' })
      .expect(HttpStatus.ACCEPTED)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty(
      'mensaje',
      'Membresia Actualizada Con Exito',
    );
    expect(await serverResponse).toHaveProperty('payload');
  });

  it('deberia obtener los descuentos para determinado usuario', async () => {
    const serverResponse = request(server)
      .get('/membresias/descuentos/testingUserJest?tipoMembresia=premium')
      .set('rolAdmin', 'admin')
      .expect(HttpStatus.OK)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty('mensaje');
    expect(await serverResponse).toHaveProperty('payload');
  });

  afterAll(async () => {
    await app.close();
  });
});

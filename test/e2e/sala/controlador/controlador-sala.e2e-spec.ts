import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('pruebas controlador salas', () => {
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('deberia obtener las salas disponibles', async () => {
    const serverResponse = await request(server)
      .get('/salas')
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty('payload');
    expect(await serverResponse).toHaveProperty('mensaje', 'Salas Encontradas');
  });

  it('deberia obtener sala por nombre', async () => {
    const serverResponse = await request(server)
      .get('/salas/salaJestTesting')
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty('payload');
    expect(await serverResponse).toHaveProperty('mensaje', 'Salas Encontradas');
  });

  it('deberia actualizar la sala por nombre', async () => {
    const serverResponse = await request(server)
      .put('/salas/salaJestTesting')
      .send({ rolesGuard: ['admin'], nombreSala: 'salaJestTesting' })
      .expect(HttpStatus.ACCEPTED)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty('payload');
    expect(await serverResponse).toHaveProperty('mensaje', 'Salas Encontradas');
  });

  it('deberia actualizar la sala por Id', async () => {
    const serverResponse = await request(server)
      .put('/salas/5f722ed12c8ff71180e4c276')
      .send({ rolesGuard: ['admin'], nombreSala: 'salaJestTesting' })
      .expect(HttpStatus.ACCEPTED)
      .then(response => response.body);

    expect(await serverResponse).toHaveProperty('payload');
    expect(await serverResponse).toHaveProperty(
      'mensaje',
      'Salas sala Actualizada correctamente',
    );
  });
});

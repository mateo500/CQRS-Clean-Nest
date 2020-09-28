import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';

import { AppModule } from 'src/app.module';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeInfraestructura } from 'src/infraestructura/excepciones/filtro-excepciones-infraestructura';
import { createSandbox } from 'sinon';
import { ComandoLoginUsuario } from 'src/aplicacion/usuario/comando/login-usuario.comando';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de usuarios', () => {
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    server = app.getHttpServer();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(
      new FiltroExcepcionesDeNegocio(logger),
      new FiltroExcepcionesDeInfraestructura(logger),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar los usuarios registrados', async () => {
    const serverReponse: any = request(server)
      .get('/usuarios')
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK)
      .then(response => response.body);

    expect(await serverReponse).toHaveProperty(
      'mensaje',
      'Usuarios encontrados',
    );
    expect(await serverReponse).toHaveProperty('payload');
  });

  it('debería fallar al registar un usuario clave muy corta', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'Lorem ipsum',
      clave: '123',
      activo: false,
      ingresos: [],
      roles: ['admin'],
      entradasRestantes: 0,
      pagos: [],
    };
    const mensaje = 'El tamaño mínimo de la clave debe ser 4';

    const response = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar un usuario ya existente', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'testingUserJest',
      clave: '1234',
      activo: false,
      ingresos: [],
      roles: ['admin'],
      entradasRestantes: 0,
      pagos: [],
    };
    const mensaje = `El nombre de usuario ${usuario.nombre} ya esta en uso`;

    const response = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar si los roles son incorrectos', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'testingUserJest',
      clave: '1234',
      activo: false,
      ingresos: [],
      roles: [''],
      entradasRestantes: 0,
      pagos: [],
    };
    const mensaje = 'El Rol ingresado no es valido';

    const response = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar si los roles son incorrectos', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'testingUserJest',
      clave: '1234',
      activo: false,
      ingresos: [],
      roles: [''],
      entradasRestantes: 0,
      pagos: [],
    };
    const mensaje = 'El Rol ingresado no es valido';

    const response = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('deberia loguear al usuario', async () => {
    const usuario: ComandoLoginUsuario = {
      nombre: 'testingUserJest',
      clave: 'test123',
    };

    const response = await request(app.getHttpServer())
      .post('/usuarios/login')
      .send(usuario)
      .expect(HttpStatus.OK);
    expect(response.body).toHaveProperty('mensaje', 'ingreso exitoso');
  });

  it('deberia eliminar el usuario', async () => {
    const usuarioPrueba = {
      nombre: 'testingDeleteJestCreationUserController',
      clave: 'test123',
      roles: ['admin'],
      ingresos: [],
      pagos: [],
      activo: false,
      entradasRestantes: 0,
    };

    const createTestUser = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuarioPrueba)
      .expect(HttpStatus.CREATED)
      .then(response => response.body.payload.nombre);

    await request(app.getHttpServer())
      .delete(`/usuarios/${await createTestUser}`)
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK);
  });

  it('deberia crear el usuario con normalidad', async () => {
    const usuarioPrueba = {
      nombre: 'testingCreationJestCreationUserController',
      clave: 'test123',
      roles: ['admin'],
      ingresos: [],
      pagos: [],
      activo: false,
      entradasRestantes: 0,
    };

    const createTestUser = await request(app.getHttpServer())
      .post('/usuarios/registro')
      .send(usuarioPrueba)
      .expect(HttpStatus.CREATED)
      .then(response => response.body.payload.nombre);

    await request(app.getHttpServer())
      .delete(`/usuarios/${await createTestUser}`)
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK);
  });

  it('deberia listar usuario por nombre', async () => {
    const createTestUser = await request(app.getHttpServer())
      .get('/usuarios/testingUserJest')
      .send({ rolesGuard: ['admin'] })
      .expect(HttpStatus.OK)
      .then(result => result.body);

    expect(createTestUser).toHaveProperty(
      'mensaje',
      'Usuario encontrado con exito',
    );
    expect(createTestUser).toHaveProperty('payload');
  });

  it('deberia actualizar el usuario', async () => {
    const createTestUser = await request(app.getHttpServer())
      .put('/usuarios/testingUserJest')
      .send({ rolesGuard: ['admin'], nombre: 'testingUserJest' })
      .expect(HttpStatus.ACCEPTED)
      .then(result => result.body);

    expect(createTestUser).toHaveProperty(
      'mensaje',
      'Usuario actualizado correctamente',
    );
    expect(createTestUser).toHaveProperty('payload');
  });
});

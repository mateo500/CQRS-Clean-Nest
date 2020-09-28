import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox } from 'sinon';
import { AppModule } from 'src/app.module';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeInfraestructura } from 'src/infraestructura/excepciones/filtro-excepciones-infraestructura';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';

const sinonSandbox = createSandbox();

describe('pruebas controlador salas', () => {
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
});

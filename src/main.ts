import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FiltroExcepcionesDeNegocio } from './infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from './infraestructura/configuracion/ceiba-logger.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './infraestructura/configuracion/environment/env-variables.enum';
import { FiltroExcepcionesDeInfraestructura } from './infraestructura/excepciones/filtro-excepciones-infraestructura';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const logger = await app.resolve(AppLogger);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new FiltroExcepcionesDeNegocio(logger),
    new FiltroExcepcionesDeInfraestructura(logger),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Bloque Arquitectura Hexagonal Node')
    .setDescription(
      "Bloque que hace uso de Nest.js para la creación de API's con Node.js",
    )
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/doc', app, swaggerDocument);

  app.setGlobalPrefix(configService.get(EnvVariables.APPLICATION_CONTEXT_PATH));
  await app.listen(configService.get(EnvVariables.APPLICATION_PORT));
}
bootstrap();

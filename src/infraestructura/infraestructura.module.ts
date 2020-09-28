import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AppLogger } from './configuracion/ceiba-logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodeEnv } from './configuracion/environment/env-node.enum';
import { databaseConfigFactory } from './configuracion/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaModule } from './sala/sala.module';

@Module({
  providers: [AppLogger],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      /* validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
          .required(),
      }) */
    }),
    UsuarioModule,
    SalaModule,
  ],
})
export class InfraestructuraModule {}

import { ConfigService, ConfigModule } from '@nestjs/config';
import { platform } from 'os';
import { EnvVariables } from 'src/infraestructura/configuracion/environment/env-variables.enum';

const variablesEnv = new ConfigService(
  ConfigModule.forRoot({
    envFilePath: `env/${process.env.NODE_ENV}.env`,
  }),
);

export const RUTA_FICHERO_JSON =
  platform() === 'win32'
    ? variablesEnv.get(EnvVariables.DIAS_PROMOCION_JSON_PATH_WIN) ||
      '\\src\\infraestructura\\usuario\\adaptador\\diasDescuentos.json'
    : variablesEnv.get(EnvVariables.DIAS_PROMOCION_JSON_PATH_LINUX) ||
      '/src/infraestructura/usuario/adaptador/diasDescuentos.json';

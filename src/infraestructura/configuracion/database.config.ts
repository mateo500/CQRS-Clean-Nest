import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './environment/env-variables.enum';

export const databaseConfigFactory = (configService: ConfigService) => ({
  uri:
    configService.get(EnvVariables.DATABASE_HOST) ||
    'mongodb+srv://mateo:vfp8qczIikOFNZHR@socialnetworkdb.gtrpu.gcp.mongodb.net/main?retryWrites=true&w=majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

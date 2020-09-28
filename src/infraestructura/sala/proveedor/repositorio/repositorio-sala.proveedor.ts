import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { RepositorioSalaMongoDb } from '../../adaptador/repositorio/repositorio-sala-mongodb';

export const repositorioSalaProvider = {
  provide: RepositorioSala,
  useClass: RepositorioSalaMongoDb,
};

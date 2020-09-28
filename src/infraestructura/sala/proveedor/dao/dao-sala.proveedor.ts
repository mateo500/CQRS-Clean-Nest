import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { DaoSalaMongoDb } from '../../adaptador/dao/dao-sala-mongoDb';

export const daoSalaProvider = {
  provide: DaoSala,
  useClass: DaoSalaMongoDb,
};

import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { DaoUsuarioMongoDb } from 'src/infraestructura/usuario/adaptador/dao/dao-usuario-mongodb';

export const daoUsuarioProvider = {
  provide: DaoUsuario,
  useClass: DaoUsuarioMongoDb,
};

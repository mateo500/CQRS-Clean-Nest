import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioUsuarioMongoDb } from 'src/infraestructura/usuario/adaptador/repositorio/repositorio-usuario-mongodb';

export const repositorioUsuarioProvider = {
  provide: RepositorioUsuario,
  useClass: RepositorioUsuarioMongoDb,
};

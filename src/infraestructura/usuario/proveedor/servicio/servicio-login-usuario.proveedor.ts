import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioLoginUsuario } from 'src/dominio/usuario/servicio/servicio-login-usuario';

export function servicioLoginUsuarioProveedor(
  _daoUsuario: DaoUsuario,
  repositorioUsuario: RepositorioUsuario,
) {
  return new ServicioLoginUsuario(_daoUsuario, repositorioUsuario);
}

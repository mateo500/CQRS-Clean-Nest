import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ServicioListarUsuarios } from 'src/dominio/usuario/servicio/servicio-listar-usuarios';

export function servicioListarUsuariosProveedor(_daoUsuario: DaoUsuario) {
  return new ServicioListarUsuarios(_daoUsuario);
}

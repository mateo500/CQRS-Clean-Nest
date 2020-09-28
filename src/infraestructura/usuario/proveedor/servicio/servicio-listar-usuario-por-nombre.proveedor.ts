import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ServicioListarUsuarioPorNombre } from 'src/dominio/usuario/servicio/servicio-listar-usuario-por-nombre';

export function servicioListarUsuarioPorNombreProveedor(
  _daoUsuario: DaoUsuario,
) {
  return new ServicioListarUsuarioPorNombre(_daoUsuario);
}

import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioEliminarUsuario } from 'src/dominio/usuario/servicio/servicio-eliminar-usuario';

export function servicioEliminarUsuarioProveedor(
  repositorioUsuario: RepositorioUsuario,
) {
  return new ServicioEliminarUsuario(repositorioUsuario);
}

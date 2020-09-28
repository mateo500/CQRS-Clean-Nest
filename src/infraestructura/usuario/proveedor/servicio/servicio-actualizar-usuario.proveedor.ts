import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioActualizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';

export function servicioActualizarUsuarioProveedor(
  repositorioUsuario: RepositorioUsuario,
) {
  return new ServicioActualizarUsuario(repositorioUsuario);
}

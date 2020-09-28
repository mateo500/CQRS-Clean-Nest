import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';

export function servicioRegistrarUsuarioProveedor(repositorioUsuario: RepositorioUsuario) {
  return new ServicioRegistrarUsuario(repositorioUsuario);
}

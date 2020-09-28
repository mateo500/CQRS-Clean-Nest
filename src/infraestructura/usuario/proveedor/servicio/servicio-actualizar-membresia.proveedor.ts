import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioActualizarMembresia } from 'src/dominio/usuario/servicio/servicio-actualizar-membresia';

export function servicioActualizarMembresiaProveedor(
  repositorioUsuario: RepositorioUsuario,
) {
  return new ServicioActualizarMembresia(repositorioUsuario);
}

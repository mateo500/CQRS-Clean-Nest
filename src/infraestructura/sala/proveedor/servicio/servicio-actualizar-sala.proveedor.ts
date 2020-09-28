import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioActualizarSala } from 'src/dominio/sala/servicio/servicio-actualizar-sala';

export function servicioActualizarSalaProveedor(
  repositorioSala: RepositorioSala,
) {
  return new ServicioActualizarSala(repositorioSala);
}

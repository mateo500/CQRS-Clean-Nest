import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioEliminarSala } from 'src/dominio/sala/servicio/servicio-eliminar-sala';

export function servicioEliminarSalaProveedor(
  repositorioSala: RepositorioSala,
) {
  return new ServicioEliminarSala(repositorioSala);
}

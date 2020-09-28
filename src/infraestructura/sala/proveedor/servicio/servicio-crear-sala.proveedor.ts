import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioCrearSala } from 'src/dominio/sala/servicio/servicio-crear-sala';

export function servicioCrearSalaProveedor(repositorioSala: RepositorioSala) {
  return new ServicioCrearSala(repositorioSala);
}

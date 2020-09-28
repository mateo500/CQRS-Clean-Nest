import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioAccederSala } from 'src/dominio/sala/servicio/servicio-acceder-sala';

export function servicioAccederSalaProveedor(_daoSala: DaoSala) {
  return new ServicioAccederSala(_daoSala);
}

import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalas } from 'src/dominio/sala/servicio/servicio-listar-salas';

export function servicioListarSalasProveedor(_daoSala: DaoSala) {
  return new ServicioListarSalas(_daoSala);
}

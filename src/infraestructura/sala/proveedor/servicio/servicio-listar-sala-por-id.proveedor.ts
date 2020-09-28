import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalaPorId } from 'src/dominio/sala/servicio/servicio-listar-sala-por-id';

export function servicioListarSalaPorIdProveedor(_daoSala: DaoSala) {
  return new ServicioListarSalaPorId(_daoSala);
}

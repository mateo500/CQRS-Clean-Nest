import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ServicioListarSalaPorNombre } from 'src/dominio/sala/servicio/servicio-listar-sala-por-nombre';

export function servicioListarSalaPorNombreProveedor(_daoSala: DaoSala) {
  return new ServicioListarSalaPorNombre(_daoSala);
}

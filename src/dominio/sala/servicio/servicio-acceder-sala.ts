import { ErrorSalaFueraDeServicio } from 'src/dominio/errores/error-sala-fuera-de-servicio';
import { ErrorUsuarioNoAutorizadoEnSala } from 'src/dominio/errores/error-usuario-no-autorizado-en-sala';
import { DIAS_SEMANA_MAPA } from 'src/dominio/usuario/constants/dias-semana-mapa';
import { DaoSala } from '../puerto/dao/dao-sala';

export class ServicioAccederSala {
  constructor(private readonly _daoSala: DaoSala) {}

  async ejecutar(salaId: string, rolesUsuario: string[]) {
    const salaEncontrada = await this._daoSala.listarPorId(salaId);

    rolesUsuario.forEach(rol => {
      if (!salaEncontrada.rolesAutorizados.includes(rol)) {
        throw new ErrorUsuarioNoAutorizadoEnSala(
          `Usuario no autorizado en sala: ${salaEncontrada.nombreSala}`,
          400,
        );
      }
    });

    const diaActual = new Date().getDay();

    if (
      !salaEncontrada.diasDisponible.includes(DIAS_SEMANA_MAPA[diaActual]) ||
      salaEncontrada.estado === 'no-disponible'
    ) {
      throw new ErrorSalaFueraDeServicio(
        `La sala ${salaEncontrada.nombreSala} no esta disponible en el momento`,
      );
    }

    return salaEncontrada;
  }
}

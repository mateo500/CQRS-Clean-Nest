import { DaoSala } from '../puerto/dao/dao-sala';

export class ServicioListarSalaPorId {
  constructor(private readonly _daoSala: DaoSala) {}

  async ejecutar(salaId: string) {
    const salasEncontrada = await this._daoSala.listarPorId(salaId);

    return salasEncontrada;
  }
}

import { DaoSala } from '../puerto/dao/dao-sala';

export class ServicioListarSalas {
  constructor(private readonly _daoSala: DaoSala) {}

  async ejecutar() {
    const salasEncontradas = await this._daoSala.listar();

    return salasEncontradas;
  }
}

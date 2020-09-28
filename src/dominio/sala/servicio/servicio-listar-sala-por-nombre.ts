import { DaoSala } from '../puerto/dao/dao-sala';

export class ServicioListarSalaPorNombre {
  constructor(private readonly _daoSala: DaoSala) {}

  async ejecutar(nombre: string) {
    const salasEncontrada = await this._daoSala.listarPorNombre(nombre);

    return salasEncontrada;
  }
}

import { RepositorioSala } from '../puerto/repositorio/repositorio-sala';

export class ServicioEliminarSala {
  constructor(private readonly repositorioSala: RepositorioSala) {}

  async ejecutar(_id: string) {
    const salaEliminada = await this.repositorioSala.eliminar(_id);

    return salaEliminada;
  }
}

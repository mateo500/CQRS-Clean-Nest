import { Sala } from '../modelo/sala';
import { RepositorioSala } from '../puerto/repositorio/repositorio-sala';

export class ServicioCrearSala {
  constructor(private readonly repositorioSala: RepositorioSala) {}

  async ejecutar(sala: Sala) {
    const salaCreada = await this.repositorioSala.guardar(sala);

    return salaCreada;
  }
}

import { ComandoActualizarSala } from 'src/aplicacion/sala/comando/actualizar-sala.comando';
import { RepositorioSala } from '../puerto/repositorio/repositorio-sala';

export class ServicioActualizarSala {
  constructor(private readonly repositorioSala: RepositorioSala) {}

  async ejecutar(salaId: string, datos: ComandoActualizarSala) {
    const salaActualizada = await this.repositorioSala.actualizar(
      salaId,
      datos,
    );

    return salaActualizada;
  }
}

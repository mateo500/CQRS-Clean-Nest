import { ComandoActualizarSala } from 'src/aplicacion/sala/comando/actualizar-sala.comando';
import { SalaDto } from 'src/aplicacion/sala/consulta/dto/sala.dto';
import { Sala } from '../../modelo/sala';

export abstract class RepositorioSala {
  abstract async actualizar(
    salaId: string,
    datos: ComandoActualizarSala,
  ): Promise<SalaDto>;
  abstract async guardar(sala: Sala): Promise<SalaDto>;
  abstract async eliminar(_idSala: string): Promise<SalaDto>;
}

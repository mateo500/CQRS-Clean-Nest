import { SalaDto } from 'src/aplicacion/sala/consulta/dto/sala.dto';

export abstract class DaoSala {
  abstract async listar(): Promise<SalaDto[]>;
  abstract async listarPorNombre(nombre: string): Promise<SalaDto[]>;
  abstract async listarPorId(id: string): Promise<SalaDto>;
}

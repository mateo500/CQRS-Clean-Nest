import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

export abstract class DaoUsuario {
  abstract async listar(): Promise<UsuarioDto[]>;
  abstract async listarPorNombre(nombre: string): Promise<UsuarioDto>;
}

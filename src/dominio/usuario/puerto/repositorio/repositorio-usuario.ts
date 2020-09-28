import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract async existeNombreUsuario(nombre: string): Promise<boolean>;
  abstract async guardar(usuario: Usuario): Promise<UsuarioDto>;
  abstract async actualizarPorNombre(
    nombre: string,
    datos: any,
  ): Promise<UsuarioDto>;
  abstract async eliminarPorNombre(nombre: string): Promise<UsuarioDto>;
  abstract async reducirNumeroDeEntradas(
    nombre: string,
    numero: number,
  ): Promise<UsuarioDto>;
  abstract async agregarIngreso(nombre: string): Promise<void>;
  abstract async actualizarMembresia(
    pago: {
      valor: number;
      numeroDeEntradas: number;
      tipoMembresia: string;
    },
    nombre: string,
  ): Promise<UsuarioDto>;
}

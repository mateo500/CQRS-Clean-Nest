import { Injectable } from '@nestjs/common';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { Model } from 'mongoose';
import { IUsuario } from '../../entidad/usuario.entidad.types';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';
import { ErrorEnBaseDeDatos } from 'src/infraestructura/errores/error-base-de-datos';

@Injectable()
export class DaoUsuarioMongoDb implements DaoUsuario {
  constructor(
    @InjectModel('Usuario')
    private readonly _daoUsuario: Model<IUsuario>,
  ) {}

  listarPorNombre(nombre: string): Promise<UsuarioDto> {
    const usuario = this._daoUsuario
      .findOne({ nombre: nombre })
      .then(usuario => {
        if (usuario === null) {
          throw new ErrorUsuarioNoEncontradoEnBaseDeDatos(
            'usuario no encontrado en base de datos',
            404,
          );
        }

        return usuario.toJSON();
      })
      .catch(error => {
        throw error;
      });

    return usuario;
  }

  listar(): Promise<UsuarioDto[]> {
    const usuarios = this._daoUsuario
      .find({})
      .then(usuarios => usuarios)
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error.message, 500);
      });

    return usuarios;
  }
}

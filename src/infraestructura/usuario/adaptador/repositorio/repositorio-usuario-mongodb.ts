import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsuario } from '../../entidad/usuario.entidad.types';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { ErrorEnBaseDeDatos } from 'src/infraestructura/errores/error-base-de-datos';
import { ErrorUsuarioNoEncontradoEnBaseDeDatos } from 'src/infraestructura/errores/error-usuario-no-encontrado';

@Injectable()
export class RepositorioUsuarioMongoDb implements RepositorioUsuario {
  constructor(
    @InjectModel('Usuario')
    private readonly repositorioUsuario: Model<IUsuario>,
  ) {}

  actualizarPorNombre(nombre: string, datos: any): Promise<UsuarioDto> {
    const usuario = this.repositorioUsuario
      .findOneAndUpdate({ nombre: nombre }, datos, { new: true })
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
        if (error instanceof ErrorUsuarioNoEncontradoEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuario;
  }

  eliminarPorNombre(nombre: string): Promise<UsuarioDto> {
    const usuario = this.repositorioUsuario
      .findOneAndRemove({ nombre: nombre })
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
        if (error instanceof ErrorUsuarioNoEncontradoEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuario;
  }

  existeNombreUsuario(nombre: string): Promise<boolean> {
    const usuario = this.repositorioUsuario
      .findOne({ nombre: nombre })
      .then(usuario => {
        if (usuario) {
          return true;
        }

        return false;
      })
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuario;
  }

  guardar(usuario: Usuario): Promise<UsuarioDto> {
    const nuevoUsuario = new this.repositorioUsuario(usuario);
    const usuarioGuardado = nuevoUsuario
      .save()
      .then(usuario => usuario.toJSON())
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuarioGuardado;
  }

  reducirNumeroDeEntradas(nombre: string, numero: number): Promise<UsuarioDto> {
    const usuario = this.repositorioUsuario
      .findOneAndUpdate(
        { nombre: nombre },
        { entradasRestantes: numero },
        { new: true },
      )
      .then(usuario => usuario.toJSON())
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuario;
  }

  async agregarIngreso(nombre: string): Promise<void> {
    await this.repositorioUsuario
      .findOneAndUpdate(
        { nombre: nombre },
        {
          $push: {
            ingresos: {
              dia: parseInt(new Date().toDateString().split(' ')[2]), //obtener dia del calendario
              mes: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              fechaCompleta: new Date().toISOString(),
            },
          },
        },
      )
      .then(usuario => {
        if (usuario === null) {
          throw new ErrorUsuarioNoEncontradoEnBaseDeDatos(
            `usuario: ${nombre}, no encontrado en base de datos`,
            404,
          );
        }
      })
      .catch(error => {
        if (error instanceof ErrorUsuarioNoEncontradoEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error, 500);
      });
  }

  actualizarMembresia(
    pago: {
      valor: number;
      numeroDeEntradas: number;
      tipoMembresia: string;
    },
    nombre: string,
  ): Promise<UsuarioDto> {
    const usuario = this.repositorioUsuario
      .findOneAndUpdate(
        { nombre: nombre },
        {
          $push: {
            pagos: {
              valor: pago.valor,
              numeroDeEntradas: pago.numeroDeEntradas,
              tipoMembresia: pago.tipoMembresia,
              dia: parseInt(new Date().toDateString().split(' ')[2]),
              mes: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              fechaCompleta: new Date().toISOString(),
            },
          },
          roles: [pago.tipoMembresia],
          entradasRestantes: pago.numeroDeEntradas,
          activo: true,
        },
        { new: true },
      )
      .then(usuario => {
        if (usuario === null) {
          throw new ErrorUsuarioNoEncontradoEnBaseDeDatos(
            `usuario: ${nombre}, no encontrado en base de datos`,
            404,
          );
        }

        return usuario.toJSON();
      })
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return usuario;
  }
}

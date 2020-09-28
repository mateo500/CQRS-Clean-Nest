import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalaDto } from 'src/aplicacion/sala/consulta/dto/sala.dto';
import { Sala } from 'src/dominio/sala/modelo/sala';
import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ErrorEnBaseDeDatos } from 'src/infraestructura/errores/error-base-de-datos';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { ISala } from '../../entidad/sala.entidad.types';

@Injectable()
export class RepositorioSalaMongoDb implements RepositorioSala {
  constructor(
    @InjectModel('Sala')
    private readonly repositorioSala: Model<ISala>,
  ) {}

  actualizar(salaId: string, datos: any): Promise<SalaDto> {
    const salaActualizada = this.repositorioSala
      .findByIdAndUpdate(salaId, datos, { new: true })
      .then(sala => {
        if (sala === null) {
          throw new ErrorSalaNoEncontradaEnBaseDeDatos(
            'sala no encontrada en base de datos',
            404,
          );
        }

        return sala.toJSON();
      })
      .catch(error => {
        if (error instanceof ErrorSalaNoEncontradaEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return salaActualizada;
  }

  guardar(sala: Sala): Promise<SalaDto> {
    const salaCreada = new this.repositorioSala(sala);

    const salaGuardada = salaCreada
      .save()
      .then(sala => {
        return sala.toJSON();
      })
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return salaGuardada;
  }

  eliminar(nombreSala: string): Promise<SalaDto> {
    const salaEliminada = this.repositorioSala
      .findOneAndDelete({ nombreSala: nombreSala })
      .then(sala => {
        if (sala === null) {
          throw new ErrorSalaNoEncontradaEnBaseDeDatos(
            'sala no encontrada en base de datos',
            404,
          );
        }

        return sala.toJSON();
      })
      .catch(error => {
        if (error instanceof ErrorSalaNoEncontradaEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error, 500);
      });

    return salaEliminada;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalaDto } from 'src/aplicacion/sala/consulta/dto/sala.dto';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { ErrorEnBaseDeDatos } from 'src/infraestructura/errores/error-base-de-datos';
import { ErrorSalaNoEncontradaEnBaseDeDatos } from 'src/infraestructura/errores/error-sala-no-encontrada';
import { ISala } from '../../entidad/sala.entidad.types';

@Injectable()
export class DaoSalaMongoDb implements DaoSala {
  constructor(
    @InjectModel('Sala')
    private readonly _daoSala: Model<ISala>,
  ) {}

  async listar(): Promise<SalaDto[]> {
    const salasEncontradas = await this._daoSala
      .find({})
      .then(usuarios => usuarios)
      .catch(error => {
        throw new ErrorEnBaseDeDatos(error.message, 500);
      });

    return salasEncontradas;
  }

  listarPorNombre(nombre: string): Promise<SalaDto[]> {
    const salasEncontrada = this._daoSala
      .find({ nombreSala: nombre })
      .then(salas => {
        if (salas === null) {
          throw new ErrorSalaNoEncontradaEnBaseDeDatos(
            'sala no encontrada en base de datos',
            404,
          );
        }

        return salas;
      })
      .catch(error => {
        if (error instanceof ErrorSalaNoEncontradaEnBaseDeDatos) {
          throw error;
        }

        throw new ErrorEnBaseDeDatos(error.message, 500);
      });

    return salasEncontrada;
  }

  listarPorId(id: string): Promise<SalaDto> {
    const salaEncontrada = this._daoSala
      .findById(id)
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

        throw new ErrorEnBaseDeDatos(error.message, 500);
      });

    return salaEncontrada;
  }
}

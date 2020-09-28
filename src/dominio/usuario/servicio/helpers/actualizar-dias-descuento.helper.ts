import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { readFile } from 'fs';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { RUTA_FICHERO_JSON } from '../../constants/ruta-fichero-json';

@Injectable()
export class ActualizarDiasDeDescuentoHelper {
  actualizarDiasEnFichero(diasActualizados: string[]) {
    readFile(process.cwd() + RUTA_FICHERO_JSON, (err, data) => {
      if (err) {
        throw new ErrorDeNegocio(
          `Error leyendo archivo JSON: ${err}`,
          ActualizarDiasDeDescuentoHelper.name,
          500,
        );
      }

      const bufferToString = data.toString();
      const jsonData: { diasDeDescuento: string[] } = JSON.parse(
        bufferToString,
      );

      jsonData.diasDeDescuento = diasActualizados;

      writeFile(
        process.cwd() + RUTA_FICHERO_JSON,
        JSON.stringify(jsonData),
        err => {
          if (err) {
            throw new ErrorDeNegocio(
              `Error escribiendo archivo JSON: ${err}`,
              ActualizarDiasDeDescuentoHelper.name,
              500,
            );
          }
        },
      );
    });
  }
}

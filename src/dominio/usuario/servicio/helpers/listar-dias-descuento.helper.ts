import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { promisify } from 'util';
import { RUTA_FICHERO_JSON } from '../../constants/ruta-fichero-json';

@Injectable()
export class ListarDiasDescuentosHelper {
  obtenerDiasDeFichero(): Promise<{
    diasDeDescuento: string[];
  }> {
    const readFilePromise = promisify(readFile);

    const obtenerDatosDeArchivo = (): Promise<Buffer> => {
      return readFilePromise(process.cwd() + RUTA_FICHERO_JSON);
    };

    const datosJson: Promise<{
      diasDeDescuento: string[];
    }> = obtenerDatosDeArchivo()
      .then(data => JSON.parse(data.toString()))
      .catch(error => {
        throw new ErrorDeNegocio(
          `Error Leyendo Archivo JSON: ${error}`,
          ListarDiasDescuentosHelper.name,
          500,
        );
      });

    return datosJson;
  }
}

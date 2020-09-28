import { Injectable } from '@nestjs/common';
import { ErrorRolInvalido } from 'src/dominio/errores/error-rol-invalido';
import { TIPO_MEMBRESIAS } from '../constants/tipo-membresias';
import { DaoUsuario } from '../puerto/dao/dao-usuario';
import { ListarDiasDescuentosHelper } from './helpers/listar-dias-descuento.helper';
import { SolicitarDescuentoHelper } from './helpers/solicitar-descuento.helper';

@Injectable()
export class ServicioSolicitarDescuento {
  constructor(
    private readonly _daoUsuario: DaoUsuario,
    private readonly _solicitarDescuentoHelper: SolicitarDescuentoHelper,
    private readonly _listarDiasDescuentoHelper: ListarDiasDescuentosHelper,
  ) {}

  async ejecutar(
    nombre: string,
    tipoMembresia: string,
  ): Promise<{
    descuentoPorContinuidad: number;
    descuentoPorDia: number;
  }> {
    if (!Object.keys(TIPO_MEMBRESIAS).includes(tipoMembresia)) {
      throw new ErrorRolInvalido('la membresia/rol introducida no es valida');
    }
    const usuarioEncontrado = await this._daoUsuario.listarPorNombre(nombre);

    const mesActual = new Date().getMonth() + 1;

    const mesObjetivo = mesActual - 1;

    const ingresosMesPasado = usuarioEncontrado.ingresos.filter(
      ingreso => ingreso.mes === mesObjetivo,
    );

    const {
      diasDeDescuento,
    } = await this._listarDiasDescuentoHelper.obtenerDiasDeFichero();

    const descuentoFinal = this._solicitarDescuentoHelper.calcularDescuentosFinales(
      ingresosMesPasado.length,
      diasDeDescuento,
      TIPO_MEMBRESIAS[tipoMembresia].valor,
    );

    return descuentoFinal;
  }
}

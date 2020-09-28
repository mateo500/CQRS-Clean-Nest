import { Injectable } from '@nestjs/common';
import { PORCENTAJE_DESCUENTO } from '../../constants/dias-descuento';
import { DIAS_SEMANA_MAPA } from '../../constants/dias-semana-mapa';
import { DESCUENTO_POR_CONTINUIDAD } from '../../constants/porcentaje-descuento';

const calcularDescuentoPorPorcentaje = (
  porcentaje: number,
  total: number,
): number => {
  return (porcentaje / 100) * total;
};

@Injectable()
export class SolicitarDescuentoHelper {
  //basado en el numero de entradas del mes anterior, generamos el descuento
  private calcularDescuentoPorContinuidad(
    numeroDeEntradasMesAnterior: number,
    precioMembresia: number,
  ) {
    const obtenerPorcentajeADescontar = (
      numeroDeEntradas: number,
      dataMap: Record<number, number>,
    ): number => {
      if (numeroDeEntradas >= 0 && numeroDeEntradas < 10) {
        return 0;
      }

      if (numeroDeEntradas >= 10 && numeroDeEntradas < 15) {
        return dataMap[10];
      }

      if (numeroDeEntradas >= 15 && numeroDeEntradas < 20) {
        return dataMap[15];
      }

      if (numeroDeEntradas >= 20) {
        return dataMap[20];
      }

      return 0;
    };

    const porcentajeADescontar = obtenerPorcentajeADescontar(
      numeroDeEntradasMesAnterior,
      DESCUENTO_POR_CONTINUIDAD,
    );

    const valorADescontar = calcularDescuentoPorPorcentaje(
      porcentajeADescontar,
      precioMembresia,
    );

    return precioMembresia - valorADescontar;
  }

  private calcularDescuentoPorDiasHabilitados(precioMembresia: number) {
    const valorADescontar = calcularDescuentoPorPorcentaje(
      PORCENTAJE_DESCUENTO,
      precioMembresia,
    );

    return precioMembresia - valorADescontar;
  }

  public calcularDescuentosFinales(
    ingresosMesPasado: number,
    diasDeDescuento: string[],
    valorMembresia: number,
  ) {
    if (
      ingresosMesPasado >= 10 &&
      diasDeDescuento.includes(DIAS_SEMANA_MAPA[new Date().getDay()])
    ) {
      const valorConDescuentoPorContinuidad = this.calcularDescuentoPorContinuidad(
        ingresosMesPasado,
        valorMembresia,
      );

      const valorConDescuentoPorDia = this.calcularDescuentoPorDiasHabilitados(
        valorMembresia,
      );

      return {
        descuentoPorContinuidad: valorConDescuentoPorContinuidad,
        descuentoPorDia: valorConDescuentoPorDia,
      };
    }

    if (ingresosMesPasado >= 10) {
      const valorConDescuentoPorContinuidad = this.calcularDescuentoPorContinuidad(
        ingresosMesPasado,
        valorMembresia,
      );

      return {
        descuentoPorContinuidad: valorConDescuentoPorContinuidad,
        descuentoPorDia: 0,
      };
    }

    if (diasDeDescuento.includes(DIAS_SEMANA_MAPA[new Date().getDay()])) {
      const valorConDescuentoPorDia = this.calcularDescuentoPorDiasHabilitados(
        valorMembresia,
      );

      return {
        descuentoPorContinuidad: 0,
        descuentoPorDia: valorConDescuentoPorDia,
      };
    }

    return { descuentoPorContinuidad: 0, descuentoPorDia: 0 };
  }
}

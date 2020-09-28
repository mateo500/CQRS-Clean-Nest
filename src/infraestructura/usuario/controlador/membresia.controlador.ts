import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ComandoActualizarDiasDeDescuentos } from 'src/aplicacion/usuario/comando/actualizar-dias-descuentos.comando';
import { ManejadorActualizarDiasDeDescuentos } from 'src/aplicacion/usuario/comando/actualizar-dias-descuentos.manejador';
import { ComandoActualizarMembresia } from 'src/aplicacion/usuario/comando/actualizar-membresia-usuario.comando';
import { ManejadorActualizarMembresia } from 'src/aplicacion/usuario/comando/actualizar-membresia-usuario.manejador';
import { ManejadorSolicitarDescuentos } from 'src/aplicacion/usuario/consulta/consultar-aplica-descuento.manejador';
import { ManejadorListarDiasDescuentos } from 'src/aplicacion/usuario/consulta/listar-dias-descuentos.manejador';
import { AdminGuard } from '../seguridad/admin.guard';

@Controller('membresias')
export class MembresiasControlador {
  constructor(
    private readonly _manejadorActualizarDiasDeDescuentos: ManejadorActualizarDiasDeDescuentos,
    private readonly _manejadorListarDiasDescuentos: ManejadorListarDiasDescuentos,
    private readonly _manejadorActualizarMembresia: ManejadorActualizarMembresia,
    private readonly _manejadorSolicitarDescuentos: ManejadorSolicitarDescuentos,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put('descuentos')
  @UseGuards(AdminGuard)
  async actualizatDiasDeDescuento(
    @Body()
    comandoActualizarDiasDeDescuentos: ComandoActualizarDiasDeDescuentos,
  ) {
    await this._manejadorActualizarDiasDeDescuentos.ejecutar(
      comandoActualizarDiasDeDescuentos,
    );

    return { mensaje: 'dias de descuento actualizados' };
  }

  @HttpCode(HttpStatus.OK)
  @Get('descuentos')
  @UseGuards(AdminGuard)
  async listarDiasDeDescuentos() {
    const diasDeDescuento = await this._manejadorListarDiasDescuentos.ejecutar();

    return {
      mensaje: 'Dias de descuento actuales',
      payload: diasDeDescuento,
    };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/:nombre')
  @UseGuards(AdminGuard)
  async actualizarMembresia(
    @Body() comandoActualizarMembresia: ComandoActualizarMembresia,
    @Param('nombre') nombre: string,
  ) {
    const membresiaActualizada = await this._manejadorActualizarMembresia.ejecutar(
      comandoActualizarMembresia,
      nombre,
    );

    const { ingresos, clave, ...rest } = membresiaActualizada;

    return {
      mensaje: 'Membresia Actualizada Con Exito',
      payload: rest,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('descuentos/:nombre')
  @UseGuards(AdminGuard)
  async obtenerDescuentos(
    @Param('nombre') nombre: string,
    @Query('tipoMembresia') tipoMembresia: string,
  ) {
    const descuentos = await this._manejadorSolicitarDescuentos.ejecutar(
      nombre,
      tipoMembresia,
    );

    return { mensaje: 'descuentosDisponibles', payload: descuentos };
  }
}

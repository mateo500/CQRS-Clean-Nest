import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComandoActualizarSala } from 'src/aplicacion/sala/comando/actualizar-sala.comando';
import { ManejadorActualizarSala } from 'src/aplicacion/sala/comando/actualizar-sala.manejador';
import { ComandoCrearSala } from 'src/aplicacion/sala/comando/crear-sala.comando';
import { ManejadorCrearSala } from 'src/aplicacion/sala/comando/crear-sala.manejador';
import { ManejadorEliminarSala } from 'src/aplicacion/sala/comando/eliminar-sala.manejador';
import { ManejadorAccederSala } from 'src/aplicacion/sala/consulta/consultar-acceso-sala.manejador';
import { ManejadorListarSalaPorId } from 'src/aplicacion/sala/consulta/listar-sala-por-id.manejador';
import { ManejadorListarSalaPorNombre } from 'src/aplicacion/sala/consulta/listar-salas-por-nombre.manejador';
import { ManejadorListarSalas } from 'src/aplicacion/sala/consulta/listar-salas.manejador';
import { AdminGuard } from 'src/infraestructura/usuario/seguridad/admin.guard';

@Controller('salas')
export class SalaControlador {
  constructor(
    private readonly _manejadorCrearSala: ManejadorCrearSala,
    private readonly _manejadorListarSalas: ManejadorListarSalas,
    private readonly _manejadorListarSalaPorNombre: ManejadorListarSalaPorNombre,
    private readonly _manejadorListarSalaPorId: ManejadorListarSalaPorId,
    private readonly _manejadorActualizarSala: ManejadorActualizarSala,
    private readonly _manejadorEliminarSala: ManejadorEliminarSala,
    private readonly _manejadorAccederSala: ManejadorAccederSala,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AdminGuard)
  async crear(@Body() comandoCrearSala: ComandoCrearSala) {
    const salaCreada = await this._manejadorCrearSala.ejecutar(
      comandoCrearSala,
    );

    return { mensaje: 'Sala creada con exito', payload: salaCreada };
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async listar() {
    const salas = await this._manejadorListarSalas.ejecutar();

    return { mensaje: 'Salas Encontradas', payload: salas };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:nombre')
  async listarPorNombre(@Param('nombre') nombre: string) {
    const salasEncontradas = await this._manejadorListarSalaPorNombre.ejecutar(
      nombre,
    );

    return { mensaje: 'Salas Encontradas', payload: salasEncontradas };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AdminGuard)
  async listarPorId(@Param('id') salaId: string) {
    const salaEncontrada = await this._manejadorListarSalaPorId.ejecutar(
      salaId,
    );

    return { mensaje: 'sala Encontrada', payload: salaEncontrada };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/:id')
  @UseGuards(AdminGuard)
  async actualizar(
    @Param('id') salaId: string,
    @Body() comandoActualizarSala: ComandoActualizarSala,
  ) {
    const salaActualizada = await this._manejadorActualizarSala.ejecutar(
      salaId,
      comandoActualizarSala,
    );

    return {
      mensaje: 'sala Actualizada correctamente',
      payload: salaActualizada,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AdminGuard)
  async borrar(@Param('id') id: string) {
    const salaEliminada = await this._manejadorEliminarSala.ejecutar(id);

    return { mensaje: 'sala eliminada', payload: salaEliminada };
  }

  @HttpCode(HttpStatus.OK)
  @Get('acceder/:id')
  @UseGuards(AuthGuard('jwt'))
  async accederSala(
    @Param('id') salaId: string,
    @Body('roles') rolesUsuario: string[],
  ) {
    const sala = await this._manejadorAccederSala.ejecutar(
      salaId,
      rolesUsuario,
    );

    return { mensaje: 'Acceso autorizado', payload: sala };
  }
}

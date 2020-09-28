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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuarios } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { ComandoLoginUsuario } from 'src/aplicacion/usuario/comando/login-usuario.comando';
import { ManejadorLoginUsuario } from 'src/aplicacion/usuario/comando/login-usuario.manejador';
import { AdminGuard } from '../seguridad/admin.guard';
import { ManejadorListarUsuarioPorNombre } from 'src/aplicacion/usuario/consulta/listar-usuario-por-nombre.manejador';
import { ManejadorActualizarUsuario } from 'src/aplicacion/usuario/comando/actualizar-usuario.manejador';
import { ComandoActualizarUsuario } from 'src/aplicacion/usuario/comando/actualizar-usuario.comando';
import { ManejadorEliminarUsuario } from 'src/aplicacion/usuario/comando/eliminar-usuario.manejador';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuarioControlador {
  constructor(
    private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
    private readonly _manejadorListarUsuario: ManejadorListarUsuarios,
    private readonly _manejadorListarUsuarioPorNombre: ManejadorListarUsuarioPorNombre,
    private readonly _manejadorActualizarUsuario: ManejadorActualizarUsuario,
    private readonly _manejadorEliminarUsuario: ManejadorEliminarUsuario,
    private readonly _manejadorLoginUsuario: ManejadorLoginUsuario,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AdminGuard)
  async listar() {
    const usuarios = await this._manejadorListarUsuario.ejecutar();

    return { mensaje: 'Usuarios encontrados', payload: usuarios };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:nombre')
  @UseGuards(AdminGuard)
  async listarPorNombre(@Param('nombre') nombre: string) {
    const usuario = await this._manejadorListarUsuarioPorNombre.ejecutar(
      nombre,
    );

    const { pagos, ingresos, clave, ...rest } = usuario;

    return { mensaje: 'Usuario encontrado con exito', payload: rest };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registro')
  async crear(@Body() comandoRegistrarUsuario: ComandoRegistrarUsuario) {
    const usuario = await this._manejadorRegistrarUsuario.ejecutar(
      comandoRegistrarUsuario,
    );

    const { pagos, ingresos, clave, ...rest } = usuario;

    return { mensaje: 'Usuario registrado con exito', payload: rest };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() comandoLoginUsuario: ComandoLoginUsuario,
    @Res() res: Response,
  ) {
    const usuario = await this._manejadorLoginUsuario.ejecutar(
      comandoLoginUsuario,
    );

    const { pagos, ingresos, clave, ...rest } = usuario;

    return res.send({ mensaje: 'ingreso exitoso', payload: rest });
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/:nombre')
  @UseGuards(AdminGuard)
  async actualizar(
    @Body() comandoActualizarUsuario: ComandoActualizarUsuario,
    @Param('nombre') nombre: string,
  ) {
    const datosParaActualizar: ComandoActualizarUsuario = {
      nombre: comandoActualizarUsuario.nombre,
      roles: comandoActualizarUsuario.roles,
      clave: comandoActualizarUsuario.clave,
      activo: comandoActualizarUsuario.activo,
    };

    const usuario = await this._manejadorActualizarUsuario.ejecutar(
      nombre,
      datosParaActualizar,
    );

    const { pagos, ingresos, clave, ...rest } = usuario;

    return { mensaje: 'Usuario actualizado correctamente', payload: rest };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:nombre')
  @UseGuards(AdminGuard)
  async borrar(@Param('nombre') nombre: string) {
    const usuario = await this._manejadorEliminarUsuario.ejecutar(nombre);

    return { mensaje: 'Usuario eliminado', payload: usuario };
  }
}

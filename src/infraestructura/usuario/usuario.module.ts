import { Module } from '@nestjs/common';
import { MembresiasControlador } from './controlador/membresia.controlador';
import { UsuarioControlador } from './controlador/usuario.controlador';
import { UsuarioProveedorModule } from './proveedor/usuario-proveedor.module';

@Module({
  imports: [UsuarioProveedorModule],
  controllers: [UsuarioControlador, MembresiasControlador],
})
export class UsuarioModule {}

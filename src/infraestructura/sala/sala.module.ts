import { Module } from '@nestjs/common';
import { SalaControlador } from './controlador/sala.controlador';
import { SalaProveedorModule } from './proveedor/sala-proveedor.module';

@Module({
  imports: [SalaProveedorModule],
  controllers: [SalaControlador],
})
export class SalaModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManejadorActualizarSala } from 'src/aplicacion/sala/comando/actualizar-sala.manejador';
import { ManejadorCrearSala } from 'src/aplicacion/sala/comando/crear-sala.manejador';
import { ManejadorEliminarSala } from 'src/aplicacion/sala/comando/eliminar-sala.manejador';
import { ManejadorAccederSala } from 'src/aplicacion/sala/consulta/consultar-acceso-sala.manejador';
import { ManejadorListarSalaPorId } from 'src/aplicacion/sala/consulta/listar-sala-por-id.manejador';
import { ManejadorListarSalaPorNombre } from 'src/aplicacion/sala/consulta/listar-salas-por-nombre.manejador';
import { ManejadorListarSalas } from 'src/aplicacion/sala/consulta/listar-salas.manejador';
import { DaoSala } from 'src/dominio/sala/puerto/dao/dao-sala';
import { RepositorioSala } from 'src/dominio/sala/puerto/repositorio/repositorio-sala';
import { ServicioAccederSala } from 'src/dominio/sala/servicio/servicio-acceder-sala';
import { ServicioActualizarSala } from 'src/dominio/sala/servicio/servicio-actualizar-sala';
import { ServicioCrearSala } from 'src/dominio/sala/servicio/servicio-crear-sala';
import { ServicioEliminarSala } from 'src/dominio/sala/servicio/servicio-eliminar-sala';
import { ServicioListarSalaPorId } from 'src/dominio/sala/servicio/servicio-listar-sala-por-id';
import { ServicioListarSalaPorNombre } from 'src/dominio/sala/servicio/servicio-listar-sala-por-nombre';
import { ServicioListarSalas } from 'src/dominio/sala/servicio/servicio-listar-salas';
import { SalaSchema } from '../entidad/sala.entidad';
import { daoSalaProvider } from './dao/dao-sala.proveedor';
import { repositorioSalaProvider } from './repositorio/repositorio-sala.proveedor';
import { servicioAccederSalaProveedor } from './servicio/servicio-acceder-sala.proveedor';
import { servicioActualizarSalaProveedor } from './servicio/servicio-actualizar-sala.proveedor';
import { servicioCrearSalaProveedor } from './servicio/servicio-crear-sala.proveedor';
import { servicioEliminarSalaProveedor } from './servicio/servicio-eliminar-sala.proveedor';
import { servicioListarSalaPorIdProveedor } from './servicio/servicio-listar-sala-por-id.proveedor';
import { servicioListarSalaPorNombreProveedor } from './servicio/servicio-listar-sala-por-nombre.proveedor';
import { servicioListarSalasProveedor } from './servicio/servicio-listar-salas.proveedor';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sala', schema: SalaSchema }])],

  providers: [
    {
      provide: ServicioCrearSala,
      inject: [RepositorioSala],
      useFactory: servicioCrearSalaProveedor,
    },
    {
      provide: ServicioListarSalas,
      inject: [DaoSala],
      useFactory: servicioListarSalasProveedor,
    },
    {
      provide: ServicioListarSalaPorNombre,
      inject: [DaoSala],
      useFactory: servicioListarSalaPorNombreProveedor,
    },
    {
      provide: ServicioActualizarSala,
      inject: [RepositorioSala],
      useFactory: servicioActualizarSalaProveedor,
    },
    {
      provide: ServicioEliminarSala,
      inject: [RepositorioSala],
      useFactory: servicioEliminarSalaProveedor,
    },
    {
      provide: ServicioListarSalaPorId,
      inject: [DaoSala],
      useFactory: servicioListarSalaPorIdProveedor,
    },
    {
      provide: ServicioAccederSala,
      inject: [DaoSala],
      useFactory: servicioAccederSalaProveedor,
    },
    repositorioSalaProvider,
    daoSalaProvider,
    ManejadorCrearSala,
    ManejadorListarSalas,
    ManejadorListarSalaPorNombre,
    ManejadorActualizarSala,
    ManejadorEliminarSala,
    ManejadorAccederSala,
    ManejadorListarSalaPorId,
  ],
  exports: [
    ManejadorCrearSala,
    ManejadorListarSalas,
    ManejadorListarSalaPorNombre,
    ManejadorActualizarSala,
    ManejadorEliminarSala,
    ManejadorAccederSala,
    ManejadorListarSalaPorId,
  ],
})
export class SalaProveedorModule {}

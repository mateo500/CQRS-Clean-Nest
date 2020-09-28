import { Module } from '@nestjs/common';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { servicioRegistrarUsuarioProveedor } from './servicio/servicio-registrar-usuario.proveedor';
import { repositorioUsuarioProvider } from './repositorio/repositorio-usuario.proveedor';
import { daoUsuarioProvider } from './dao/dao-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuarios } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ManejadorListarUsuarioPorNombre } from 'src/aplicacion/usuario/consulta/listar-usuario-por-nombre.manejador';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from '../entidad/usuario.entidad';
import { ServicioLoginUsuario } from 'src/dominio/usuario/servicio/servicio-login-usuario';
import { servicioLoginUsuarioProveedor } from './servicio/servicio-login-usuario.proveedor';
import { ManejadorLoginUsuario } from 'src/aplicacion/usuario/comando/login-usuario.manejador';
import { ServicioListarUsuarios } from 'src/dominio/usuario/servicio/servicio-listar-usuarios';
import { servicioListarUsuariosProveedor } from './servicio/servicio-listar-usuarios.proveedor';
import { ServicioListarUsuarioPorNombre } from 'src/dominio/usuario/servicio/servicio-listar-usuario-por-nombre';
import { servicioListarUsuarioPorNombreProveedor } from './servicio/servicio-listar-usuario-por-nombre.proveedor';
import { ServicioActualizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';
import { servicioActualizarUsuarioProveedor } from './servicio/servicio-actualizar-usuario.proveedor';
import { ManejadorActualizarUsuario } from 'src/aplicacion/usuario/comando/actualizar-usuario.manejador';
import { ServicioEliminarUsuario } from 'src/dominio/usuario/servicio/servicio-eliminar-usuario';
import { servicioEliminarUsuarioProveedor } from './servicio/servicio-eliminar-usuario.proveedor';
import { ManejadorEliminarUsuario } from 'src/aplicacion/usuario/comando/eliminar-usuario.manejador';
import { ManejadorActualizarDiasDeDescuentos } from 'src/aplicacion/usuario/comando/actualizar-dias-descuentos.manejador';
import { ServicioActualizarDiasDescuento } from 'src/dominio/usuario/servicio/servicio-actualizar-dias-descuento';
import { ManejadorListarDiasDescuentos } from 'src/aplicacion/usuario/consulta/listar-dias-descuentos.manejador';
import { ServicioListarDiasDescuentos } from 'src/dominio/usuario/servicio/servicio-listar-dias-descuento';
import { ServicioActualizarMembresia } from 'src/dominio/usuario/servicio/servicio-actualizar-membresia';
import { servicioActualizarMembresiaProveedor } from './servicio/servicio-actualizar-membresia.proveedor';
import { ManejadorActualizarMembresia } from 'src/aplicacion/usuario/comando/actualizar-membresia-usuario.manejador';
import { ListarDiasDescuentosHelper } from 'src/dominio/usuario/servicio/helpers/listar-dias-descuento.helper';
import { ActualizarDiasDeDescuentoHelper } from 'src/dominio/usuario/servicio/helpers/actualizar-dias-descuento.helper';
import { SolicitarDescuentoHelper } from 'src/dominio/usuario/servicio/helpers/solicitar-descuento.helper';
import { ManejadorSolicitarDescuentos } from 'src/aplicacion/usuario/consulta/consultar-aplica-descuento.manejador';
import { ServicioSolicitarDescuento } from 'src/dominio/usuario/servicio/servicio-solicitar-descuento';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
  ],
  providers: [
    {
      provide: ServicioRegistrarUsuario,
      inject: [RepositorioUsuario],
      useFactory: servicioRegistrarUsuarioProveedor,
    },
    {
      provide: ServicioLoginUsuario,
      inject: [DaoUsuario, RepositorioUsuario],
      useFactory: servicioLoginUsuarioProveedor,
    },
    {
      provide: ServicioListarUsuarios,
      inject: [DaoUsuario],
      useFactory: servicioListarUsuariosProveedor,
    },
    {
      provide: ServicioListarUsuarioPorNombre,
      inject: [DaoUsuario],
      useFactory: servicioListarUsuarioPorNombreProveedor,
    },
    {
      provide: ServicioActualizarUsuario,
      inject: [RepositorioUsuario],
      useFactory: servicioActualizarUsuarioProveedor,
    },
    {
      provide: ServicioEliminarUsuario,
      inject: [RepositorioUsuario],
      useFactory: servicioEliminarUsuarioProveedor,
    },
    {
      provide: ServicioActualizarMembresia,
      inject: [RepositorioUsuario],
      useFactory: servicioActualizarMembresiaProveedor,
    },
    repositorioUsuarioProvider,
    daoUsuarioProvider,
    ManejadorRegistrarUsuario,
    ManejadorListarUsuarios,
    ManejadorListarUsuarioPorNombre,
    ManejadorLoginUsuario,
    ManejadorActualizarUsuario,
    ManejadorEliminarUsuario,
    ManejadorActualizarDiasDeDescuentos,
    ServicioActualizarDiasDescuento,
    ManejadorListarDiasDescuentos,
    ServicioListarDiasDescuentos,
    ManejadorActualizarMembresia,
    ManejadorListarDiasDescuentos,
    ManejadorSolicitarDescuentos,
    ListarDiasDescuentosHelper,
    ActualizarDiasDeDescuentoHelper,
    SolicitarDescuentoHelper,
    ServicioSolicitarDescuento,
  ],
  exports: [
    ManejadorRegistrarUsuario,
    ManejadorListarUsuarioPorNombre,
    ManejadorListarUsuarios,
    ManejadorLoginUsuario,
    ManejadorActualizarUsuario,
    ManejadorEliminarUsuario,
    ManejadorListarDiasDescuentos,
    ManejadorActualizarDiasDeDescuentos,
    ManejadorActualizarMembresia,
    ManejadorSolicitarDescuentos,
  ],
})
export class UsuarioProveedorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesAsesorComponent } from './solicitudes-asesor/solicitudes-asesor.component';
import { CambiarAsesorSolicitudComponent } from './cambiar-asesor-solicitud/cambiar-asesor-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAsesorComponent } from './asesor/listar-asesor/listar-asesor.component';
import { CrearAsesorComponent } from './asesor/crear-asesor/crear-asesor.component';
import { EditarAsesorComponent } from './asesor/editar-asesor/editar-asesor.component';
import { EliminarAsesorComponent } from './asesor/eliminar-asesor/eliminar-asesor.component';
import { CrearSolicitudesClienteComponent } from './crear-solicitudes-cliente/crear-solicitudes-cliente.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { InmueblesClienteComponent } from './inmuebles-cliente/inmuebles-cliente.component';

@NgModule({
  declarations: [
    EliminarClienteComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    ListarInmuebleComponent,
    CrearInmuebleComponent,
    EditarInmuebleComponent,
    EliminarInmuebleComponent,
    CrearSolicitudComponent,
    EditarSolicitudComponent,
    EliminarSolicitudComponent,
    ListarSolicitudComponent,
    SolicitudesAsesorComponent,
    CambiarAsesorSolicitudComponent,
    ListarAsesorComponent,
    CrearAsesorComponent,
    EditarAsesorComponent,
    EliminarAsesorComponent,
    CrearSolicitudesClienteComponent,
    SinglePageComponent,
    InmueblesClienteComponent,
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametrosModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { InmueblesAsesorComponent } from './inmuebles-asesor/inmuebles-asesor.component';
import { SolicitudesClienteComponent } from './solicitudes-cliente/solicitudes-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { CreacionDepCiuComponent } from './creacion-dep-ciu/creacion-dep-ciu.component';
import { SolicitudesAsesorComponent } from './solicitudes-asesor/solicitudes-asesor.component';
import { CambiarAsesorSolicitudComponent } from './cambiar-asesor-solicitud/cambiar-asesor-solicitud.component';
import { ListarAsesorComponent } from './asesor/listar-asesor/listar-asesor.component';
import { CrearAsesorComponent } from './asesor/crear-asesor/crear-asesor.component';
import { EliminarAsesorComponent } from './asesor/eliminar-asesor/eliminar-asesor.component';
import { EditarAsesorComponent } from './asesor/editar-asesor/editar-asesor.component';
import { CrearSolicitudesClienteComponent } from './crear-solicitudes-cliente/crear-solicitudes-cliente.component';
import { SinglePageComponent } from './single-page/single-page.component';

const routes: Routes = [
  {
    path: "inmueble-listar",
    component: ListarInmuebleComponent,
  },
  {
    path: "inmueble-agregar",
    component: CrearInmuebleComponent,
  },
  {
    path: "inmueble-eliminar/:id",
    component: EliminarInmuebleComponent,
  },
  {
    path: "inmueble-editar/:id",
    component: EditarInmuebleComponent,
  },
  {
    path: "solicitud-listar",
    component: ListarSolicitudComponent,
  },
  {
    path: "solicitud-agregar",
    component: CrearSolicitudComponent,
  },
  {
    path: "solicitud-eliminar/:id",
    component: EliminarSolicitudComponent,
  },
  {
    path: "solicitud-editar/:id",
    component: EditarSolicitudComponent,
  },
  {
    path: "inmuebles-asesor",
    component: InmueblesAsesorComponent
  },

  {
    path: "solicitudes-cliente",
    component: SolicitudesClienteComponent
  },
  {
    path: "cliente-listar",
    component: ListarClienteComponent,
  },
  {
    path: "cliente-agregar",
    component: CrearClienteComponent,
  },
  {
    path: "cliente-eliminar/:id",
    component: EliminarClienteComponent,
  },
  {
    path: "cliente-editar/:id",
    component: EditarClienteComponent,
  },
  {
    path: "solicitudes-asesor",
    component: SolicitudesAsesorComponent,
  },
  {
    path: "cambiar-asesor/:id/:asesorId",
    component: CambiarAsesorSolicitudComponent,
  },
  {
    path: "creacion",
    component: CreacionDepCiuComponent
  },
  {
    path: "asesor-listar",
    component: ListarAsesorComponent,
  },
  {
    path: "asesor-agregar",
    component: CrearAsesorComponent,
  },
  {
    path: "asesor-eliminar/:id",
    component: EliminarAsesorComponent,
  },

  {
    path: "crear-solicitudes-cliente/:id",
    component: CrearSolicitudesClienteComponent,
  },

  {
    path: "pagina-inmueble/:id",
    component: SinglePageComponent,
  },
  {
    path: "asesor-editar/:id",
    component: EditarAsesorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }

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

const routes: Routes = [
  {
    path:"inmueble-listar",
    component: ListarInmuebleComponent,
  },
  {
    path:"inmueble-agregar",
    component: CrearInmuebleComponent,
  },
  {
    path:"inmueble-eliminar/:id",
    component: EliminarInmuebleComponent,
  },
  {
    path:"inmueble-editar/:id",
    component: EditarInmuebleComponent,
  },
  {
    path:"solicitud-listar",
    component: ListarSolicitudComponent,
  },
  {
    path:"solicitud-agregar",
    component: CrearSolicitudComponent,
  },
  {
    path:"solicitud-eliminar/:id",
    component: EliminarSolicitudComponent,
  },
  {
    path:"solicitud-editar/:id",
    component: EditarSolicitudComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }

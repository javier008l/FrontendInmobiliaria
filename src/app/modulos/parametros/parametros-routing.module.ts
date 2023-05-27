import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }

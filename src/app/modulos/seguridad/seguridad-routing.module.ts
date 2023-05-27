import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { RegistroPrivadoAsesorComponent } from './registro-privado-asesor/registro-privado-asesor.component';
import { RegistroPublicoAsesorComponent } from './registro-publico-asesor/registro-publico-asesor.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { FormularioContactoClienteComponent } from './formulario-contacto-cliente/formulario-contacto-cliente.component';
import { ValidarSesionInactivaGuard } from 'src/app/guardianes/validar-sesion-inactiva.guard';
import { ValidarSesionActivaGuard } from 'src/app/guardianes/validar-sesion-activa.guard';
import { FormularioContactoAsesorComponent } from './formulario-contacto-asesor/formulario-contacto-asesor.component';
import { SolicitudesClienteComponent } from './solicitudes-cliente/solicitudes-cliente.component';
import { InmobiliariaPublicoComponent } from './inmobiliaria-publico/inmobiliaria-publico.component';


const routes: Routes = [
  {
    path: 'autenticar-usuario',
    component: IdentificacionUsuarioComponent,
  },
  {
    path: 'identificar-usuario',
    component: IdentificacionUsuarioComponent,
    // canActivate: [ValidarSesionInactivaGuard]
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClaveComponent,
    // canActivate: [ValidarSesionInactivaGuard]
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent,
    canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: '2fa',
    component: IdentificacionTwofaComponent,
    // canActivate: [ValidarSesionInactivaGuard]
  },
  {
    path: 'registro-publico',
    component: RegistroPublicoUsuariosComponent,
    // canActivate: [ValidarSesionInactivaGuard]
  },

  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'validar-hash-usuario-publico/:hash',
    component: ValidarHashUsuarioPublicoComponent,
  },

  {
    path: 'usuario-crear',
    component: CrearUsuarioComponent,
    // canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: 'usuario-listar',
    component: ListarUsuarioComponent,
    // canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: 'usuario-editar/:id',
    component: EditarUsuarioComponent,
    // canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: 'usuario-eliminar',
    component: EliminarUsuarioComponent,
    // canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: 'registro-publico-asesor',
    component: RegistroPublicoAsesorComponent,
  },
  {
    path: "registro-privado-asesor",
    component: RegistroPrivadoAsesorComponent,
  },
  {
    path: "cambiar-clave",
    component: CambiarClaveComponent,
    // canActivate: [ValidarSesionActivaGuard]
  },
  {
    path: "formulario-contacto-cliente",
    component: FormularioContactoClienteComponent
  },
  {
    path: "formulario-contacto-asesor",
    component: FormularioContactoAsesorComponent
  },
  {
    path: "inmuebles-publico",
    component: InmobiliariaPublicoComponent
  },
  {
    path: "solicitudes-cliente",
    component: SolicitudesClienteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { RegistroPublicoAsesorComponent } from './registro-publico-asesor/registro-publico-asesor.component';
import { RegistroPrivadoAsesorComponent } from './registro-privado-asesor/registro-privado-asesor.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { FormularioContactoClienteComponent } from './formulario-contacto-cliente/formulario-contacto-cliente.component';
import { FormularioContactoAsesorComponent } from './formulario-contacto-asesor/formulario-contacto-asesor.component';
import { SolicitudesClienteComponent } from './solicitudes-cliente/solicitudes-cliente.component';
import { InmobiliariaPublicoComponent } from './inmobiliaria-publico/inmobiliaria-publico.component';
import { CreacionDepCiuComponent } from './creacion-dep-ciu/creacion-dep-ciu.component';
import { InmueblesAsesorComponent } from './inmuebles-asesor/inmuebles-asesor.component';



@NgModule({
  declarations: [
    IdentificacionUsuarioComponent,
    IdentificacionTwofaComponent,
    RecuperarClaveComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    EliminarUsuarioComponent,
    CerrarSesionComponent,
    RegistroComponent,
    RegistroPublicoUsuariosComponent,
    ValidarHashUsuarioPublicoComponent,
    RegistroPublicoAsesorComponent,
    RegistroPrivadoAsesorComponent,
    CambiarClaveComponent,
    FormularioContactoClienteComponent,
    FormularioContactoAsesorComponent,
    SolicitudesClienteComponent,
    InmobiliariaPublicoComponent,
    CreacionDepCiuComponent,
    InmueblesAsesorComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SeguridadModule { }

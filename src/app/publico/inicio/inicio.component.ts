import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  sesionAtiva: boolean = false;
  servicioSeguridad: any;

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token != "") {
          this.sesionAtiva = true;
        } else {
          this.sesionAtiva = false;
        }
      },
      error: (err: any) => {

      }
    })
  }

  ngOnInit() {
    this.ValidarSesion();
  }

}

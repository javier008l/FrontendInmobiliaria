import { Component } from '@angular/core';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private servicioSeguridad: SeguridadService) {
  }
  sesionAtiva: boolean = false;

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token != "") {
          this.sesionAtiva = true;
          if (localStorage.getItem('pageReloaded') !== 'true') {
            localStorage.setItem('pageReloaded', 'true');
            setTimeout(() => {
              window.location.reload();
            }, 1000); // Retraso de 2 segundos
          }
        } else {
          this.sesionAtiva = false;
          localStorage.removeItem('pageReloaded');
        }
      },
      error: (err: any) => {
        // Manejar el error aquí
      }
    });
  }



  ngOnInit() {
    this.ValidarSesion();
  }

}

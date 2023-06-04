import { Component } from '@angular/core';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';

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

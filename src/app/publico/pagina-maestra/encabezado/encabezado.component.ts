import { Component } from '@angular/core';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {

  constructor(
    private servicioSeguridad: SeguridadService
  ) {

  }

  sesionAtiva: boolean = false;

  ngOnInit() {
    this.ValidarSesion();
  }

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

}

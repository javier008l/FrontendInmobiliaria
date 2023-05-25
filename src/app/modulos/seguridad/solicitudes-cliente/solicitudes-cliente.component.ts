import { Component } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';


@Component({
  selector: 'app-solicitudes-cliente',
  templateUrl: './solicitudes-cliente.component.html',
  styleUrls: ['./solicitudes-cliente.component.css']
})
export class SolicitudesClienteComponent {
  listaSolicitudes: SolicitudModel[] = [];
  servicioSeguridad: any;
  sesionAtiva: boolean | undefined;

  constructor(
    private servicioParametrizacion: ParametrosService) {
  }


  solicitar() {
    const datosUsuario = localStorage.getItem("datos-usuario");
    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoCliente = usuario.correo;

      this.servicioParametrizacion.SolicitudesCliente(correoCliente).subscribe({
        next: (datos) => {
          this.listaSolicitudes = datos;
        },
        error: (err) => {

        }
      })

    }
  }
}

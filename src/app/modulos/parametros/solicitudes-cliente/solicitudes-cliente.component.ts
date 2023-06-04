import { Component } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-solicitudes-cliente',
  templateUrl: './solicitudes-cliente.component.html',
  styleUrls: ['./solicitudes-cliente.component.css']
})
export class SolicitudesClienteComponent {
  listaSolicitudes: SolicitudModel[] = [];
  servicioSeguridad: any;
  sesionActiva: boolean | undefined;

  constructor(private servicioSolicitudes: SolicitudService) { }

  obtenerEstadoSolicitud(estadoId: number): string {
    if (estadoId === 1) {
      return 'Enviado';
    } else if (estadoId === 2) {
      return 'En Estudio';
    } else if (estadoId === 3) {
      return 'Aceptado';
    } else if (estadoId === 4) {
      return 'Aceptado Con Codeudor';
    } else if (estadoId === 5) {
      return 'Rechazado';
    } else {
      return 'Desconocido';
    }
  }

  solicitar() {
    const datosUsuario = localStorage.getItem('datos-usuario');
    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoCliente = usuario.correo;

      this.servicioSolicitudes.SolicitudesCliente(correoCliente).subscribe({
        next: (datos) => {
          this.listaSolicitudes = datos;
        },
        error: (err) => { }
      });
    }
  }

  contrato() {
    window.open('https://drive.google.com/file/d/1FOJc2CWwjKx6jC9ZC-zw6GivNq89HOlB/view?usp=sharing', '_blank');
  }

  coDeudor() {
    window.open('https://drive.google.com/file/d/1PU66vg1BWsF_w9bvfpAwXRRDAH7eQfG8/view?usp=sharing', '_blank');
  }
}








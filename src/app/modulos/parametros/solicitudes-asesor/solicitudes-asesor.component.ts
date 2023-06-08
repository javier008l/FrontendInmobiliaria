import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoDeudorModel } from 'src/app/modelos/codeudor.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-solicitudes-asesor',
  templateUrl: './solicitudes-asesor.component.html',
  styleUrls: ['./solicitudes-asesor.component.css']
})


export class SolicitudesAsesorComponent {
  fGroup: FormGroup = new FormGroup({});
  listaSolicitudes: SolicitudModel[] = [];
  listaCoDeudor: CoDeudorModel[] = [];
  servicioSeguridad: any;
  sesionActiva: boolean | undefined;
  clienteId: any;

  constructor(private servicioSolicitudes: SolicitudService, private fb: FormBuilder) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      motivoRechazo: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

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

      this.servicioSolicitudes.SolicitudesAsesor(correoCliente).subscribe({
        next: (datos) => {
          this.listaSolicitudes = datos;
        },
        error: (err) => { }
      });
    }
  }

  rechazar(solicitudId: number) {
    let estadoSolicitudId = 5
    this.servicioSolicitudes.rechazar(solicitudId, estadoSolicitudId).subscribe({
      next: (datos) => {
        this.recargarPagina();
      },
      error: (err) => { }
    });
  }

  pasarEnEstudio(solicitudId: number) {
    let estadoSolicitudId = 2
    this.servicioSolicitudes.pasarEnEstudio(solicitudId, estadoSolicitudId).subscribe({
      next: (datos) => {
        this.recargarPagina();
      },
      error: (err) => { }
    });
  }

  aceptar(solicitudId: number) {
    let estadoSolicitudId = 3
    this.servicioSolicitudes.pasarEnEstudio(solicitudId, estadoSolicitudId).subscribe({
      next: (datos) => {
        this.recargarPagina();
      },
      error: (err) => { }
    });
  }

  aceptarCodeudor(solicitudId: number) {
    let estadoSolicitudId = 4
    this.servicioSolicitudes.pasarEnEstudio(solicitudId, estadoSolicitudId).subscribe({
      next: (datos) => {
        this.recargarPagina();
      },
      error: (err) => { }
    });
  }

  solicitarCodeudor(solicitudId: number) {
    let estadoSolicitudId = 4;
    this.servicioSolicitudes.SolicitudesCoDeudor(solicitudId, estadoSolicitudId).subscribe({
      next: (datos) => {
        if (typeof datos === 'object') {
          this.listaCoDeudor = Object.values(datos);
          alert("El URL con la informacion del CoDeudor es: " + this.listaCoDeudor[1])
        } else {
          this.listaCoDeudor = datos;
          alert(this.listaCoDeudor[1])
        }
      },
      error: (err) => { }
    });
  }

  subirComentario(event: Event, solicitudId: number) {
    event.preventDefault();
    const motivoRechazo = (document.getElementById('motivoRechazo-' + solicitudId) as HTMLInputElement)?.value;
    console.log(motivoRechazo);
    let estadoSolicitudId = 5
    this.servicioSolicitudes.motivoRechazo(solicitudId, estadoSolicitudId, motivoRechazo).subscribe({

    });
  }



  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  recargarPagina() {
    window.location.reload();
  }

}
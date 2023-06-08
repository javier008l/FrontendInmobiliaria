import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-solicitudes-cliente',
  templateUrl: './solicitudes-cliente.component.html',
  styleUrls: ['./solicitudes-cliente.component.css']
})
export class SolicitudesClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  listaSolicitudes: SolicitudModel[] = [];
  servicioSeguridad: any;
  sesionActiva: boolean | undefined;
  clienteId: any;


  constructor(private servicioSolicitudes: SolicitudService, private fb: FormBuilder) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      contrato: ['', [Validators.required, Validators.minLength(2)]],
      CoDeudor: ['', [Validators.required, Validators.minLength(2)]],
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

      this.servicioSolicitudes.SolicitudesCliente(correoCliente).subscribe({
        next: (datos) => {
          this.listaSolicitudes = datos;
        },
        error: (err) => { }
      });
    }
  }

  contrato() {
    alert("Una vez firmado el contrato, subelo a google drive como pdf y pon el link en URL Contrato y dale al boton subir contrato")
    window.open('https://drive.google.com/file/d/1FOJc2CWwjKx6jC9ZC-zw6GivNq89HOlB/view?usp=sharing', '_blank');
  }

  subirContrato() {
    const estadoId = 3;
    const contrato = this.ObtenerFormGroup["contrato"].value;
    const datosUsuario = localStorage.getItem('datos-usuario');

    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoAsesor = usuario.correo;

      this.servicioSolicitudes.idCliente(correoAsesor).subscribe({
        next: (datos) => {
          this.clienteId = Number(datos);

          if (this.clienteId) {
            this.servicioSolicitudes.subirContrato(contrato, estadoId, this.clienteId).subscribe({
              next: (datos) => {
                alert("Se Envio El Contrato con Exito");
              },
              error: (err) => {
                console.log(err);
              }
            });
          } else {
            console.log("No se pudo obtener el clienteId.");
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  subirCodeudor(solicitudId: number) {
    const documento = this.ObtenerFormGroup["CoDeudor"].value;

    this.servicioSolicitudes.subirCoDeudor(documento, solicitudId).subscribe({
      next: (datos) => {
        alert("Se Envio La Información con exito")
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  coDeudor() {
    window.open('https://drive.google.com/file/d/1PU66vg1BWsF_w9bvfpAwXRRDAH7eQfG8/view?usp=sharing', '_blank');
  }

  eliminar(id: number) {
    this.servicioSolicitudes.eliminarSolicitud(id).subscribe({
      next: (datos) => {
        this.recargarPagina();
      },
      error: (err) => { }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  recargarPagina() {
    window.location.reload();
  }

}








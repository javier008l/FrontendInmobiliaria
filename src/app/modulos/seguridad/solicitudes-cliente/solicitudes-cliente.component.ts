import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

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

  constructor(private servicioParametrizacion: ParametrosService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.ConstruirFormulario();
  }


  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      contrato: ['', [Validators.required, Validators.minLength(2)]],
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

      this.servicioParametrizacion.SolicitudesCliente(correoCliente).subscribe({
        next: (datos) => {
          this.listaSolicitudes = datos;
        },
        error: (err) => { }
      });
    }
  }

  contrato() {
    alert("Subir el contrato firmado a google drive e introducir el link en subir contrato")
    window.open('https://drive.google.com/file/d/1FOJc2CWwjKx6jC9ZC-zw6GivNq89HOlB/view?usp=sharing', '_blank');
  }

  subirContrato() {
    let contrato = this.ObtenerFormGroup["contrato"].value;
    console.log(contrato)

  }

  coDeudor() {
    window.open('https://drive.google.com/file/d/1PU66vg1BWsF_w9bvfpAwXRRDAH7eQfG8/view?usp=sharing', '_blank');
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}








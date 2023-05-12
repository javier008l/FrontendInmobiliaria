import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare const onloadCallback: any;
declare const grecaptcha: any;

@Component({
  selector: 'app-registro-publico-asesor',
  templateUrl: './registro-publico-asesor.component.html',
  styleUrls: ['./registro-publico-asesor.component.css']
})
export class RegistroPublicoAsesorComponent {

  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {
  }

  ngOnInit() {
    this.ConstruirFormulario();
    onloadCallback();
  }

  /**
   * Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(2)]],
      apellidoCompleto: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.minLength(7)]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  /**
   * Función de registro público
   */
  Registrarse() {

    const captcha = grecaptcha.getResponse();
    if (!captcha) {
      alert('Por favor, Llene todos los campos');
      return;
    }
    let campos = this.ObtenerFormGroup;
    let datos = {
      nombreCompleto: campos["nombreCompleto"].value,
      apellidoCompleto: campos["apellidoCompleto"].value,
      cedula: campos["cedula"].value,
      correo: campos["correo"].value,
      celular: "+57" + campos["telefono"].value,
      direccion: campos["direccion"].value,

    };
    console.log(datos)
    this.servicioSeguridad.SolicitudAsesor(datos).subscribe({
      next: () => {
        alert("Registro correcto, se ha enviado un mensaje para validar su dirección de correo electrónico.")
        alert("Se notificado al administrador de su solicitud, si no obtiene respuesta en 7 dias habiles, su solicitud fue rechazada")
      },
      error: () => {
        alert("Se ha producido un error en el registro.")
      }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare const onloadCallback: any;
declare const grecaptcha: any;

@Component({
  selector: 'app-registro-publico-usuarios',
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrls: ['./registro-publico-usuarios.component.css']
})
export class RegistroPublicoUsuariosComponent {
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
      primerNombre: ['', [Validators.required, Validators.minLength(2)]],
      segundoNombre: ['', [Validators.minLength(2)]],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: ['', [Validators.minLength(2)]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      cedula: ['', [Validators.required, Validators.minLength(7)]],
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
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      correo: campos["correo"].value,
      celular: "+57" + campos["telefono"].value,
      cedula: campos["cedula"].value
    }
    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next: (respuesta: UsuarioModel) => {
        alert("Registro correcto, se ha enviado un mensaje para validar su dirección de correo electrónico.")
      },
      error: (err) => {
        alert("Se ha producido un error en el registro.")
      }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}

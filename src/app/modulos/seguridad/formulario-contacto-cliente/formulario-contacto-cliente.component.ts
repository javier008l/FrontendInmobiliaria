import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
declare const seleccionador: any;

@Component({
  selector: 'app-formulario-contacto-cliente',
  templateUrl: './formulario-contacto-cliente.component.html',
  styleUrls: ['./formulario-contacto-cliente.component.css']
})
export class FormularioContactoClienteComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {
  }

  ngOnInit() {
    this.ConstruirFormulario();
    seleccionador()


  }

  /**
   * Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      tipoMensaje: ['', [Validators.required, Validators.minLength(2)]],
      inmueble: ['', [Validators.required, Validators.minLength(2)]],
      mensaje: ['', [Validators.required, Validators.minLength(2)]],
      venta: ['', [Validators.required]],
    });
  }

  /**
   * Función de registro público
   */
  Enviar() {

    let campos = this.ObtenerFormGroup;
    let datos = {
      tipoMensaje: campos["tipoMensaje"].value,
      inmueble: campos["inmueble"].value,
      mensaje: campos["mensaje"].value,
      venta: campos["venta"].value,

    }
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

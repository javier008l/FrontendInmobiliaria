import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-formulario-contacto-asesor',
  templateUrl: './formulario-contacto-asesor.component.html',
  styleUrls: ['./formulario-contacto-asesor.component.css']
})
export class FormularioContactoAsesorComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();

  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      motivoMensaje: ['', [Validators.required]],
      asuntoCorreo: ['', [Validators.required]],
      correoCliente: ['', [Validators.required]],
    });
  }

  Enviar() {
    let motivoMensaje = this.obtenerFormGroup['motivoMensaje'].value;
    let asuntoCorreo = this.obtenerFormGroup['asuntoCorreo'].value;
    let correoCliente = this.obtenerFormGroup['correoCliente'].value;

    const datosUsuario = localStorage.getItem("datos-usuario");

    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoAsesor = usuario.correo;
      this.servicioSeguridad.EnviarCorreoACliente(motivoMensaje, asuntoCorreo, correoCliente, correoAsesor).subscribe({
        next: (datos: UsuarioModel) => {
          alert("El correo se ha enviado con exito")
        },
        error: (err) => {
          alert("Ha ocurrido un error enviando el correo")
        }
      });
    }
  }
  get obtenerFormGroup() {
    return this.fGroup.controls;
  }


}

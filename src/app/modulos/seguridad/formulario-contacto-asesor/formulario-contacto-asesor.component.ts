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
      mensaje: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      correoCliente: ['', [Validators.required]],
    });
  }

  Enviar() {
    let mensaje = this.obtenerFormGroup['mensaje'].value;
    let asunto = this.obtenerFormGroup['asunto'].value;
    let correoCliente = this.obtenerFormGroup['correoCliente'].value;

    const datosUsuario = localStorage.getItem("datos-usuario");

    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const nombre = usuario.nombre
      const apellido = usuario.nombre
      const telefono = usuario.nombre
      const correo = usuario.correo;
      // this.servicioSeguridad.CambiarClave(correo, mensaje, asunto, nombre, apellido, telefono).subscribe({
      //   next: (datos: UsuarioModel) => {
      //     alert("El correo se ha enviado con exito")
      //   },
      //   error: (err) => {
      //     alert("Ha ocurrido un error enviando el correo")
      //   }
      // });
    }
  }
  get obtenerFormGroup() {
    return this.fGroup.controls;
  }


}

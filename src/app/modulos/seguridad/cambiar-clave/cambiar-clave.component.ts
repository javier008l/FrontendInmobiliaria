import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD5 } from 'crypto-js';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent {
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
      clave: ['', [Validators.required]],
      claveNueva: ['', [Validators.required]],
      claveVerificar: ['', [Validators.required]],
    });
  }

  CambiarClave() {

    let clave = this.obtenerFormGroup['clave'].value;
    let claveNueva = this.obtenerFormGroup['claveNueva'].value;
    let claveVerificar = this.obtenerFormGroup['claveVerificar'].value;
    let claveCifrada = MD5(clave).toString();
    this.servicioSeguridad

    const datosUsuario = localStorage.getItem("datos-usuario");

    if (claveNueva === claveVerificar && datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correo = usuario.correo;
      console.log("El correo es: " + correo);
      console.log("La contraseña Actual es: " + clave)
      console.log("La nueva contraseña es: " + claveNueva)
    }
  }
  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

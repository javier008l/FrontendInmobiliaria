import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-comprobar-clave',
  templateUrl: './comprobar-clave.component.html',
  styleUrls: ['./comprobar-clave.component.css']
})
export class ComprobarClaveComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      clave: ['', [Validators.required]],
      claveNueva: ['', [Validators.required]],
    });
  }

  ComprobarClave() {

    let clave = this.obtenerFormGroup['clave'].value;
    let claveNueva = this.obtenerFormGroup['claveNueva'].value;
    let claveCifrada = MD5(clave).toString();
    this.servicioSeguridad

    if (clave != claveNueva) {
      alert("Asegurar que la clave sea la misma");
    } else {
      if (
        (clave === claveNueva)
      ) {
        alert("Contraseñas Concuerdan")
      }
    }

  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

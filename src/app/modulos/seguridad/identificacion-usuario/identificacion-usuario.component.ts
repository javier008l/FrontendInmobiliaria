import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css'],
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  IdentificarUsuario() {
    if (this.fGroup.invalid) {
      alert('Datos incompletos');
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad
        .IdentificarUsuario(usuario, claveCifrada)
        /* Subscribing to an observable returned by the `IdentificarUsuario` method of the
        `SeguridadService`. The `next` function is called when the observable emits a
        value, which in this case is a `UsuarioModel` object. The function logs the
        `datos` object to the console, navigates to the `/seguridad/2fa` route using the
        `Router` service, and logs a message to the console. The `error` function is
        called if the observable emits an error, and logs the error to the console. */
        .subscribe({
          next: (datos: UsuarioModel) => {
            console.log(datos);
            this.router.navigate(['/seguridad/2fa']);
            console.log('----------------PRUEBA----------------');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

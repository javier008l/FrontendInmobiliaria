import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent {
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
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  CambiarClave() {
    if (this.fGroup.invalid) {
      alert('Datos incompletos');
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad
        .IdentificarUsuario(usuario, claveCifrada)
        .subscribe({
          next: (datos: UsuarioModel) => {
            console.log(datos);
            if (datos._id == undefined || datos._id == null || datos._id == "") {
              alert("Credenciales incorrectas");
            } else {
              this.router.navigate(['/seguridad/comprobar-clave']);
            }

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

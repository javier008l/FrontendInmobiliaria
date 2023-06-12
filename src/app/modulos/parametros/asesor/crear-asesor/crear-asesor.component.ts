import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-crear-asesor',
  templateUrl: './crear-asesor.component.html',
  styleUrls: ['./crear-asesor.component.css']
})
export class CrearAsesorComponent {

  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {
  }

  ngOnInit() {
    this.ConstruirFormulario();
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
      direccion: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  /**
   * Función de registro público
   */
  Registrarse() {
    let campos = this.ObtenerFormGroup;
    let datos = {
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      correo: campos["correo"].value,
      telefono: "+57" + campos["telefono"].value,
      direccion: campos["direccion"].value,
      cedula: campos["cedula"].value
    }
    this.servicioSeguridad.RegistrarAsesorPivado(datos).subscribe({
      next: () => {
        alert("El registro ha sido exitoso")
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


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { AsesorModel } from 'src/app/modelos/asesor.model';
import { AsesorService } from 'src/app/servicios/parametros/asesor.service';

@Component({
  selector: 'app-editar-asesor',
  templateUrl: './editar-asesor.component.html',
  styleUrls: ['./editar-asesor.component.css']
})
export class EditarAsesorComponent {

  fGroup: FormGroup = new FormGroup({});
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: AsesorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId! = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: AsesorModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["primerNombre"].setValue(datos.primerNombre);
        this.obtenerFgDatos["segundoNombre"].setValue(datos.segundoNombre);
        this.obtenerFgDatos["primerApellido"].setValue(datos.primerApellido);
        this.obtenerFgDatos["segundoApellido"].setValue(datos.segundoApellido);
        this.obtenerFgDatos["cedula"].setValue(datos.cedula);
        this.obtenerFgDatos["correo"].setValue(datos.correo);
        this.obtenerFgDatos["telefono"].setValue(datos.telefono);
        this.obtenerFgDatos["direccion"].setValue(datos.direccion);
        this.obtenerFgDatos["inmuebleId"].patchValue(datos.inmuebleId)
        this.obtenerFgDatos["solicitudId"].patchValue(datos.solicitudId)
      },
      error: (err) => {
        alert("El registro no existe.")
      }
    });
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      cedula: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      inmuebleId: [''],
      solicitudId: [''],

    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo.");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: AsesorModel) => {
          alert("Información modificada correctamente");
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): AsesorModel {
    let model = new AsesorModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.primerNombre = this.obtenerFgDatos["primerNombre"].value;
    model.segundoNombre = this.obtenerFgDatos["segundoNombre"].value;
    model.primerApellido = this.obtenerFgDatos["primerApellido"].value;
    model.segundoApellido = this.obtenerFgDatos["segundoApellido"].value;
    model.cedula = this.obtenerFgDatos["cedula"].value;
    model.correo = this.obtenerFgDatos["correo"].value;
    model.telefono = this.obtenerFgDatos["telefono"].value;
    model.direccion = this.obtenerFgDatos["direccion"].value;
    model.inmuebleId = this.obtenerFgDatos["inmuebleId"].value;
    model.solicitudId = this.obtenerFgDatos["solicitudId"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}

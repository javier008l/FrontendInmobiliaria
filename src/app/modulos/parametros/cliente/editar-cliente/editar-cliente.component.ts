import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {

  nombreArchivoCargado: String = '';
  fGroup: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.ConstruirFormularioArchivo();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["primerNombre"].setValue(datos.primerNombre);
        this.obtenerFgDatos["segundoNombre"].setValue(datos.segundoNombre);
        this.obtenerFgDatos["primerApellido"].setValue(datos.primerApellido);
        this.obtenerFgDatos["segundoApellido"].setValue(datos.segundoApellido);
        this.obtenerFgDatos["cedula"].setValue(datos.cedula);
        this.obtenerFgDatos["correo"].setValue(datos.correo);
        this.obtenerFgDatos["telefono"].setValue(datos.telefono);
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
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo.");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: ClienteModel) => {
          alert("Información modificada correctamente");
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): ClienteModel {
    let model = new ClienteModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.primerNombre = this.obtenerFgDatos["primerNombre"].value;
    model.segundoNombre = this.obtenerFgDatos["segundoNombre"].value;
    model.primerApellido = this.obtenerFgDatos["primerApellido"].value;
    model.segundoApellido = this.obtenerFgDatos["segundoApellido"].value;
    model.cedula = this.obtenerFgDatos["cedula"].value;
    model.correo = this.obtenerFgDatos["correo"].value;
    model.telefono = this.obtenerFgDatos["telefono"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  /** Carga de archivo */

  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }

  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }

}

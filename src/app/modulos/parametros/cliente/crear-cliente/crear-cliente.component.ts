import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {

  fGroup: FormGroup = new FormGroup({});
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      cedula: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.AgregarRegistro(model).subscribe({
        next: (data: ClienteModel) => {
          alert("Información almacenada correctamente");
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

}

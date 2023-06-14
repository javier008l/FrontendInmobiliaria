import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ArchivoModel } from 'src/app/modelos/archivo.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService } from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent {

  fGroup: FormGroup = new FormGroup({});
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  tipo: number = 0;
  mostrarCampoTipoInmueble = false;
  nombreArchivoCargado: String = '';
  nombreArchivoCargado1: String = '';
  nombreArchivoCargado2: String = '';
  nombreArchivoCargado3: String = '';
  archivoCargado: Boolean = false;
  archivoCargado1: Boolean = false;
  archivoCargado2: Boolean = false;
  archivoCargado3: Boolean = false;

  cargaArchivoFG: FormGroup = this.fb.group({
    archivo: ['', []],
    archivo1: ['', []],
    archivo2: ['', []],
    archivo3: ['', []]
  });

  constructor(
    private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.ConstruirFormularioArchivo();
  }

  ConstruirFormularioDatos() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    this.fGroup = this.fb.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      tipoInmuebleId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paraVenta: [false],
      paraAlquiler: [false],
      correoAsesor: [''],
      fecha: [formattedDate, [Validators.required]],
      foto1: [''],
      foto2: [],
      foto3: [],
    });
  }

  GuardarRegistro() {
    let model = this.obtenerRegistro();
    this.servicio.AgregarRegistro(model).subscribe({
      next: (data: InmuebleModel) => {
        alert("Información almacenada correctamente");
        this.router.navigate(['/parametros/inmueble-listar']);
        console.log(model)
      },
      error: (err: any) => {
        alert("Ha ocurrido un error");
      }
    })

  }

  obtenerRegistro(): InmuebleModel {
    let model = new InmuebleModel();
    model.direccion = this.obtenerFgDatos["direccion"].value;
    model.costo = this.obtenerFgDatos["costo"].value;
    model.foto = this.obtenerFgDatos["foto"].value;
    model.tipoInmuebleId = this.obtenerFgDatos["tipoInmuebleId"].value;
    model.ciudadId = this.obtenerFgDatos["ciudadId"].value;
    model.paraVenta = this.obtenerFgDatos["paraVenta"].value;
    model.paraAlquiler = this.obtenerFgDatos["paraAlquiler"].value;
    model.correoAsesor = this.obtenerFgDatos["correoAsesor"].value;
    model.fecha = this.convertDateFormat(this.obtenerFgDatos["fecha"].value);
    model.foto1 = this.obtenerFgDatos["foto1"].value;
    model.foto2 = this.obtenerFgDatos["foto2"].value;
    model.foto3 = this.obtenerFgDatos["foto3"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  convertDateFormat(inputDate: string): Date {
    const parts = inputDate.split('/');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    const formattedDate = `${year}-${month}-${day} ${currentTime}`;

    return new Date(formattedDate);
  }

  mostrarTexto() {
    this.mostrarCampoTipoInmueble = true;
  }

  /** Carga de archivo */

  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: ['', []],
      archivo1: ['', []],
      archivo2: ['', []],
      archivo3: ['', []]
    });
  }

  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }

  CargarArchivo() {
    const formData = new FormData();
    formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        console.log(data);
        this.nombreArchivoCargado = data.file;
        this.obtenerFgDatos["foto"].setValue(this.nombreArchivoCargado);
        this.archivoCargado = true;
        alert("Archivo cargado correctamente.");
      },
      error: (err: any) => {
        alert("Error cargando el archivo");
      }
    });
  }

  CuandoSeleccionaArchivo(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo"].setValue(f);
    }
  }

  CargarArchivo1() {
    const formData = new FormData();
    formData.append('file', this.obtenerFgArchivo["archivo1"].value);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        console.log(data);
        this.nombreArchivoCargado1 = data.file;
        this.archivoCargado1 = true;
        alert("Archivo cargado correctamente.");
      },
      error: (err: any) => {
        alert("Error cargando el archivo 1");
      }
    });
  }

  CuandoSeleccionaArchivo1(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo1"].setValue(f);
    }
  }

  CargarArchivo2() {
    const formData = new FormData();
    formData.append('file', this.cargaArchivoFG.controls["archivo2"].value);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        console.log(data);
        this.nombreArchivoCargado2 = data.file;
        this.obtenerFgDatos["foto2"].setValue(this.nombreArchivoCargado2); // Corregir esta línea
        this.archivoCargado2 = true;
        alert("Archivo cargado correctamente.");
      },
      error: (err: any) => {
        alert("Error cargando el archivo 2");
      }
    });
  }

  CuandoSeleccionaArchivo2(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo2"].setValue(f);
    }
  }

  CargarArchivo3() {
    const formData = new FormData();
    formData.append('file', this.cargaArchivoFG.controls["archivo3"].value);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        console.log(data);
        this.nombreArchivoCargado3 = data.file;
        this.obtenerFgDatos["foto3"].setValue(this.nombreArchivoCargado3); // Corregir esta línea
        this.archivoCargado3 = true;
        alert("Archivo cargado correctamente.");
      },
      error: (err: any) => {
        alert("Error cargando el archivo 3");
      }
    });
  }

  CuandoSeleccionaArchivo3(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo3"].setValue(f);
    }
  }
}





import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ArchivoModel } from 'src/app/modelos/archivo.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService } from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent {

  fGroup: FormGroup = new FormGroup({});
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  tipo: number = 0;

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
      next: (datos: InmuebleModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["direccion"].setValue(datos.direccion);
        this.obtenerFgDatos["costo"].setValue(datos.costo);
        this.obtenerFgDatos["foto"].setValue(datos.foto);
        this.obtenerFgDatos["tipoInmuebleId"].setValue(datos.tipoInmuebleId);
        this.obtenerFgDatos["ciudadId"].setValue(datos.ciudadId);
        this.obtenerFgDatos["paraVenta"].setValue(datos.paraVenta);
        this.obtenerFgDatos["paraAlquiler"].setValue(datos.paraAlquiler);
        this.obtenerFgDatos["correoAsesor"].setValue(datos.correoAsesor);
        this.obtenerFgDatos["fecha"].setValue(datos.fecha);
        this.obtenerFgDatos["foto1"].setValue(datos.foto1)
        this.obtenerFgDatos["foto2"].setValue(datos.foto2)
        this.obtenerFgDatos["foto3"].setValue(datos.foto3)
        this.nombreArchivoCargado = datos.foto!;
        this.archivoCargado = true;
        this.nombreArchivoCargado1 = datos.foto!;
        this.archivoCargado1 = true;
        this.nombreArchivoCargado2 = datos.foto!;
        this.archivoCargado2 = true;
        this.nombreArchivoCargado3 = datos.foto!;
        this.archivoCargado3 = true;
      },
      error: (err) => {
        alert("El registro no existe.")
      }
    });
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      direccion: [''],
      costo: [''],
      foto: [''],
      tipoInmuebleId: [''],
      ciudadId: [''],
      paraVenta: [''],
      paraAlquiler: [''],
      correoAsesor: [''],
      fecha: [''],
      foto1: [''],
      foto2: [''],
      foto3: [''],
    });
  }

  EditarRegistro() {
    let model = this.obtenerRegistro();
    this.servicio.EditarRegistro(model).subscribe({
      next: (data: InmuebleModel) => {
        alert("Información modificada correctamente");
        this.router.navigate(['/parametros/inmueble-listar']);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error");
      }
    })

  }

  obtenerRegistro(): InmuebleModel {
    let model = new InmuebleModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.direccion = this.obtenerFgDatos["direccion"].value;
    model.costo = this.obtenerFgDatos["costo"].value;
    model.foto = this.obtenerFgDatos["foto"].value;
    model.tipoInmuebleId = this.obtenerFgDatos["tipoInmuebleId"].value;
    model.ciudadId = this.obtenerFgDatos["ciudadId"].value;
    model.paraVenta = this.obtenerFgDatos["paraVenta"].value;
    model.paraAlquiler = this.obtenerFgDatos["paraAlquiler"].value;
    model.correoAsesor = this.obtenerFgDatos["correoAsesor"].value;
    model.fecha = this.obtenerFgDatos["fecha"].value;
    model.foto1 = this.obtenerFgDatos["foto1"].value;
    model.foto2 = this.obtenerFgDatos["foto2"].value;
    model.foto3 = this.obtenerFgDatos["foto3"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
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

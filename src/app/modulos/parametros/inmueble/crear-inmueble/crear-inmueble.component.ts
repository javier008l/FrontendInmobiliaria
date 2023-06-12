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

  nombreArchivoCargado: String = '';
  fGroup: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  tipo: number = 0;
  // tiposInmueble: TipoInmuebleModel[] = [];
  // ciudades: CiudadModel[] = [];

  constructor(
    private fb: FormBuilder,
    private servicio: InmuebleService,
    // private servicioTipoInmueble: TipoInmuebleService,
    // private servicioCiudad: CiudadService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.ConstruirFormularioArchivo();
    // this.obtenerTiposInmueble();
    // this.obtenerCiudades();
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
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
      paraVenta: [''],
      paraAlquiler: [''],
      correoAsesor: [''],
      fecha: [formattedDate, [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo.");
    } else {
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

  convertDateFormat(inputDate: string): Date {
    const parts = inputDate.split('/');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    const formattedDate = `${year}-${month}-${day} ${currentTime}`;

    return new Date(formattedDate);
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

  onSelectChange(value: string) {
    this.tipo = parseInt(value, 10);
  }

  // --------------------------------------------------------
  // obtenerTiposInmueble() {
  //   this.servicioTipoInmueble.obtenerTiposInmueble().subscribe(
  //     (tipos: TipoInmuebleModel[]) => {
  //       this.tiposInmueble = tipos;
  //       // console.log("tipos", tipos)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // obtenerCiudades(): void {
  //   this.servicioCiudad.obtenerCiudades().subscribe(
  //     (response: CiudadModel[]) => {
  //       this.ciudades = response;
  //     },
  //     (error) => {
  //       console.log('Error al obtener las ciudades:', error);
  //     }
  //   );
  // }

  // onCiudadSelectChange(ciudadId: number) {
  //   console.log('Ciudad seleccionada:', ciudadId);

  //   // Obtener la ciudad seleccionada
  //   const ciudadSeleccionada = this.ciudades.find(ciudad => ciudad.id === ciudadId);

  //   // Realizar la lógica adicional con la ciudad seleccionada
  //   if (ciudadSeleccionada) {
  //     console.log('Nombre de la ciudad:', ciudadSeleccionada.nombre);
  //     console.log('Departamento ID:', ciudadSeleccionada.departamentoId);
  //     // Realizar más operaciones según sea necesario
  //   } else {
  //     console.log('Ciudad no encontrada');
  //   }
  // }


}





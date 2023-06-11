import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent {

  nombreArchivoCargado: String = '';
  fGroup: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  tipo: number = 0;
  tipo2: number = 0;
  tipo3: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.BuscarRegistro();
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: SolicitudModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["fechaSolicitud"].setValue(datos.fechaSolicitud);
        this.obtenerFgDatos["clienteId"].setValue(datos.clienteId);
        this.obtenerFgDatos["asesorId"].setValue(datos.asesorId);
        this.obtenerFgDatos["codeudorId"].setValue(datos.codeudorId);
        this.obtenerFgDatos["tipoSolicitudId"].setValue(datos.tipoSolicitudId);
        this.obtenerFgDatos["estadoId"].setValue(datos.estadoId);
        this.obtenerFgDatos["tipoInmuebleId"].setValue(datos.tipoInmuebleId);
        this.obtenerFgDatos["inmuebleId"].setValue(datos.inmuebleId);
        this.obtenerFgDatos["motivoRechazo"].setValue(datos.motivoRechazo);
      },
      error: (err) => {
        alert("El registro no existe.")
      }
    });
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      fechaSolicitud: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
      asesorId: ['', [Validators.required]],
      codeudorId: [''],
      tipoSolicitudId: ['', [Validators.required]],
      estadoId: ['', [Validators.required]],
      tipoInmuebleId: ['', [Validators.required]],
      inmuebleId: ['', [Validators.required]],
      motivoRechazo: [''],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: SolicitudModel) => {
          alert("Información modificada correctamente");
          this.router.navigate(['/parametros/solicitud-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): SolicitudModel {
    let model = new SolicitudModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.fechaSolicitud = this.obtenerFgDatos["fechaSolicitud"].value;
    model.clienteId = this.obtenerFgDatos["clienteId"].value;
    model.asesorId = this.obtenerFgDatos["asesorId"].value;
    model.codeudorId = this.obtenerFgDatos["codeudorId"].value;
    model.tipoSolicitudId = this.obtenerFgDatos["tipoSolicitudId"].value;
    model.estadoId = this.obtenerFgDatos["estadoId"].value;
    model.tipoInmuebleId = this.obtenerFgDatos["tipoInmuebleId"].value;
    model.inmuebleId = this.obtenerFgDatos["inmuebleId"].value;
    model.motivoRechazo = this.obtenerFgDatos["motivoRechazo"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  onSelectChangeEstado(value: string) {
    this.tipo = parseInt(value, 10);
  }

  onSelectChangeTipoInmueble(value: string) {
    this.tipo2 = parseInt(value, 10);
  }

  onSelectChangeTipoSolicitud(value: string) {
    this.tipo3 = parseInt(value, 10);
  }

}

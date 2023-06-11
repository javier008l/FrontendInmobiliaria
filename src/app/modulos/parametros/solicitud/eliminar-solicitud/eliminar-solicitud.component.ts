import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent {

  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  fechaSolicitud: Date = new Date();
  clienteId: number = 0;
  asesorId: number = 0;
  codeudorId: number = 0;
  tipoSolicitudId: number = 0;
  estadoId: number = 0;
  tipoInmuebleId?: number = 0;
  inmuebleId: number = 0;
  motivoRechazo: string = ""

  constructor(
    private servicio: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: SolicitudModel) => {
        this.recordId = datos.id!;
        this.fechaSolicitud = datos.fechaSolicitud!;
        this.clienteId = datos.clienteId!;
        this.asesorId = datos.asesorId!;
        this.codeudorId = datos.codeudorId!;
        this.tipoSolicitudId = datos.tipoSolicitudId!;
        this.estadoId = datos.estadoId!;
        this.tipoInmuebleId = datos.tipoInmuebleId!;
        this.motivoRechazo = datos.motivoRechazo!;
      },
      error: (err) => {
        alert("El registro no existe.")
      }
    });
  }


  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: any) => {
        alert("Información eliminada correctamente");
        this.router.navigate(['/parametros/solicitud-listar']);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error");
      }
    });
  }
}

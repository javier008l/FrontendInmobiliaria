import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent {
  listaSolicitudes: SolicitudModel[]=[];  
  pag = 1;
  total = 0;
  registroPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(
    private servicioSolicitudes : SolicitudService
  ){
  }

  ngOnInit(){
    this.ListarRegistrosSolicitudes()    
  }

  ListarRegistrosSolicitudes() {
    this.servicioSolicitudes.listarRegistrosSolicitudes().subscribe({
      next: (datos) => {
        this.listaSolicitudes = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

  obtenerEstadoSolicitud(estadoId: number): string {
    if (estadoId === 1) {
      return 'Enviado';
    } else if (estadoId === 2) {
      return 'En Estudio';
    } else if (estadoId === 3) {
      return 'Aceptado';
    } else if (estadoId === 4) {
      return 'Aceptado Con Codeudor';
    } else if (estadoId === 5) {
      return 'Rechazado';
    } else if (estadoId === undefined) {
      return 'Desconocido';
    }
    return this.obtenerEstadoSolicitud(estadoId);
  }

  obtenerTipoInmueble(tipoInmuebleId: number): string {
    if (tipoInmuebleId === 1) {
      return 'Casa';
    } else if (tipoInmuebleId === 2) {
      return 'Apartamento';
    } else if (tipoInmuebleId === 3) {
      return 'Finca';
    } else if (tipoInmuebleId === undefined) {
      return 'Desconocido';
    }
    return this.obtenerTipoInmueble(tipoInmuebleId);
  }

  obtenerTipoSolicitud(tipoSolicitudId: number): string {
    if (tipoSolicitudId === 1) {
      return 'Compra';
    } else if (tipoSolicitudId === 2) {
      return 'Venta';
    } else if (tipoSolicitudId === undefined) {
      return 'Desconocido';
    }
    return this.obtenerTipoSolicitud(tipoSolicitudId);
  }

}

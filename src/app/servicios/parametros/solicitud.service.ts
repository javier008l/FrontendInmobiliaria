import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { CoDeudorModel } from 'src/app/modelos/codeudor.model';
import { ContratoModel } from 'src/app/modelos/contrato.model';
import { PaginadorSolicitudModel } from 'src/app/modelos/paginador.solicitud.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  // listarRegistrosSolicitudes(): Observable<SolicitudModel[]> {
  //   return this.http.get<SolicitudModel[]>(`${this.urlBase}solicitud?filter={"limit":${ConfiguracionPaginacion.registrosPorPagina}}`);
  // }
  listarRegistrosSolicitudesPaginados(pag: number): Observable<PaginadorSolicitudModel> {
    let limit = ConfiguracionPaginacion.registrosPorPagina;
    let skip = (pag -1) * limit;
    let url = `${this.urlBase}solicitud-paginada?filter={"limit":${limit}, "skip":${skip}}`
    return this.http.get<PaginadorSolicitudModel>(url);
  }

  SolicitudesCliente(correoCliente: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}solicitudes-cliente`, {
      correoCliente: correoCliente
    }
    );
  }

  SolicitudesAsesor(correoCliente: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}solicitudes-asesor`, {
      correoCliente: correoCliente
    }
    );
  }

  SolicitudesCoDeudor(solicitudId: number, estadoSolicitudId: number): Observable<CoDeudorModel[]> {
    return this.http.post<CoDeudorModel[]>(
      `${this.urlBase}mostrar-codeudor`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId
    }
    );
  }

  eliminarSolicitud(id: number): Observable<SolicitudModel[]> {
    return this.http.delete<SolicitudModel[]>(`${this.urlBase}solicitud/${id}`);
  }

  pasarEnEstudio(solicitudId: number, estadoSolicitudId: number): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}/notificacion-estado-solicitud`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId
    }
    );
  }

  motivoRechazo(solicitudId: number, estadoSolicitudId: number, motivoRechazo: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}/notificacion-estado-solicitud`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId,
      motivoRechazo: motivoRechazo
    }
    );
  }
  rechazar(solicitudId: number, estadoSolicitudId: number): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}/notificacion-estado-solicitud`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId
    }
    );
  }

  aceptar(solicitudId: number, estadoSolicitudId: number): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}/notificacion-estado-solicitud`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId
    }
    );
  }

  aceptarCodeudor(solicitudId: number, estadoSolicitudId: number): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}/notificacion-estado-solicitud`, {
      solicitudId: solicitudId,
      estadoSolicitudId: estadoSolicitudId
    }
    );
  }

  idCliente(correoAsesor: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}cliente-correo`, {
      correoAsesor: correoAsesor
    }
    );
  }

  subirCoDeudor(documento: string, solicitudId: number): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}codeudor`, {
      documento: documento,
      solicitudId: solicitudId
    }
    );
  }

  subirContrato(contrato: string, estadoId: number, clienteId: number): Observable<ContratoModel[]> {
    return this.http.post<ContratoModel[]>(
      `${this.urlBase}contrato`, {
      contrato: contrato,
      estadoId: estadoId,
      clienteId: clienteId
    }
    );
  }

}

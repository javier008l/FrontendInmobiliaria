import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { AsesorModel } from 'src/app/modelos/asesor.model';
import { CoDeudorModel } from 'src/app/modelos/codeudor.model';
import { ConteosModel } from 'src/app/modelos/conteos.model';
import { ContratoModel } from 'src/app/modelos/contrato.model';
import { DatosAsignacionSolicitudes } from 'src/app/modelos/datos-asignacion-solicitud.model';
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
    let skip = (pag - 1) * limit;
    let url = `${this.urlBase}solicitud-paginada?filter={"limit":${limit}, "skip":${skip}, "order":"id DESC"}`
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

  // CambiarASesor(solicitudId: number, asesorActualId: number, asesorNuevoId: number): Observable<DatosAsignacionSolicitudes[]> {
  //   return this.http.post<DatosAsignacionSolicitudes[]>(
  //     `${this.urlBase}cambiar-Solicitud-asesor`, {
  //     solicitudId: solicitudId,
  //     asesorActualId: asesorActualId,
  //     asesorNuevoId: asesorNuevoId
  //   }
  //   );
  // }

  CambiarASesor(solicitudId: number, asesorActualId: number, asesorNuevoId: number): Observable<DatosAsignacionSolicitudes[]> {
    return this.http.post<DatosAsignacionSolicitudes[]>(
      `${this.urlBase}cambiar-Solicitud-asesor`, {
      solicitudId: solicitudId,
      asesorActualId: asesorActualId,
      asesorNuevoId: asesorNuevoId
    });
  }

  conseguirId(correoAsesor: string): Observable<AsesorModel[]> {
    return this.http.post<AsesorModel[]>(
      `${this.urlBase}id-asesor`, {
      correoAsesor: correoAsesor,
    });
  }

  conseguirClienteId(correoAsesor: string): Observable<AsesorModel[]> {
    return this.http.post<AsesorModel[]>(
      `${this.urlBase}id-cliente`, {
      correoAsesor: correoAsesor,
    });
  }

  hacerSolicitud(inmuebleId: number, asesorId: number, clienteId: number, tipoInmuebleId: number, tipoSolicitudId: number, fechaSolicitud: Date): Observable<AsesorModel[]> {
    return this.http.post<AsesorModel[]>(
      `${this.urlBase}solicitud`, {
      inmuebleId: inmuebleId,
      asesorId: asesorId,
      clienteId: clienteId,
      tipoInmuebleId: tipoInmuebleId,
      tipoSolicitudId: tipoSolicitudId,
      fechaSolicitud: fechaSolicitud
    });
  }

  contarAsesor(nombre: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const requestBody = { nombre: nombre };
    return this.http.post<any>(`${this.urlBase}total`, requestBody, httpOptions);
  }

  contarCliente(nombre: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const requestBody = { nombre: nombre };
    return this.http.post<any>(`${this.urlBase}total`, requestBody, httpOptions);
  }

  contarInmuebles(nombre: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const requestBody = { nombre: nombre };
    return this.http.post<any>(`${this.urlBase}total`, requestBody, httpOptions);
  }

  contarSolicitudes(nombre: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const requestBody = { nombre: nombre };
    return this.http.post<any>(`${this.urlBase}total`, requestBody, httpOptions);
  }


  BuscarRegistro(id: number): Observable<SolicitudModel> {
    return this.http.get<SolicitudModel>(`${this.urlBase}solicitud/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}solicitud/${id}`);
  }

  EditarRegistro(registro: SolicitudModel): Observable<SolicitudModel> {
    return this.http.put(`${this.urlBase}solicitud/${registro.id}`, registro);
  }

}

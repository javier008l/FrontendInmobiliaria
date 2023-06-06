import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ContratoModel } from 'src/app/modelos/contrato.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  listarRegistrosSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.urlBase}solicitud?filter={"limit":${ConfiguracionPaginacion.registrosPorPagina}}`);
  }

  SolicitudesCliente(correoCliente: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}solicitudes-cliente`, {
      correoCliente: correoCliente
    }
    );
  }

  eliminarSolicitud(id: number): Observable<SolicitudModel[]> {
    return this.http.delete<SolicitudModel[]>(`${this.urlBase}solicitud/${id}`);
  }

  idCliente(correoAsesor: string): Observable<SolicitudModel[]> {
    return this.http.post<SolicitudModel[]>(
      `${this.urlBase}cliente-correo`, {
      correoAsesor: correoAsesor
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

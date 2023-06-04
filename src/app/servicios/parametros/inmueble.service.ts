import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { InmuebleModel } from '../../modelos/inmueble.model';
import { Observable } from 'rxjs';
import { SolicitudModel } from '../../modelos/solicitud.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  /**
   * Listado de inmuebles
   * @returns
   */
  listarRegistros(tipo?: string, tipoInmuebleId?: number): Observable<InmuebleModel[]> {
    let url = `${this.urlBase}/listar-inmuebles?tipo=${tipo}?limit=20`;
    if (tipoInmuebleId) {
      url += `tipoInmuebleId=${tipoInmuebleId}`;
    }

    return this.http.get<InmuebleModel[]>(url)
  }


  InmueblesAsesor(correoAsesor: string): Observable<InmuebleModel[]> {
    return this.http.post<InmuebleModel[]>(
      `${this.urlBase}ver-inmuebles-asesor`, {
      correoAsesor: correoAsesor
    }
    );
  }

}

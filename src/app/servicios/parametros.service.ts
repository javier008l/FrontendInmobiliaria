import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { InmuebleModel } from '../modelos/inmueble.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../config/configuracion.paginacion';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  /**
   * Listado de inmuebles
   * @returns
   */
  listarRegistros(): Observable<InmuebleModel[]> {
    return this.http.get<InmuebleModel[]>(
      `${this.urlBase}inmueble-para-venta`,
    );
  }

  listarAlquiler(): Observable<InmuebleModel[]> {
    return this.http.get<InmuebleModel[]>(
      `${this.urlBase}inmueble-para-alquiler`,
    );
  }
}

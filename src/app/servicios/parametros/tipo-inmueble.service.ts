import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { TipoInmuebleModel } from 'src/app/modelos/tipoInmueble.model';

@Injectable({
  providedIn: 'root'
})
export class TipoInmuebleService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) {
   }

   obtenerTiposInmueble(): Observable<TipoInmuebleModel[]> {
    return this.http.get<TipoInmuebleModel[]>(`${this.urlBase}tipoInmueble`);
  }
}

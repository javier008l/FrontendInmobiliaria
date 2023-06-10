import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { CiudadModel } from 'src/app/modelos/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  obtenerCiudades(): Observable<CiudadModel[]> {
    return this.http.get<CiudadModel[]>(`${this.urlBase}ciudad`);
  }
}

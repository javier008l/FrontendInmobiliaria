import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { InmuebleModel } from '../../modelos/inmueble.model';
import { Observable, map } from 'rxjs';
import { SolicitudModel } from '../../modelos/solicitud.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { ArchivoModel } from 'src/app/modelos/archivo.model';

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

  AgregarRegistro(registro: InmuebleModel): Observable<InmuebleModel> {
    return this.http.post(`${this.urlBase}inmueble`, registro);
  }

  EditarRegistro(registro: InmuebleModel): Observable<InmuebleModel> {
    return this.http.put(`${this.urlBase}inmueble/${registro.id}`, registro);
  }

  CargarArchivo(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlBase}cargar-archivo-inmueble`, formData);
  }

  BuscarRegistro(id: number): Observable<InmuebleModel> {
    return this.http.get<InmuebleModel>(`${this.urlBase}inmueble/${id}`);
  }

  singlePage(id: number): Observable<InmuebleModel[]> {
    return this.http.get<InmuebleModel[]>(`${this.urlBase}inmueble/${id}`).pipe(
      map((data: InmuebleModel | InmuebleModel[]) => {
        if (Array.isArray(data)) {
          return data; // Already an array
        } else {
          return [data]; // Wrap the single object in an array
        }
      })
    );
  }


  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}inmueble/${id}`);
  }

}

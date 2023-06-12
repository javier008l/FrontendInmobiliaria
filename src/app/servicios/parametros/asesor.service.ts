import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { SeguridadService } from '../seguridad.service';
import { Observable } from 'rxjs';
import { PaginadorAsesorModel } from 'src/app/modelos/paginador.asesor.model';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { AsesorModel } from 'src/app/modelos/asesor.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerTokenLocalStorage();
   }

  /**
   * Listado de clientes
   * @returns
   */
  listarRegistrosAsesores(pag: number): Observable<PaginadorAsesorModel> {
    let limit = ConfiguracionPaginacion.registrosPorPagina;
    let skip = (pag -1) * limit;
    let url = `${this.urlBase}asesor-paginado?filter={"limit":${limit}, "skip":${skip}, "order":"id DESC"}`
    return this.http.get<PaginadorAsesorModel>(url);
  }

  BuscarRegistro(id: number): Observable<AsesorModel>{
    return this.http.get<AsesorModel>(`${this.urlBase}asesor/${id}`);
  }

  EditarRegistro(registro: AsesorModel):Observable<AsesorModel>{
    return this.http.put(`${this.urlBase}asesor/${registro.id}`, registro);
  }

  EliminarRegistro(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}asesor/${id}`);
  }
}

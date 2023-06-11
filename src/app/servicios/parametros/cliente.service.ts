import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, skip } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PaginadorClienteModel } from 'src/app/modelos/paginador.cliente.model';
import { SeguridadService } from '../seguridad.service';
import { ClienteModel } from 'src/app/modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerTokenLocalStorage();
   }

  /**
   * Listado de clientes
   * @returns
   */
  listarRegistrosClientes(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registrosPorPagina;
    let skip = (pag -1) * limit;
    let url = `${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}}`
    return this.http.get<PaginadorClienteModel>(url);
  }

  BuscarRegistro(id: number): Observable<ClienteModel>{
    return this.http.get<ClienteModel>(`${this.urlBase}cliente/${id}`);
  }

  EditarRegistro(registro: ClienteModel):Observable<ClienteModel>{
    return this.http.put(`${this.urlBase}cliente/${registro.id}`, registro);
  }

  EliminarRegistro(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}cliente/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, skip } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PaginadorClienteModel } from 'src/app/modelos/paginador.cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;

  constructor(private http: HttpClient) { }

  /**
   * Listado de clientes
   * @returns
   */
  listarRegistrosClientes(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registrosPorPagina;
    let skip = (pag -1) * limit;
    return this.http.get<PaginadorClienteModel>(`${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}}`);
  }
}

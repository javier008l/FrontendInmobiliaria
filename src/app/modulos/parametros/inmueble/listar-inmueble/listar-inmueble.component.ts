import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService} from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent {
  listaInmuebles: InmuebleModel[]=[];
  pag = 1;
  total = 0;
  registroPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(
    private servicioInmueble: InmuebleService
  ){
  }

  ngOnInit(){
    this.ListarRegistrosInmuebles()    
  }

  ListarRegistrosInmuebles(){
    this.servicioInmueble.listarRegistros().subscribe({
      next: (datos) => {
        this.listaInmuebles = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

  obtenerTipoInmueble(tipoInmuebleId: number): string {
    if (tipoInmuebleId === 1) {
      return 'Casa';
    } else if (tipoInmuebleId === 2) {
      return 'Apartamento';
    } else if (tipoInmuebleId === 3) {
      return 'Finca';
    } else if (tipoInmuebleId === undefined) {
      return 'Desconocido';
    }
    return this.obtenerTipoInmueble(tipoInmuebleId);
  }

}

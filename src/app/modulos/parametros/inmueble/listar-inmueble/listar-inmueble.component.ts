import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService} from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent {
  listaInmuebles: InmuebleModel[]=[];

  constructor(
    private servicioInmueble: InmuebleService
  ){
  }

  ngOnInit(){
    this.servicioInmueble.listarRegistros().subscribe({
      next: (datos) => {
        this.listaInmuebles = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

}

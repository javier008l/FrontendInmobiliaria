import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent {
  listaInmuebles: InmuebleModel[]=[];

  constructor(
    private servicioParamentros : ParametrosService
  ){
  }

  ngOnInit(){
    this.servicioParamentros.listarRegistros().subscribe({
      next: (datos) => {
        this.listaInmuebles = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

}

import { Component } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent {
  listaSolicitudes: SolicitudModel[]=[];

  constructor(
    private servicioParamentros : ParametrosService
  ){
  }

  ngOnInit(){
    this.servicioParamentros.listarRegistrosSolicitudes().subscribe({
      next: (datos) => {
        this.listaSolicitudes = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }
}

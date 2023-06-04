import { Component } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent {
  listaSolicitudes: SolicitudModel[]=[];

  constructor(
    private servicioSolicitudes : SolicitudService
  ){
  }

  ngOnInit(){
    this.servicioSolicitudes.listarRegistrosSolicitudes().subscribe({
      next: (datos) => {
        this.listaSolicitudes = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }
}

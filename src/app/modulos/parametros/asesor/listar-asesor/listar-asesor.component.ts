import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { AsesorModel } from 'src/app/modelos/asesor.model';
import { AsesorService } from 'src/app/servicios/parametros/asesor.service';

@Component({
  selector: 'app-listar-asesor',
  templateUrl: './listar-asesor.component.html',
  styleUrls: ['./listar-asesor.component.css']
})
export class ListarAsesorComponent {

  listaAsesores: AsesorModel [] = [];
  pag = 1;
  total = 0;
  registroPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(private servicioAsesor: AsesorService){
  }

  ngOnInit(){
    this.ListarRegistrosAsesores()
  }

  ListarRegistrosAsesores(){
    this.servicioAsesor.listarRegistrosAsesores(this.pag).subscribe({
      next: (datos) => {
        this.listaAsesores = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }
}

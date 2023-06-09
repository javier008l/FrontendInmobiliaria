import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {
  listaClientes: ClienteModel [] = [];
  pag = 1;
  total = 0;
  registroPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(
    private servicioCliente: ClienteService
  ){
  }

  ngOnInit(){
    this.ListarRegistrosClientes()
  }

  ListarRegistrosClientes(){
    this.servicioCliente.listarRegistrosClientes(this.pag).subscribe({
      next: (datos) => {
        this.listaClientes = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

}

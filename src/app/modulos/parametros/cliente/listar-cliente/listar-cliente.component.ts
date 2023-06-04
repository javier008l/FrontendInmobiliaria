import { Component } from '@angular/core';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { PaginadorClienteModel } from 'src/app/modelos/paginador.cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {
  listaClientes: PaginadorClienteModel= new PaginadorClienteModel();
  pag = 1;

  constructor(
    private servicioCliente: ClienteService
  ){
  }

  ngOnInit(){
    this.servicioCliente.listarRegistrosClientes(this.pag).subscribe({
      next: (datos) => {
        this.listaClientes = datos;
      },
      error: (err) => {
        alert("Error leyendo la información");
      }
    });
  }

}

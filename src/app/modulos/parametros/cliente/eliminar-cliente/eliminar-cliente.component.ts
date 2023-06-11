import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent {

  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  primerNombre: string = "";
  segundoNombre: string = "";
  primerApellido: string = "";
  segundoApellido: string = "";
  cedula: string = "";
  correo: string = "";
  telefono: string = "";

  constructor(
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.recordId = datos.id!;
        this.primerNombre = datos.primerNombre!;
        this.segundoNombre = datos.segundoNombre!;
        this.primerApellido = datos.primerApellido!;
        this.segundoApellido = datos.segundoApellido!;
        this.cedula = datos.cedula!;
        this.correo = datos.correo!;
        this.cedula = datos.cedula!;
      },
      error: (err) => {
        alert("El registro no existe.")
      }
    });
  }


  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: any) => {
        alert("Información eliminada correctamente");
        this.router.navigate(['/parametros/cliente-listar']);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error");
      }
    });
  }
}

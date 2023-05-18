import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  listaRegistros: InmuebleModel[] = [];
  listarAlquiler: InmuebleModel[] = [];


  constructor(
    private servicioSeguridad: SeguridadService,
    private servicioParametrizacion: ParametrosService) {
  }

  sesionAtiva: boolean = false;



  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token != "") {
          this.sesionAtiva = true;
        } else {
          this.sesionAtiva = false;
        }
      },
      error: (err: any) => {

      }
    })
  }

  ngOnInit() {
    this.ValidarSesion();
    this.servicioParametrizacion.listarRegistros().subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (err) => {

      }
    })
    this.servicioParametrizacion.listarAlquiler().subscribe({
      next: (datos) => {
        this.listarAlquiler = datos;
      },
      error: (err) => {

      }
    })
  }

}

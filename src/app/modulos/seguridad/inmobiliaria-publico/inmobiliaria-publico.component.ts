import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inmobiliaria-publico',
  templateUrl: './inmobiliaria-publico.component.html',
  styleUrls: ['./inmobiliaria-publico.component.css']
})
export class InmobiliariaPublicoComponent {
  listaRegistros: InmuebleModel[] = [];
  listarAlquiler: InmuebleModel[] = [];
  showVenta: boolean = true;
  showAlquiler: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
    private servicioParametrizacion: ParametrosService
  ) { }

  sesionAtiva: boolean = false;

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token !== '') {
          this.sesionAtiva = true;
        } else {
          this.sesionAtiva = false;
        }
      },
      error: (err: any) => {

      }
    });
  }

  ngOnInit() {
    this.ValidarSesion();
  }

  obtenerTipoInmueble(tipoInmuebleId: number): string {
    if (tipoInmuebleId === 1) {
      return 'casa';
    } else if (tipoInmuebleId === 2) {
      return 'apartamento';
    } else if (tipoInmuebleId === 3) {
      return 'finca';
    } else {
      return 'desconocido';
    }
  }

  alquiler() {
    this.showVenta = false;
    this.showAlquiler = true;

    this.servicioParametrizacion.listarAlquiler().subscribe({
      next: (datos) => {
        this.listarAlquiler = datos;
      },
      error: (err) => {

      }
    });
  }

  venta() {
    this.showVenta = true;
    this.showAlquiler = false;

    this.servicioParametrizacion.listarRegistros().subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (err) => {

      }
    });
  }

}

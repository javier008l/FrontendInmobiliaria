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
  listaInmuebles: InmuebleModel[] = [];
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
  
    this.servicioParametrizacion.listarRegistros('paraAlquiler').subscribe({
      next: (datos) => {
        this.listaInmuebles = datos;
      },
      error: (err) => {
        // Manejo de error
      }
    });
  }
  
  venta() {
    this.showVenta = true;
    this.showAlquiler = false;
  
    this.servicioParametrizacion.listarRegistros('paraVenta').subscribe({
      next: (datos) => {
        this.listaInmuebles = datos;
      },
      error: (err) => {
        // Manejo de error
      }
    });
  }
  
  
  filtrarPorTipo(tipo: number, limit?: number) {
    // Filtrar la lista de inmuebles por tipo
    this.listaInmuebles = this.listaInmuebles.filter(inmueble => inmueble.tipoInmuebleId === tipo);
  
    if (limit) {
      this.listaInmuebles = this.listaInmuebles.slice(0, limit); // Aplicar el límite utilizando el método slice
    }
  }

}

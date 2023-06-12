import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.valido.model';
import { InmuebleService } from 'src/app/servicios/parametros/inmueble.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent {
  id: any;
  listaInmuebles: InmuebleModel[] = [];
  showVenta: boolean = true;
  showAlquiler: boolean = false;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;

  constructor(
    private servicioSeguridad: SeguridadService,
    private servicioInmueble: InmuebleService,
    private route: ActivatedRoute
  ) { }


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

  ngOnInit() {
    this.showVenta = false;
    this.showAlquiler = true;
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.servicioInmueble.singlePage(this.id).subscribe({
        next: (datos) => {
          this.listaInmuebles = datos;
        },
        error: (err) => {
          // Manejo de error
        }
      });

    });

  }

}


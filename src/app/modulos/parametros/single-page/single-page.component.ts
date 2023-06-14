// single-page.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class SinglePageComponent implements OnInit, AfterViewInit {
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.servicioInmueble.singlePage(this.id).subscribe({
        next: (datos) => {
          this.listaInmuebles = datos;
          setTimeout(() => {
            this.inicializarCarrusel();
          }, 0);
        },
        error: (err) => {
          // Manejo de error
        }
      });
    });
  }

  ngAfterViewInit() {
  }

  inicializarCarrusel() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {});
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
}

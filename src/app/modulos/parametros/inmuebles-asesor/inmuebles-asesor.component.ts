import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService } from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-inmuebles-asesor',
  templateUrl: './inmuebles-asesor.component.html',
  styleUrls: ['./inmuebles-asesor.component.css']
})
export class InmueblesAsesorComponent {
  listaInmuebles: InmuebleModel[] = [];
  listaInmueblesFiltrados: InmuebleModel[] = [];
  fechaFiltro: string = '';
  sesionActiva: boolean = false;

  constructor(private servicioInmueble: InmuebleService) { }

  obtenerTipoInmueble(tipoInmuebleId: number): string {
    switch (tipoInmuebleId) {
      case 1:
        return 'casa';
      case 2:
        return 'apartamento';
      case 3:
        return 'finca';
      default:
        return 'desconocido';
    }
  }

  filtrarPorFecha() {
    if (this.fechaFiltro !== '') {
      const fechaFiltro = new Date(this.fechaFiltro);
      fechaFiltro.setUTCHours(0, 0, 0, 0);
      console.log('Fecha de filtro:', fechaFiltro);

      this.listaInmueblesFiltrados = this.listaInmuebles.filter(inmueble => {
        const fechaInmueble = inmueble.fecha ? new Date(inmueble.fecha) : null;
        if (fechaInmueble) fechaInmueble.setUTCHours(0, 0, 0, 0);
        console.log('Fecha del inmueble:', fechaInmueble);

        return fechaInmueble !== null && fechaInmueble.getTime() === fechaFiltro.getTime();
      });
    } else {
      this.listaInmueblesFiltrados = this.listaInmuebles;
    }
  }



  solicitar() {
    const datosUsuario = localStorage.getItem('datos-usuario');
    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoAsesor = usuario.correo;

      this.servicioInmueble.InmueblesAsesor(correoAsesor).subscribe({
        next: (datos) => {
          this.listaInmuebles = datos;
          this.listaInmueblesFiltrados = datos; // Inicialmente mostrar todos los inmuebles sin filtrar
        },
        error: (err) => {
          console.error(err); // Manejar el error adecuadamente
        }
      });
    }
  }
}


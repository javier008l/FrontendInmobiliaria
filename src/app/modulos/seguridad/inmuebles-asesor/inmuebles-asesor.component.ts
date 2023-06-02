import { Component } from '@angular/core';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-inmuebles-asesor',
  templateUrl: './inmuebles-asesor.component.html',
  styleUrls: ['./inmuebles-asesor.component.css']
})
export class InmueblesAsesorComponent {

  listaInmuebles: InmuebleModel[] = [];
  servicioSeguridad: any;
  sesionAtiva: boolean | undefined;

  constructor(
    private servicioParametrizacion: ParametrosService) {
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


  solicitar() {
    const datosUsuario = localStorage.getItem("datos-usuario");
    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correoAsesor = usuario.correo;

      this.servicioParametrizacion.InmueblesAsesor(correoAsesor).subscribe({
        next: (datos) => {
          this.listaInmuebles = datos;
        },
        error: (err) => {

        }
      })

    }
  }

}

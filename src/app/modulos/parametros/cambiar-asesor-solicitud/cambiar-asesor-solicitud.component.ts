import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';


@Component({
  selector: 'app-cambiar-asesor-solicitud',
  templateUrl: './cambiar-asesor-solicitud.component.html',
  styleUrls: ['./cambiar-asesor-solicitud.component.css']
})
export class CambiarAsesorSolicitudComponent {
  id: any;
  asesorId: any;

  constructor(private route: ActivatedRoute, private servicioSolicitudes: SolicitudService,) { }

  CambiarAsesor(event: Event) {
    event.preventDefault();
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.asesorId = Number(params['asesorId']);
      const nuevoAsesorInput = document.getElementById('nuevoAsesor') as HTMLInputElement;
      const nuevoAsesorValue = nuevoAsesorInput?.value;
      const nuevoAsesorNumber = parseInt(nuevoAsesorValue);
      console.log(this.id, this.asesorId, nuevoAsesorNumber);

      this.servicioSolicitudes.CambiarASesor(this.id, this.asesorId, nuevoAsesorNumber).subscribe({

      });
    });
  }
}

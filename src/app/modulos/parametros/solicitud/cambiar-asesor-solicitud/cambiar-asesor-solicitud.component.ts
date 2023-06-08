import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cambiar-asesor-solicitud',
  templateUrl: './cambiar-asesor-solicitud.component.html',
  styleUrls: ['./cambiar-asesor-solicitud.component.css']
})
export class CambiarAsesorSolicitudComponent {
  id: any;
  asesorId: any;
  // nuevoAsesor: any;

  constructor(private route: ActivatedRoute) { }

  CambiarAsesor(event: Event) {
    event.preventDefault();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.asesorId = params['asesorId'];
      const nuevoAsesor = (document.getElementById('nuevoAsesor') as HTMLInputElement)?.value;
      console.log(this.id, this.asesorId, nuevoAsesor);
    });
  }
}

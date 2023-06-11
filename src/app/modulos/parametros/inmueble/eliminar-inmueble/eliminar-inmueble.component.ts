import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService } from 'src/app/servicios/parametros/inmueble.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent {

  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  direccion: string = "";
  costo: number = 0;
  foto: string = "";
  tipoInmuebleId: number = 0;
  ciudadId: number = 0;
  paraVenta: boolean = false;
  paraAlquiler: boolean = false;
  correoAsesor: string = "";
  fecha: Date = new Date();

  constructor(
    private servicio: InmuebleService,
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
      next: (datos: InmuebleModel) => {
        this.recordId = datos.id!;
        this.direccion = datos.direccion!;
        this.costo = datos.costo!;
        this.foto = datos.foto!;
        this.tipoInmuebleId = datos.tipoInmuebleId!;
        this.ciudadId = datos.ciudadId!;
        this.paraVenta = datos.paraVenta!;
        this.paraAlquiler = datos.paraVenta!;
        this.correoAsesor = datos.correoAsesor!;
        this.fecha = datos.fecha!;
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
        this.router.navigate(['/parametros/inmueble-listar']);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error");
      }
    });
  }


}

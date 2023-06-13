import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';


@Component({
  selector: 'app-crear-solicitudes-cliente',
  templateUrl: './crear-solicitudes-cliente.component.html',
  styleUrls: ['./crear-solicitudes-cliente.component.css']
})
export class CrearSolicitudesClienteComponent {
  inmuebleid: any
  correoAsesor: any
  asesorId: any
  clienteId: any
  paraVenta: any
  paraAlquiler: any
  tipoInmuebleId: any
  tipoSolicitudId: any

  constructor(
    private servicioSolicitudes: SolicitudService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.inmuebleid = Number(params['id']);
      this.correoAsesor = params['correoAsesor'];
      this.paraVenta = params['paraVenta'];
      this.paraAlquiler = params['paraAlquiler'];
      this.tipoInmuebleId = Number(params['tipoInmuebleId']);
      const fechaHoy = new Date();
      const fechaSolicitud = this.convertDateFormat(fechaHoy);
      this.servicioSolicitudes.conseguirId(this.correoAsesor).subscribe({
        next: (datos) => {
          this.asesorId = datos
          const datosUsuario = localStorage.getItem("datos-usuario");
          if (datosUsuario) {
            const usuario = JSON.parse(datosUsuario);
            const correoCliente = usuario.correo;
            this.servicioSolicitudes.conseguirClienteId(correoCliente).subscribe({
              next: (datos) => {
                this.clienteId = datos
                if (this.paraVenta === true) {
                  this.tipoSolicitudId = 2
                } else if (this.paraVenta === false) {
                  this.tipoSolicitudId = 1
                }

                this.servicioSolicitudes.hacerSolicitud(this.inmuebleid, this.asesorId, this.clienteId, this.tipoInmuebleId, this.tipoSolicitudId, fechaSolicitud).subscribe({
                  next: (datos) => {

                  },
                  error: (err) => {
                    console.log(err)
                    console.log(this.tipoSolicitudId)
                  }
                });
              },
              error: (err) => {
                // Manejo de error
              }
            });
          }
        },
        error: (err) => {
          // Manejo de error
        }
      });

    });
  }

  convertDateFormat(inputDate: Date): Date {
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    const formattedDate = `${year}-${month}-${day} ${currentTime}`;

    return new Date(formattedDate);
  }



}

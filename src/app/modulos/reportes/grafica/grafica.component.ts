import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements AfterViewInit {
  constructor(private servicioSolicitudes: SolicitudService) { }

  ngAfterViewInit(): void {
    forkJoin({
      asesores: this.servicioSolicitudes.contarAsesor(this.nombreAsesor),
      clientes: this.servicioSolicitudes.contarCliente(this.nombreCliente),
      inmuebles: this.servicioSolicitudes.contarInmuebles(this.nombreInmueble),
      solicitudes: this.servicioSolicitudes.contarSolicitudes(this.nombreSolicitud),
    }).subscribe({
      next: (result) => {
        this.contAsesor = result.asesores.asesores.count;
        console.log(this.contAsesor);

        this.contCliente = result.clientes.clientes.count;
        console.log(this.contCliente);

        this.contInmueble = result.inmuebles.inmuebles.count;
        console.log(this.contInmueble);

        this.contSolicitud = result.solicitudes.solicitudes.count;
        console.log(this.contSolicitud);

        this.createChart();
      },
      error: (err) => {
        // Handle error
      },
    });
  }

  createChart() {
    const chartData = [
      {
        data: [this.contAsesor, this.contCliente, this.contInmueble, this.contSolicitud],
        label: 'Cantidad',
        backgroundColor: [
          'rgba(75, 192, 192,0.2)', // Color for Advisors
          'rgba(255, 206, 86, .2)', // Color for Clients
          'rgba(255, 99, 132, 0.2)', // Color Properties
          'rgba(153, 102, 255, 0.2)', // Color Requests
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // Border color for Advisors
          'rgba(255, 206, 86, 1)', // color for Clients
          'rgba(255, 99, 132, 1)', // Border color for Properties
          'rgba(153, 102, 255, 1)', // Border color for Requests        ],
        ], borderWidth: 1,
      },
    ];

    const chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: chartData,
      },
      options: this.chartOptions,
    });
  }

  @ViewChild('chartCanvas') chartCanvas: any;
  nombreInmueble = 'inmueble';
  nombreAsesor = 'asesor';
  nombreCliente = 'cliente';
  nombreSolicitud = 'solicitud';
  contSolicitud: any;
  contAsesor: any;
  contCliente: any;
  contInmueble: any;
  prueba = true

  chartLabels = ['Asesores', 'Clientes', 'Inmuebles', 'Solicitudes'];

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // ... (rest of the options)
  };
}

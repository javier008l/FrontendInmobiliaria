import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements AfterViewInit {
  constructor(private servicioSolicitudes: SolicitudService) { }

  ngAfterViewInit(): void {
    this.servicioSolicitudes.contarAsesor(this.nombreAsesor).subscribe({
      next: (datos) => {
        this.contAsesor = datos.asesores.count;
        console.log(this.contAsesor)

      },
      error: (err) => {
        // Handle error
      },
    });

    this.servicioSolicitudes.contarCliente(this.nombreCliente).subscribe({
      next: (datos) => {
        this.contCliente = datos.clientes.count;
        console.log(this.contCliente)
      },
      error: (err) => {
        // Handle error
      },
    });

    this.servicioSolicitudes.contarInmuebles(this.nombreInmueble).subscribe({
      next: (datos) => {
        this.contInmueble = datos.inmuebles.count;
        console.log(this.contInmueble)
      },
      error: (err) => {
        // Handle error
      },
    });

    this.servicioSolicitudes.contarSolicitudes(this.nombreSolicitud).subscribe({
      next: (datos) => {
        this.contSolicitud = datos.solicitudes.count;
        console.log(this.contSolicitud)
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
          'rgba(255, 206, 86, 0.2)', // Color for Clients
          'rgba(255, 99, 132, 0.2)', // Color Properties
          'rgba(153, 102, 255, 0.2)', // Color for Requests
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // Border color for Advisors
          'rgba(255, 206, 86, 1)', // Border color for Clients
          'rgba(255, 99, 132, 1)', // Border color for Properties
          'rgba(153, 102, 255, 1)', // Border color for Requests
        ],
        borderWidth: 1,
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

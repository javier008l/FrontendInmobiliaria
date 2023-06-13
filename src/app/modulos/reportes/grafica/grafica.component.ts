import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})

export class GraficaComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas: any;
  numAsesores = 10;
  numClientes = 40;
  numInmuebles = 500;
  numSolicitudes = 20;

  chartData = [
    {
      data: [this.numAsesores, this.numClientes, this.numInmuebles, this.numSolicitudes],
      label: 'Cantidad',
      backgroundColor: [
        'rgba(75, 192, 192,0.2)', // Color para Asesores
        'rgba(255, 206, 86, 0.2)', // Color para Clientes
        'rgba(255, 99, 132, 0.2)', // Color para Inmuebles
        'rgba(153, 102, 255, 0.2)' // Color para Solicitudes
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)', // Color del borde para Asesores
        'rgba(255, 206, 86, 1)', // Color del borde para Clientes
        'rgba(255, 99, 132, 1)', // Color del borde para Inmuebles
        'rgba(153, 102, 255 1)' // Color del borde para Solicitudes
      ],
      borderWidth: 1
    }
  ];

  chartLabels = ['Asesores', 'Clientes', 'Inmuebles', 'Solicitudes'];

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
    // ... (resto de las opciones)
  };

  ngAfterViewInit(): void {
    const chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: this.chartData
      },
      options: this.chartOptions
    });
  }
}

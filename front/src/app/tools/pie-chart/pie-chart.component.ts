import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";

// Importa los tipos de datos para ApexCharts
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStates
} from "ng-apexcharts";

// Define la estructura para el gráfico
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  states: ApexStates;
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  // Asegúrate de importar NgApexchartsModule para que el componente funcione
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {
  @Input() progress: number = 0;
  @Input() chartWidth: number = 150;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress'] || changes['chartWidth']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const parsedProgress = Math.round(Number(this.progress)) || 0;
    const remaining = 100 - this.progress;
    // Configura las opciones del gráfico
    this.chartOptions = {
      series: [this.progress, remaining], // Los valores de cada porción
      chart: {
        type: "donut", // 🟢 Cambia el tipo a 'donut' para el texto en el centro
        width: this.chartWidth, // 🟢 Usa el valor del input para definir el ancho
        // 🟢 Habilita la animación del gráfico
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      labels: ["Progreso", "Restante"], // Etiquetas para las porciones
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 120
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      // 🟢 Opciones para mostrar el texto en el centro y darle el efecto de "palpito"
      plotOptions: {
        pie: {
          expandOnClick: false, // 🟢 Evita la expansión al hacer clic para que solo sea en hover
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => `${this.progress}%`, // 🟢 Muestra el porcentaje en el centro
                color: '#333'
              }
            }
          }
        }
      },
      // 🟢 Agrega un efecto de hover (palpito)
      states: {
        hover: {
          filter: {
            type: 'none' // Desactiva el filtro de opacidad predeterminado
          }
        },
        active: {
          filter: {
            type: 'darken'
          }
        }
      },
      dataLabels: {
        enabled: false, // 🟢 Desactiva las etiquetas de datos en el exterior
      },
      title: {
        text: undefined // No se muestra el título por separado
      }
    };
  }
}
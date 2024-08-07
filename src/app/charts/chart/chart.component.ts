import { Component, input } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  data = input.required<ChartData>();
  type = input.required<ChartType>();
  showLegend = input<boolean>(false);

  id = Math.random() * 1000;

  chart: any;

  ngOnChanges(): void {
    this.initChart();
  }

  private initChart(): void {
    if(!this.data()) {
      return;
    }

    const config: any = {
      type: this.type(),
      data: this.data(),
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: this.showLegend,
            position: 'right'
          }
        }
      }
    };
    this.chart = new Chart(`chartContainer${this.id}`, config);
  }
}

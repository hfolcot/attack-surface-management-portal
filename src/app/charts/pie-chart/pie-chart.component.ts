import { Component, input } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  data = input.required<ChartData>();

  chart: any;

  ngOnChanges(): void {
    this.initChart();
  }

  private initChart(): void {
    if(!this.data()) {
      return;
    }

    const config: any = {
      type: 'pie',
      data: this.data(),
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    };
    this.chart = new Chart('chartContainer', config);
  }
}

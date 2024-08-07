import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const publicComponents = [
  PieChartComponent
]

@NgModule({
  declarations: [...publicComponents],
  imports: [
    CommonModule
  ],
  exports: [...publicComponents],
  providers: [
      provideCharts(withDefaultRegisterables())
  ],
})
export class ChartsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const publicComponents = [
  ChartComponent
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

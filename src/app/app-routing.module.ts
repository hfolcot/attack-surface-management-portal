import { RouterModule, Routes } from '@angular/router';
import { VulnerabilitiesDashboardComponent } from './vulnerabilities/components/vulnerabilities-dashboard/vulnerabilities-dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./vulnerabilities/vulnerabilities.module').then(m => m.VulnerabilitiesModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

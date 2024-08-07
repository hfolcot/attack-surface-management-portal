import { NgModule } from "@angular/core";
import { VulnerabilitiesDashboardComponent } from "./components/vulnerabilities-dashboard/vulnerabilities-dashboard.component";
import { CoreComponentsModule } from "../core-components/core-components.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "../charts/charts.module";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

const publicComponents = [
    VulnerabilitiesDashboardComponent
]

@NgModule({
    declarations: [...publicComponents],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: VulnerabilitiesDashboardComponent,
            },
        ]),
        CoreComponentsModule,
        ChartsModule,
        DatePipe,
        MatPaginatorModule,
        MatTableModule,
    ]
})
export class VulnerabilitiesModule { }
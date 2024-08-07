import { NgModule } from "@angular/core";
import { VulnerabilitiesDashboardComponent } from "./components/vulnerabilities-dashboard/vulnerabilities-dashboard.component";
import { CoreComponentsModule } from "../core-components/core-components.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";

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
        DatePipe,
        MatPaginatorModule, 
        MatTableModule, 
    ]
})
export class VulnerabilitiesModule {}
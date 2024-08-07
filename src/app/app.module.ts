import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreComponentsModule } from "./core-components/core-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreComponentsModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideCharts(withDefaultRegisterables())
    ]
})
export class AppModule { }
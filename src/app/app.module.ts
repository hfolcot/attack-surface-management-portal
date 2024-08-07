import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreComponentsModule } from "./core-components/core-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreComponentsModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
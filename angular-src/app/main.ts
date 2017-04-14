import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { CarDataComponent } from './car-data.component';

@NgModule({
    declarations: [AppComponent, CarDataComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
class AppModule { }

platformBrowserDynamic()
    .bootstrapModule(AppModule);

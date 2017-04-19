import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CarDataComponent } from './car-data.component';
import { CarDataService } from './car-data.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent, CarDataComponent],
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    bootstrap: [AppComponent],
    providers: [CarDataService]
})
class AppModule { }

platformBrowserDynamic()
    .bootstrapModule(AppModule);

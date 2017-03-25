import { NgModule, Component } from '@angular/core';
// Dependencies to render the App
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'my-app',
    template: `<h1>{{tittle}}</h1>
        <h2>{{car.model}}</h2>
        owner: {{car.owner.name}}`
})

class AppComponent {
    tittle = 'Tracking the car';
    car = {
        model: 'Toyota Corolla',
        year: '2003',
        color: 'bordo',
        'vehicle number': 'BLD688',
        id: 'bld688',
        owner: {
            name: 'Marcelo David Arevalos Gonzalez',
            mail: 'marceaagg@gmail.com',
            tel: '+595972 279 858',
            address: 'Simón Bolivar c/ Padre Claudio Arrúa',
            'identification number': '2.979.427'
        },
        authorized: [{
            name: 'Marciano Arevalos Ortiz',
            'identification number': '1.269.882'
        }, {
            name: 'Eduardo Ramon Medina Casco',
            'identification number': '3.262.775'
        }]
    };
}

@NgModule({
    // list all the components for this module
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
class AppModule { }

platformBrowserDynamic()
    .bootstrapModule(AppModule);


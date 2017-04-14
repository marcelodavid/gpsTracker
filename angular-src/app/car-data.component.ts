import { Component } from '@angular/core';
import { CarData } from './car-data.model';

@Component({
    selector: 'car-data',
    templateUrl: 'app/car-data.component.html',
    styleUrls: ['app/car-data.component.css']
})
export class CarDataComponent {
    car: CarData = {
        model: 'Toyota Corolla',
        year: 2003,
        color: 'bordo',
        vehicleNumber: 'BLD688',
        id: 'bld688',
        owner: {
            name: 'Marcelo David Arevalos Gonzalez',
            mail: 'marceaagg@gmail.com',
            tel: '+595972 279 858',
            address: 'Simón Bolivar c/ Padre Claudio Arrúa',
            identificationNumber: '2.979.427'
        },
        authorized: [{
            name: 'Marciano Arevalos Ortiz',
            identificationNumber: '1.269.882'
        }, {
            name: 'Eduardo Ramon Medina Casco',
            identificationNumber: '3.262.775'
        }]
    };
}

import { Component } from '@angular/core';
import { CarData } from './car-data.model';
import { CarDataService } from './car-data.service';

@Component({
    selector: 'car-form',
    templateUrl: 'app/car-data.component.html',
    styleUrls: ['app/car-data.component.css']
})
export class CarDataComponent {
    errorMessage: string;
    successMessage: CarData;
    car: CarData;

    // injectamos el servicio CarDataService
    constructor(private dataService: CarDataService) { }

    ngOnInit() {
        this.dataService.municipalities()
            .subscribe(
                municipalities => this.car = new CarData('', undefined, '', '', municipalities),
                error => this.errorMessage = <any>error);
    }

    submit(form: any) {
        // servicio para guardar los datos del auto
        this.dataService.save(this.car)
            .subscribe(
                car => this.successMessage = car[0],
                error => this.errorMessage = <any>error);
        form.reset();
    }
}

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CarDataComponent } from './car-data.component';
import { CarDataService } from './car-data.service';

describe('CarDataComponent', () => {
    let component: CarDataComponent;
    let fixture: ComponentFixture<CarDataComponent>;
    let inputs: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarDataComponent],
            imports: [FormsModule, HttpModule],
            providers: [CarDataService]
        }).compileComponents();


        fixture = TestBed.createComponent(CarDataComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('Se debe crear el componente CarDataComponent', async(() => {
        expect(component).toBeTruthy();
    }));

    it('formalario debe estar vacio al renderizar el componente', async(() => {
        inputs = fixture.debugElement.queryAll(By.css('input'));

        let inputsVacios = inputs.map((input) => input.nativeElement)
            .reduce((anterior, actual) => actual.textContent === '' && anterior, true);

        expect(inputsVacios).toBeTruthy();
    }));
});

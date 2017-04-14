import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CarDataComponent } from './car-data.component';

// suite of tests
describe('AppComponent', () => {
    let app: AppComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, CarDataComponent]
        }).compileComponents();

        const fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;

    }));

    // define a spec
    it('should create the app', async(() => {
        expect(app).toBeTruthy();
    }));
});

import { Component } from '@angular/core';
import { Owner } from './owner.model';

@Component({
    selector: 'owner',
    templateUrl: 'app/owner.component.html',
    styleUrls: ['app/car-data.component.css']
})
export class AppComponent{
    owner:Owner;
}

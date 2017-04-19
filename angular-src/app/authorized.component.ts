import { Component } from '@angular/core';
import { Authorized } from './authorized.model';

@Component({
    selector: 'authorized',
    templateUrl: 'app/authorized.component.html',
    styleUrls: ['app/authorized.component.css']
})
export class AuthorizedComponent {
    authorized: Authorized;
    authorizedList: Authorized[];

    newAuthorized() {
        if ( Array.isArray(this.authorizedList) ) {
            this.authorizedList.push(this.authorized);
        } else {
            this.authorizedList = [this.authorized];
        }
    }

    deleteAuthorized($index: number) {
        this.authorizedList.splice($index, 1);
    }
}

import { NgModule }    from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarDataComponent } from './car-data.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/automoviles', pathMatch: 'full' },
    { path: 'automoviles', component: CarDataComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ] // modules has access to RouterLink, RouterOutlet
})
export class AppRoutingModule {}

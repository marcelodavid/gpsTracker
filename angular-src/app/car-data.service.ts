import { Injectable } from '@angular/core';
import { CarData } from './car-data.model';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CarDataService {

    // injectamos el servicio http
    constructor(private http: Http) {}

    save(car: CarData): Observable<CarData[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8000/users', { car }, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    municipalities() {
        return this.http.get('http://localhost:8000/municipalities')
            .map((response: Response) => <string[]>response.json().data)
            .catch(this.handleError);
    }

    private extractData = (response: Response) => <CarData[]>response.json().data;
    private handleError = (error: Response | any) => {
        let errMsg: string;
        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = error.status + ' - ' + error.statusText || '' + ' ' + err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
}

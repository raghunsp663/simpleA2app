import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {myInterceptor} from './interceptor';

@Injectable()
export class InsuranceServiceService {

  public token: string;
  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
   }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', `NffrwDM2gIcFmNboeHiKu`);
  }

  // listClients() {
  //   return this.http.get('listOfClients').map((response: Response) => response.json());
  // }

  // listProducts(brand: Number) {
  //   return this.http.get(`listOfProducts?brand=${brand}`)
  //     .map((response: Response) => response.json());
  // }

  // listTopics(brand: Number, product: Number) {
  //   return this.http.get(`listOfProducts?brand=${brand}&productId=${product}`)
  //     .map((response: Response) => response.json());
  // }

  sendOTP(data: object): Observable<Object[]> {
    // return this.http.post('http://bookmyinsurance.co.in/api/send-otp', data )
    //   .map((response: Response) => response.json());
    const header = new Headers();
    this.createAuthorizationHeader(header);
    return this.http.post('http://bookmyinsurance.co.in/api/send-otp', data, {
      headers: header
    })
      .map((response: Response) => response.json());
  }


  // create(course) {
  //   return this.http.post('/courses', course);
  // }

}

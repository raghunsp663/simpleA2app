import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
// import {myInterceptor} from './interceptor';

@Injectable()
export class InsuranceServiceService {

  public token: string;

  constructor(private http: Http) {
    
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', 'NffrwDM2gIcFmNboeHiKu');
    headers.append('X-Requested-With', 'XMLHttpRequest');
  }

  createAuthorizationHeaderWithToken(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', 'NffrwDM2gIcFmNboeHiKu');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Authorization', `Bearer ${this.token}`);
  }
  

  sendOTP(data: object): Observable<Object[]> {
    // return this.http.post('http://bookmyinsurance.co.in/api/send-otp', data )
    //   .map((response: Response) => response.json());
    const header = new Headers();
    this.createAuthorizationHeader(header);
    // return this.http.post('http://bookmyinsurance.co.in/api/send-otp', data, {
    //   headers: header
    // })
    //   .map((response: Response) => response.json());

    return this.http.post('http://bookmyinsurance.co.in/api/send-otp', data,{
      headers: header
    }) 
    .map((res:Response) => res.json())
    .catch((error:any) => error.json()); 
  }

  verifyOTP(data: object): Observable<Object[]> {
    const header = new Headers();
    this.createAuthorizationHeader(header);
    return this.http.post('http://bookmyinsurance.co.in/api/verify-otp', data, {
      headers: header
    })
    .map((response: Response) => response.json());
  }

  searchVehicle(data: object): Observable<Object[]> {
    this.token = localStorage.getItem('token');
    const header = new Headers();
    this.createAuthorizationHeaderWithToken(header);
    return this.http.post('http://bookmyinsurance.co.in/api/find-vehicle-no', data, {
      headers: header
    })
    .map((response: Response) => response.json());
  }

  addVehicle(data: object): Observable<Object[]> {
    this.token = localStorage.getItem('token');
    const header = new Headers();
    this.createAuthorizationHeaderWithToken(header);
    return this.http.post('http://bookmyinsurance.co.in/api/new-vehicle', data, {
      headers: header
    })
    .map((response: Response) => response.json());
  }

}

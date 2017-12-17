import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class myInterceptor extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('auth_token'); // your custom token getter function here
    options.headers.set('Authorization', `Bearer ${token}`);
    options.headers.set('x-api-key', 'NffrwDM2gIcFmNboeHiKu');
    options.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('token');
    console.log(token);
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
      options.headers.set('x-api-key', 'NffrwDM2gIcFmNboeHiKu');
      options.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    } else {
    // we have to add the token to the url object
      url.headers.set('Authorization', `Bearer ${token}`);
      url.headers.set('x-api-key', 'NffrwDM2gIcFmNboeHiKu');
      url.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: myInterceptor) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
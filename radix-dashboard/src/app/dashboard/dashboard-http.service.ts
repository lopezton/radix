import { User } from '../models/user';
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Response, RequestMethod, Request, Connection, ConnectionBackend} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardHttpService {
  
  private APP_ORIGIN = 'http://localhost:9001';
  
  constructor(private _http: Http) { }

  private _buildAuthHeader(): string {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    let rv = '';
    if (user && user.token) {
      rv = `Bearer ${user.token}`;
    }
    return rv;
  }

  public get(path: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Get, path, null, options);
  }

  public post(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, path, body, options);
  }

  public put(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Put, path, body, options);
  }

  public delete(path: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Delete, path, null, options);
  }

  public patch(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Patch, path, body, options);
  }

  public head(path: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Head, path, null, options);
  }

  private _request(method: RequestMethod, path: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    const requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: this.APP_ORIGIN + path,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
      requestOptions.headers.set('X-Authorization', this._buildAuthHeader())
    }

    return this._http.request(new Request(requestOptions));
  }
}

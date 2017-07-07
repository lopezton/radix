import { TokenMap } from '../models/token-map';
import { User } from '../models/user';
import { DashboardHttpService } from './dashboard-http.service';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class DashboardService {

  private _config: any = {
    ACCEPTED_VALIDATION_STATUS_CODES: [200],
    AUTH_HEADER_NAME: 'X-Authorization'
  };
  
  private _PATHS: any = {
    ACTIVE_USER_DETAILS: '/user/active',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/token'
  }
  
  constructor(private _http: DashboardHttpService) { }

  private _buildAuthHeader(token: string): string {
    if (token) {
      return `Bearer ${token}`;
    }
    return '';
  }
  
  getJwtToken(username: string, password: string): Observable<TokenMap> {
    return this._http.post(this._PATHS.LOGIN, JSON.stringify({
        username: username, 
        password: password
      })).map(res => res.json());
  }
  
  getActiveUser(): Observable<User> {
    return this._http.get(this._PATHS.ACTIVE_USER_DETAILS).map(res => res.json());
  }
  
  getNewTokenViaRefresh(refreshToken: string): Observable<string> {
    const headers = new Headers();
    headers.set(this._config.AUTH_HEADER_NAME, this._buildAuthHeader(refreshToken));
    return this._http.get(this._PATHS.REFRESH_TOKEN, {
      headers: headers
    }).map(res => res.json());
  }
  
  validateTokenAccess(): Observable<boolean> {
    const acceptedValidationStatus: number[] = [200];
    return this._http.get('/').map((response: Response) => {
      return this._config.ACCEPTED_VALIDATION_STATUS_CODES.includes(response.status);
    });
  }
}

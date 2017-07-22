import { Application } from '../models/application';
import { TokenMap } from '../models/token-map';
import { User } from '../models/user';
import { UserApplications } from '../models/user-applications';
import { DashboardHttpService } from './dashboard-http.service';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/of'

@Injectable()
export class DashboardService {

  private _config: any = {
    ACCEPTED_VALIDATION_STATUS_CODES: [200],
    AUTH_HEADER_NAME: 'X-Authorization'
  };
  
  private _PATHS: any = {
    ACTIVE_USER_DETAILS: '/user/active',
    HOME: '/',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/token',
    USER_APPLICATIONS: '/user-applications'
  }
  
  constructor(private _http: DashboardHttpService) { }

  private _buildAuthHeader(token: string): string {
    if (token) {
      return `Bearer ${token}`;
    }
    return '';
  }
  
  private _handleError(err) {
    console.log('DashboardService#handleError(err):');
    console.log(err);
    return Observable.throw(err);
  }
  
  getActiveUser(): Observable<User> {
    return this._http.get(this._PATHS.ACTIVE_USER_DETAILS)
      .map(res => res.json())
      .catch(err => this._handleError(err));
  }
  
  getApplications(userId: string): Observable<Application[]> {
    return this.getUserApplications(userId)
      .map(userApplications => userApplications.applications)
      .catch(err => this._handleError(err));
  }
  
  getJwtToken(username: string, password: string): Observable<TokenMap> {
    return this._http.post(this._PATHS.LOGIN, JSON.stringify({
        username: username, 
        password: password
      }))
      .map(res => res.json())
      .catch(err => this._handleError(err));
  }
  
  getNewTokenViaRefresh(refreshToken: string): Observable<string> {
    const headers = new Headers();
    headers.set(this._config.AUTH_HEADER_NAME, this._buildAuthHeader(refreshToken));
    return this._http.get(this._PATHS.REFRESH_TOKEN, {
      headers: headers
    })
      .map(res => res.json().token)
      .catch(err => this._handleError(err));
  }
  
  getUserApplications(userId: string): Observable<UserApplications> {
    const url = `${this._PATHS.USER_APPLICATIONS}/search/userId?userId=${userId}`;
    return this._http.get(url)
      .map(res => res.json())
      .catch(err => this._handleError(err));
  }
  
  saveUserApplications(userApplications: UserApplications): Observable<UserApplications> {
    const url = `${this._PATHS.USER_APPLICATIONS}/${userApplications.id}`;
    return this._http.put(url, JSON.stringify(userApplications))
      .map(savedEntity => savedEntity.json())
      .catch(err => Observable.of(false));
  }
  
  validateTokenAccess(): Observable<boolean> {
    return this._http.get(this._PATHS.HOME)
      .map((response: Response) => {
        return this._config.ACCEPTED_VALIDATION_STATUS_CODES.includes(response.status);
      })
      .catch(err => this._handleError(err));
  }
}

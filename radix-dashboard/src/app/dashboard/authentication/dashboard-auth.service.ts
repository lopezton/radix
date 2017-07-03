import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class DashboardAuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  
  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    // TODO Replace with real service call and service implementation.
    console.log(`Attempting to login as ${username} with password ${password}`);
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

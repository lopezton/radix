import { UserService } from '../../login/user.service';
import { TokenMap } from '../../models/token-map';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class DashboardAuthService {

  public isLoggedIn = false;
  private activeToken: TokenMap;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  
  constructor(
    private http: Http,
    private userService: UserService
  ) { }

  login(username: string, password: string): Observable<boolean> {
    
    // Release any previously stored authentication data.
    this.logout();
    
    const LOGIN_URL = 'http://localhost:9001/auth/login';
    const ACTIVE_USER_DETAILS_URL = 'http://localhost:9001/user/active';
    const tokenRequestBody = JSON.stringify({ username: username, password: password });
    
    // Attempt to authenticate the user for a JWT token.
    return this.http.post(LOGIN_URL, tokenRequestBody)
      .map((tokenResponse: Response) => {
        return this.activeToken = tokenResponse.json(); 
      })
      
      // If a JWT token is received attempt to get the user's details.
      .flatMap(() => {
        
        // TODO: Make configurable and relocate to a common utility.
        const AUTH_HEADERS = new Headers();
        AUTH_HEADERS.append('X-Authorization', `Bearer ${this.activeToken.token}`);
        
        return this.http.get(ACTIVE_USER_DETAILS_URL, { headers: AUTH_HEADERS });
      
      }).map((userResponse: Response) => {
        const user: User = userResponse.json();
        
        // Record useful information into a 'User' object and persist in localStorage
        // for future reference.
        user.token = this.activeToken.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Mark the login as a success if all steps were completed.
        return this.isLoggedIn = true;
      });
  }

  logout(): void {
    this.activeToken = null;
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }
}

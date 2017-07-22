import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import { DashboardService } from '../dashboard/dashboard.service';
import { TokenMap } from '../models/token-map';
import { User } from '../models/user';

@Injectable()
export class UserService {

  activeToken: TokenMap;
  
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }
  
  login(username: string, password: string): Observable<boolean> {
    
    // Release any previously stored authentication data.
    this.logout();
    
    // Attempt to authenticate the user for a JWT token.
    return this.dashboardService.getJwtToken(username, password)
      .flatMap((token: TokenMap) => {
        this.activeToken = token;
        localStorage.setItem('currentUser', JSON.stringify(this.activeToken));
        
        // After successfully authenticating, retrieve active user information.
        return this.dashboardService.getActiveUser(); 
      }).map((user: User) => {
        
        // Record useful information into a 'User' object and persist in localStorage
        // for future reference.
        user.token = this.activeToken.token;
        user.refreshToken = this.activeToken.refreshToken;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        return true;
      });
  }
  
  logout(options?: any) {
    this.activeToken = null;
    localStorage.removeItem('currentUser');
    const queryParams = {};
    if (options) {
      if (options.sessionTimeout) {
        queryParams['sessionTimeout'] = true;
      }
    }
    this.router.navigate(['login'], { queryParams: queryParams});
  }
  
  getActiveUser(): User {
    let activeUser: User;
    
    try {
     activeUser = JSON.parse(localStorage.getItem('currentUser')); 
    } catch (err) {
      activeUser = null;
    }
    
    return activeUser;
  }
  
  obtainNewTokenViaRefresh(): Observable<boolean> {
    const currentUser = this.getActiveUser();
    return this.dashboardService.getNewTokenViaRefresh(currentUser.refreshToken).map((newToken: string) => {
      console.log(`UserService#obtainNewTokenViaRefresh: Successfully replaced token \'${currentUser.token}\'` +
         `with new token \'${newToken}\'`);
      currentUser.token = newToken;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }).catch(err => Observable.of(false));
  }
}

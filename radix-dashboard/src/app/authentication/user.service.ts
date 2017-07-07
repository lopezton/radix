import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

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
  
  logout() {
    this.activeToken = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
  
  getActiveUserFromStorage(): User {
    let activeUser: User;
    
    try {
     activeUser = JSON.parse(localStorage.getItem('currentUser')); 
    } catch (err) {
      activeUser = null;
    }
    
    return activeUser;
  }
}

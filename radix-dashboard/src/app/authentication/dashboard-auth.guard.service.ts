import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { DashboardService } from '../dashboard/dashboard.service';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch'

@Injectable()
export class DashboardAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService, 
    private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('DashboardAuthGuard#canActivate');
    return this._isAuthenticatedWithValidToken(route, state);
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('DashboardAuthGuard#canActivateChild');
    return this._isAuthenticatedWithValidToken(childRoute, state);
  }
  
  _isAuthenticatedWithValidToken(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Observable<boolean> | Promise<boolean> {
    const user: User = this.userService.getActiveUserFromStorage();
    if (user) {
      return this.dashboardService.validateTokenAccess().map(isValidToken => isValidToken).catch(tokenValidationErr => {
        
        // If the token is invalid, attempt to gain a new token by using the refresh token.
        return this.userService.obtainNewTokenViaRefresh()
          .map(newTokenObtained => {
            
            // If the refresh token fails, request user authentication.
            if (!newTokenObtained) {
              console.log('DashboardAuthGard#_isAuthenticatedWithValidToken: Unable to obtain new token. Refresh token was expired.');
              this.userService.logout({ sessionTimeout: true });
              return false;
            }
            console.log('New token successfully obtained.');
            return true;
          })
          .catch(refreshTokenValidationErr => {
            console.log('DashboardAuthGard#_isAuthenticatedWithValidToken');
            console.log(refreshTokenValidationErr);
            this.userService.logout({ sessionTimeout: true });
            return Observable.of(false);
          });
      });
    }
    
//    this.userService.redirectUrl = state.url;
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

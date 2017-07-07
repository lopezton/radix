import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class DashboardAuthGuard implements CanActivate {
  
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.userService.getActiveUserFromStorage()) {
      // TODO - Attempt to hit the server and validate token.
      return true;
    }
    
//    this.userService.redirectUrl = state.url;
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

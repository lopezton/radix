import { DashboardAuthService } from './dashboard-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class DashboardAuthGuard implements CanActivate {
  
  constructor(private authService: DashboardAuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.authService.isLoggedIn) {
      return true;
    }
    
    this.authService.redirectUrl = state.url;
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

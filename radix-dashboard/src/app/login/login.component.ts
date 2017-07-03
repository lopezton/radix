import { DashboardAuthService } from '../dashboard/authentication/dashboard-auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dashboardAuthService: DashboardAuthService) {}
 
    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
    }
 
    login() {
        this.loading = true;
        this.dashboardAuthService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}

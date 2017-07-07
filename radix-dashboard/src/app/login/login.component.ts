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
    loginErrorMsg: string;
  
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dashboardAuthService: DashboardAuthService) {}
 
    ngOnInit() {
        // get return url from route parameters or default to home view.
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
    }
 
    login() {
        this.loginErrorMsg = '';
        this.loading = true;
        this.dashboardAuthService.login(this.model.email, this.model.password)
          .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.loginErrorMsg = error.json().message;
              this.loading = false;
            });
    }
}

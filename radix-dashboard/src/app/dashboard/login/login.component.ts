import { UserService } from '../../authentication/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    loginErrorMsg: string;
  
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) {}
 
    ngOnInit() {
      
      this.handlePreviouslyAuthenticatedUser();
      
      // get return url from route parameters or default to home view.
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
    }
 
    handlePreviouslyAuthenticatedUser() {
      // If a user is currently active, redirect to the dashboard view.
      if (this.userService.getActiveUserFromStorage()) {
        this.router.navigate(['/dashboard/home']);
      }
    }
 
    login() {
        this.loginErrorMsg = '';
        this.userService.login(this.model.email, this.model.password)
          .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.loginErrorMsg = error.json().message;
            });
    }
}

import { UserService } from '../../../login/user.service';
import { User } from '../../../models/user';
import { DashboardAuthService } from '../../authentication/dashboard-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-header-top-links',
  templateUrl: './header-top-links.component.html',
  styleUrls: ['./header-top-links.component.css']
})
export class HeaderTopLinksComponent implements OnInit {

  title = 'Xpanxion Radix';
  currentUser: User;
  
  constructor(
    private authService: DashboardAuthService, 
    private router: Router,
    private userService: UserService) { }
  
  ngOnInit() {
    this.loadActiveUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  
  loadActiveUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}

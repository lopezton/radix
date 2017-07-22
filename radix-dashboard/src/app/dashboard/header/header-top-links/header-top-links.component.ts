import { UserService } from '../../../authentication/user.service';
import { User } from '../../../models/user';
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
    private router: Router,
    private userService: UserService) { }
  
  ngOnInit() {
    this.loadActiveUser();
  }

  logout() {
    this.userService.logout();
  }
  
  loadActiveUser() {
    this.currentUser = this.userService.getActiveUser();
  }
}

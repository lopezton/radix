import { DashboardAuthService } from '../../authentication/dashboard-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top-links',
  templateUrl: './header-top-links.component.html',
  styleUrls: ['./header-top-links.component.css']
})
export class HeaderTopLinksComponent implements OnInit {

  title = 'Xpanxion Radix';
  
  constructor(private authService: DashboardAuthService, private router: Router) { }
  
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit() {
    this.updateActiveUserInStorage();
  }
  
  updateActiveUserInStorage(): boolean {
    return false;
  }
}

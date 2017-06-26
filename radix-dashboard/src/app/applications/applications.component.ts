import { Application } from '../models/application';
import { EverestService } from '../everest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: Application[];
  selected: Application;
  
  constructor(private everestService: EverestService) { }

  ngOnInit() {
    this.applications = this.everestService.getApplications();
  }

  selectApplication(app: Application) {
    if (this.selected === app) {
      this.selected = null;
    } else {
      this.selected = app;
    }
  }
  
  isSelected(app: Application) {
    return app === this.selected;
  }
  
  openApplication(app: Application) {
    this.selected = app;
    if (app.isWeb && app.url) {
      window.open(app.url, '_blank'); 
    }
  }
}

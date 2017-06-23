import { Application } from '../application';
import { EverestService } from '../everest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: Application[];
  
  constructor(private everestService: EverestService) { }

  ngOnInit() {
    this.applications = this.everestService.getApplications();
  }

  openApplication(app: Application) {
    if (app.isWeb && app.url) {
      window.open(app.url, '_blank'); 
    }
  }
}

import { UserService } from '../../../authentication/user.service';
import { Application } from '../../../models/application';
import { UserApplications } from '../../../models/user-applications';
import { ApplicationsService } from '../applications.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-applications',
  templateUrl: './applications-home.component.html',
  styleUrls: ['./applications-home.component.css']
})
export class ApplicationsHomeComponent implements OnInit {

  model: UserApplications = new UserApplications();
  
  constructor(
    private _applicationsService: ApplicationsService,
    private _userService: UserService,
    private _router: Router
  ) {}

  private _loadApplications() {
    this._applicationsService.getUserApplications().subscribe(userApplications => {
      this._applicationsService.userApplications = userApplications;
      this.model = userApplications;
    }, err => {
      // TODO Display with Modal Dialogue
      alert('Could not load applications.');
    });
  }
  
  editSelectedApplication() {
    if (this._applicationsService.selectedApplication) {
      this._router.navigate(['/dashboard/applications/edit']);
    } else {
      // TODO: Display with Modal Dialogue
      alert('No application was selected. Please select an application to edit.')
    }
  }
  
  deleteSelectedApplication() {
    if (this._applicationsService.selectedApplication) {
      if (confirm(`Delete application "${this._applicationsService.selectedApplication.title}"?`)) {
        this._applicationsService.deleteSelectedApplication().subscribe(resp => {
          this._applicationsService.selectedApplication = null;
        }, err => {
          // TODO: Display with Modal Dialogue
          alert(err);
        });
      }
    } else {
      // TODO: Display with Modal Dialogue
      alert('No application selected was selected. Please select an application to delete.')
    }
  }
  
  ngOnInit() {
    this._loadApplications();
    this._applicationsService.selectedApplication = null;
  }
  
  isSelected(app: Application) {
    return app === this._applicationsService.selectedApplication;
  }
  
  openApplication(app: Application) {
    this._applicationsService.selectedApplication = app;
    if (app.web && app.url) {
      window.open(app.url, '_blank'); 
    }
  }
  
  selectApplication(app: Application) {
    if (this._applicationsService.selectedApplication === app) {
      this._applicationsService.selectedApplication = null;
    } else {
      this._applicationsService.selectedApplication = app;
    }
  }
}

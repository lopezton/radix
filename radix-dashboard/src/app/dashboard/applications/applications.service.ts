import { UserService } from '../../authentication/user.service';
import { Application } from '../../models/application';
import { UserApplications } from '../../models/user-applications';
import { DashboardService } from '../dashboard.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/of'

@Injectable()
export class ApplicationsService {
  
  userApplications: UserApplications;
  selectedApplication: Application;

  constructor(
    private _userService: UserService,
    private _dashboardService: DashboardService
  ) { }
  
  addApplication(app: Application): Observable<UserApplications> {
    this.userApplications.applications.push(app);
    return this.save().catch(err => {
      return Observable.throw('Failed to add application.');
    });
  }
  
  deleteSelectedApplication(): Observable<UserApplications> {
    if (!this.selectedApplication) {
      return Observable.throw('No application selected.');
    }
    this.userApplications.applications = this.userApplications.applications.filter(app => app !== this.selectedApplication);
    return this.save().catch(err => {
      return Observable.throw('Failed to delete application.');
    });
  }
  
  getUserApplications(): Observable<UserApplications> {
    const userId = this._userService.getActiveUser().id;
    return this._dashboardService.getUserApplications(userId)
      .catch(err => {
        return Observable.throw('Failed to retrieve user applications.');
      });
  }
  
  save(): Observable<UserApplications> {
    return this._dashboardService.saveUserApplications(this.userApplications)
      .catch(err => {
        return Observable.throw(err);
      });
  }
}

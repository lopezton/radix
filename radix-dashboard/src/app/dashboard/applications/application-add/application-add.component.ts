import { Application } from '../../../models/application';
import { ApplicationsService } from '../applications.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-add.component.html'
})
export class ApplicationAddComponent implements OnInit {

  formTitle = 'Add an Application';
  model: Application = new Application();
  errorMsgs: string;
  
  constructor(
    private _location: Location,
    private _applicationsService: ApplicationsService
  ) { }

  ngOnInit() {
    
  }

  addApplication() {
    console.log('Adding application to the system.');
    console.log(this.model);
    this.errorMsgs = '';
    this._applicationsService.addApplication(this.model)
      .subscribe(application => {
        this.goBack();
      },
      err => {
        this.errorMsgs = 'Error: Unable to add application to the system.';
      });
  }
  
  goBack() {
    this._location.back();
  }
}

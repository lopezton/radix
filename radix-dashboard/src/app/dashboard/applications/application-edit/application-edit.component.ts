import { Application } from '../../../models/application';
import { ApplicationsService } from '../applications.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html'
})
export class ApplicationEditComponent implements OnInit {

  formTitle = 'Edit Application';
  model: Application = this._applicationsService.selectedApplication;
  errorMsgs: string;
  
  constructor(
    private _location: Location,
    private _applicationsService: ApplicationsService
  ) { }

  ngOnInit() {
    if (!this.model) {
      this.goBack();
    }
  }
  
  updateApplication() {
    console.log(`Editing application ${this.model.title}`);
    console.log(this.model);
    this.errorMsgs = '';
    this._applicationsService.save()
      .subscribe(application => {
        this.goBack();
      },
      err => {
        this.errorMsgs = `Error: Unable to edit application ${this.model.title}.`;
      });
  }
  
  goBack() {
    this._location.back();
  }

}

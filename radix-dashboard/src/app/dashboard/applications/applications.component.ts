import { ApplicationsService } from './applications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  template: `<router-outlet></router-outlet>`,
  providers: [
    ApplicationsService
  ]
})
export class ApplicationsComponent implements OnInit {

  constructor(private _applicationsService: ApplicationsService) { }

  ngOnInit() {
  }

}

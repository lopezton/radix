import { Application } from './application';
import { Injectable } from '@angular/core';

import { APPLICATIONS } from './mock-applications';

@Injectable()
export class EverestService {

  constructor() { }

  getApplications(): Application[] {
    return APPLICATIONS;
  }
}

import { Application } from './application';

export class UserApplications {
  
  id: string;
  userId: string;
  
  applications: Application[] = new Array();
  
  constructor() {}
}

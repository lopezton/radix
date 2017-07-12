import { Application } from './application';
import { PersonalData } from './personal-data';
export class User {
  
  token: string;
  refreshToken: string;
  
  personalData: PersonalData;
  applications: Application[];
  
  constructor() {}
}

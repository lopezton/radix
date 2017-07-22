import { Application } from './application';
import { PersonalData } from './personal-data';
export class User {
  
  id: string;
  token: string;
  refreshToken: string;
  
  personalData: PersonalData;
  
  constructor() {}
}

import { User } from './../../main/models/user';
import { Moment } from 'moment';

export class Login {
  id: number;
  user: User;
  loginTime: string;
  logoutTime: string;
  totalTime: any;
}

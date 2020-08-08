import { Group } from './../../config-user/models/group';
import { Type } from './../../config-user/models/type';
import { Position } from 'src/app/config-user/models/position';

export class User {
  id: number;
  name: string;
  password: string;
  passConfirm: string;
  active: boolean;
  email: string;
  type: Type;
  position: Position;
  group: Group;
  code: number;
}

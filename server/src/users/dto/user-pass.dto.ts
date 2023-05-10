import { IUserPassDto } from '../users.interface';

export class UserPassDto {
  id;
  email;

  constructor(model: IUserPassDto) {
    this.id = model.id;
    this.email = model.email;
  }
}

import { ValidatedUserDto } from 'users/dto';

export class ReturnUserCommand {
  constructor(public readonly user: ValidatedUserDto) {}
}

import { LoginUserDto } from 'auth/dto';

export class LoginCommand {
  constructor(public readonly dto: LoginUserDto) {}
}

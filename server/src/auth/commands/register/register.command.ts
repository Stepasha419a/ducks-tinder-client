import { CreateUserDto } from 'users/dto';

export class RegisterCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

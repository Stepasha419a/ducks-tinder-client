import { CreateUserDto } from 'users/dto';

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

import { ValidatedUserDto } from 'users/dto';

export class GetChatsQuery {
  constructor(public readonly user: ValidatedUserDto) {}
}

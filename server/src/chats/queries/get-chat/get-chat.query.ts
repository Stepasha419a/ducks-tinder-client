import { ValidatedUserDto } from 'users/dto';

export class GetChatQuery {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly id: string,
  ) {}
}

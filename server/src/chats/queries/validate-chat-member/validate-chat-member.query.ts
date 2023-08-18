import { ChatIdDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class ValidateChatMemberQuery {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: ChatIdDto,
  ) {}
}

import { ChatIdDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class DeleteChatCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: ChatIdDto,
  ) {}
}

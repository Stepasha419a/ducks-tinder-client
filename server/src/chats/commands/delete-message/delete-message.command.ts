import { DeleteMessageDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class DeleteMessageCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: DeleteMessageDto,
  ) {}
}

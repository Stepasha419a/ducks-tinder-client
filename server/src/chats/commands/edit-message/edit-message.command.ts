import { EditMessageDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class EditMessageCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: EditMessageDto,
  ) {}
}

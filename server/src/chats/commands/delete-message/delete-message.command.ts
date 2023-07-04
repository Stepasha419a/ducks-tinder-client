import { User } from '@prisma/client';
import { DeleteMessageDto } from 'chats/dto';

export class DeleteMessageCommand {
  constructor(
    public readonly user: User,
    public readonly dto: DeleteMessageDto,
  ) {}
}

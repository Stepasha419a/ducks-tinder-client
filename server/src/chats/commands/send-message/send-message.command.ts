import { User } from '@prisma/client';
import { SendMessageDto } from 'chats/dto';

export class SendMessageCommand {
  constructor(
    public readonly user: User,
    public readonly dto: SendMessageDto,
  ) {}
}

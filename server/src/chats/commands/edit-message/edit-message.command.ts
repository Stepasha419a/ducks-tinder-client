import { User } from '@prisma/client';
import { EditMessageDto } from 'chats/dto';

export class EditMessageCommand {
  constructor(
    public readonly user: User,
    public readonly chatId: string,
    public readonly dto: EditMessageDto,
  ) {}
}

import { SendMessageDto } from 'chats/dto';

export class SendMessageCommand {
  constructor(public readonly dto: SendMessageDto) {}
}

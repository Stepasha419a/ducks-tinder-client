import { GetMessagesDto } from 'chats/dto';

export class GetMessagesQuery {
  constructor(public readonly dto: GetMessagesDto) {}
}

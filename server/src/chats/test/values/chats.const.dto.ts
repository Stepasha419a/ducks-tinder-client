import { GetMessagesDto } from 'chats/dto';
import { fullChatStub } from '../stubs';

export const GET_MESSAGES_DTO: GetMessagesDto = {
  chatId: fullChatStub().id,
  haveCount: 0,
};

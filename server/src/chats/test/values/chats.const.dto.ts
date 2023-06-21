import { GetMessagesDto } from 'chats/dto';
import { userDtoStub } from 'users/test/stubs';
import { fullChatStub } from '../stubs';

export const GET_MESSAGES_DTO: GetMessagesDto = {
  userId: userDtoStub().id,
  chatId: fullChatStub().id,
  haveCount: 0,
};

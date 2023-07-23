import { EditMessageDto } from 'chats/dto';
import { fullChatStub, messageStub } from '../stubs';

export const EDIT_MESSAGE_DTO: EditMessageDto = {
  messageId: messageStub().id,
  chatId: fullChatStub().id,
  text: 'update-text',
};

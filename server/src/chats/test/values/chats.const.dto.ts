import { ChatIdDto, EditMessageDto } from 'chats/dto';
import { fullChatStub, messageStub } from '../stubs';

export const EDIT_MESSAGE_DTO: EditMessageDto = {
  messageId: messageStub().id,
  chatId: fullChatStub().id,
  text: 'update-text',
};

export const CHAT_ID_DTO: ChatIdDto = {
  chatId: fullChatStub().id,
};

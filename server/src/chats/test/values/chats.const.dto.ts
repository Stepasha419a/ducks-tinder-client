import { EditMessageDto } from 'chats/dto';
import { messageStub } from '../stubs';

export const EDIT_MESSAGE_DTO: EditMessageDto = {
  messageId: messageStub().id,
  text: 'update-text',
};

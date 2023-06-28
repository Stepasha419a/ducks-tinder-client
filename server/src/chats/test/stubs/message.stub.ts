import { Message } from '@prisma/client';

export const messageStub = (): Message => ({
  id: 'message-id',
  chatId: 'chat-id',
  userId: 'user-id',
  text: 'message-text',
  repliedId: null,
  createdAt: new Date('2022-01-01'),
  updatedAt: new Date('2022-01-02'),
});

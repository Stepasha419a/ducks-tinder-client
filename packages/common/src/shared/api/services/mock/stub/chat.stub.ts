import type { Chat, Message, ShortMessagesPagination } from '@shared/api';

export const chatStub: Chat = {
  id: 'id',
  avatar: '',
  blocked: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastSeenAt: new Date().toISOString(),
  memberId: 'id',
  name: 'name',
  newMessagesCount: 0,
};

export const shortMessagesPaginationStub: ShortMessagesPagination = {
  chatId: 'id',
  messages: [],
};

export const messageStub: Message = {
  avatar: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  id: 'id',
  name: 'message',
  text: 'test',
  userId: 'id',
};

import { globalEventEmitter } from '@ducks-tinder-client/common';
import type { Chat } from '../../interfaces';
import { chatStub, messageStub } from './stub';

export const mockStorage = {
  currentChatId: null as string | null,
  chats: [
    {
      ...chatStub,
      name: 'Juliet',
      memberId: 'juliet',
      lastMessage: {
        ...messageStub,
        createdAt: new Date(Date.now() - 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1000).toISOString(),
        name: 'Juliet',
        id: 'juliet',
        userId: 'juliet',
        text: 'Hi, I checked your profile, you are a handsome guy) Im Juliet!',
      },
      newMessagesCount: 1,
      lastSeenAt: new Date(Date.now() - 1000).toISOString(),
      createdAt: new Date(Date.now() - 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1000).toISOString(),
    },
  ] as Chat[],
};

globalEventEmitter.on('accept-pair', ({ id }: { id: string }) => {
  mockStorage.chats.unshift({ ...chatStub, id });
});

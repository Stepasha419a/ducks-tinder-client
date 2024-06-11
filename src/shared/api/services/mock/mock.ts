import type { AxiosResponse } from 'axios';
import { matchingUserStubs, userStub } from './user/user.stub';
import { chatStub, messageStub } from './chat/chat.stub';
import type { Chat } from '../../interfaces';

export async function resolveAxiosResponse<T>(
  data?: T
): Promise<AxiosResponse<T>> {
  return Promise.resolve({
    config: {},
    data: data as T,
    headers: {},
    status: 200,
    statusText: '',
  });
}

export function getMockableService<T>(service: T, mockService: T): T {
  return import.meta.env.VITE_MODE === 'test' ? mockService : service;
}

export const mockStorage = {
  currentUser: userStub,
  currentMatchingIndex: 0,
  setCurrentMatchingIndex(value: number) {
    if (value >= matchingUserStubs.length) {
      this.currentMatchingIndex = 0;
    } else if (value < 0) {
      this.currentMatchingIndex = matchingUserStubs.length - 1;
    } else {
      this.currentMatchingIndex = value;
    }

    return this.currentMatchingIndex;
  },
  currentChatId: null as string | null,
  chats: [
    {
      ...chatStub,
      name: 'Juliet',
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

import { FullChatWithoutDistance } from 'chats/chats.interface';
import { shortUserStub } from 'users/test/stubs';
import { shortUserWithLocationStub } from './short-user-with-location.stub';

export const fullChatWithoutDistanceStub = (): FullChatWithoutDistance => ({
  id: 'asdasd123123',
  users: [shortUserWithLocationStub()],
  messages: [
    {
      id: '123asd234',
      text: 'message text',
      userId: shortUserStub().id,
      createdAt: new Date('2022-01-01'),
      updatedAt: new Date('2022-01-01'),
      replied: null,
    },
  ],
  blocked: false,
  blockedById: null,
});

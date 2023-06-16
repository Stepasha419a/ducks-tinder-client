import { ShortChat } from 'chats/chats.interfaces';
import { shortUserStub } from 'users/test/stubs';

export const shortChatStub = (): ShortChat => ({
  id: 'asdasd123123',
  users: [shortUserStub()],
  messages: [
    { id: '123asd234', text: 'message text', userId: shortUserStub().id },
  ],
});

import { fullChatStub } from '../stubs';
import { requestUserStub } from '../stubs/request-user.stub';

export const UserSocketMock = jest.fn().mockReturnValue({
  handshake: {
    query: {
      chatId: fullChatStub().id,
    },
  },
  request: {
    user: requestUserStub(),
  },
  join: jest.fn(),
  emit: jest.fn(),
  leave: jest.fn(),
});

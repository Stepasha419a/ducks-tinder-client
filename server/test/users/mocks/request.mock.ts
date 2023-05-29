import { userStub } from '../stubs';

export const RequestMock = jest.fn().mockReturnValue({
  user: userStub(),
});

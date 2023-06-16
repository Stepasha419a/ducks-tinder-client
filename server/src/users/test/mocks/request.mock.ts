import { requestUserStub } from '../stubs';

export const RequestMock = jest.fn().mockReturnValue({
  user: requestUserStub(),
});

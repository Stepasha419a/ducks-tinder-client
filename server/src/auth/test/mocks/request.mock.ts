import { userDataStub } from '../stubs/user-data.stub';
export const RequestMock = jest.fn().mockReturnValue({
  cookies: {
    refreshToken: userDataStub().refreshToken,
  },
});

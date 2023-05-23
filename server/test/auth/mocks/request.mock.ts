import { userDataStub } from '../stubs/user-data.stub';
export const RequestMock = jest.fn().mockReturnValue({
  cookies: {
    accessToken: userDataStub().accessToken,
    refreshToken: userDataStub().refreshToken,
  },
});

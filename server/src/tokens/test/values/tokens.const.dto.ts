import { userStub } from 'users/test/stubs';
import { UserTokenDto } from 'auth/dto';

export const USER_TOKEN_DTO: UserTokenDto = {
  email: userStub().email,
  id: userStub().id,
};

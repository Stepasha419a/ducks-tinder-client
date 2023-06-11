import { userStub } from 'test/users/stubs';
import { UserTokenDto } from 'auth/dto';

export const USER_TOKEN_DTO: UserTokenDto = {
  email: userStub().email,
  id: userStub().id,
};

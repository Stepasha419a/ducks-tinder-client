import { userDtoStub } from 'users/test/stubs';
import { UserTokenDto } from 'auth/dto';

export const USER_TOKEN_DTO: UserTokenDto = {
  email: userDtoStub().email,
  id: userDtoStub().id,
};

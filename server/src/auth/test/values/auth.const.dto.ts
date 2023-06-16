import { CreateUserDto } from 'users/dto';
import { userStub } from 'users/test/stubs';
import { LoginUserDto } from 'auth/dto';

export const CREATE_USER_DTO: CreateUserDto = {
  email: userStub().email,
  password: '123123123',
  name: userStub().name,
};

export const LOGIN_USER_DTO: LoginUserDto = {
  email: userStub().email,
  password: '123123123',
};

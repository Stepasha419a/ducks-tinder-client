import {
  CreateUserDto,
  DeletePictureDto,
  MixPicturesDto,
  UpdateUserDto,
  UserPairDto,
} from 'users/dto';
import { userStub } from '../stubs';

export const USER_SORTS_DATA = {
  ...userStub(),
  distance: 100,
  onlyNear: true,
  age: 20,
  preferAgeFrom: 18,
  preferAgeTo: 25,
  sex: 'male',
  preferSex: 'female',
  userIds: [],
  password: '123123123',
  activationLink: 'asd456',
  createdAt: new Date('2022-08-19'),
  updatedAt: new Date('2022-08-20'),
};

export const CREATE_USER_DTO: CreateUserDto = {
  email: userStub().email,
  password: '123123123',
  name: userStub().name,
};

export const UPDATE_USER_DTO: UpdateUserDto = {
  name: 'William',
  email: 'email123123@gmail.com',
  interests: ['traveling', 'ski'],
};

export const DELETE_PICTURE_DTO: DeletePictureDto = {
  order: 0,
};

export const MIX_PICTURES_DTO: MixPicturesDto = {
  mixOrder: 0,
  withOrder: 1,
};

export const DELETE_USER_PAIR_DTO: UserPairDto = {
  userPairId: '34545656',
};

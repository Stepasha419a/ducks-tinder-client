import {
  CreateUserDto,
  DeletePictureDto,
  MixPicturesDto,
  SavePictureDto,
  UpdateUserDto,
  UserPairDto,
  UserSortsDto,
} from 'users/dto';
import { userStub } from '../stubs';

export const USER_SORTS_DTO: UserSortsDto = {
  distance: 100,
  onlyNear: true,
  age: 20,
  preferAgeFrom: 18,
  preferAgeTo: 25,
  sex: 'male',
  preferSex: 'female',
  userIds: [],
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

export const SAVE_PICTURE_DTO: SavePictureDto = {
  userId: userStub().id,
};

export const DELETE_PICTURE_DTO: DeletePictureDto = {
  userId: userStub().id,
  order: 0,
};

export const MIX_PICTURES_DTO: MixPicturesDto = {
  userId: userStub().id,
  mixOrder: 0,
  withOrder: 1,
};

export const CREATE_USER_PAIR_DTO: UserPairDto = {
  userId: userStub().id,
  userPairId: '123123',
};

export const DELETE_USER_PAIR_DTO: UserPairDto = {
  userId: userStub().id,
  userPairId: '34545656',
};

import {
  CreateUserDto,
  DeletePictureDto,
  MixPicturesDto,
  PatchUserDto,
} from 'users/dto';
import { userDtoStub } from '../stubs';

export const USER_SORTS_DATA = {
  ...userDtoStub(),
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
  email: userDtoStub().email,
  password: '123123123',
  name: userDtoStub().name,
};

export const UPDATE_USER_DTO: PatchUserDto = {
  name: 'William',
  email: 'email123123@gmail.com',
  interests: ['traveling', 'ski'],
};

export const DELETE_PICTURE_DTO: DeletePictureDto = {
  order: 0,
};

export const MIX_PICTURES_DTO: MixPicturesDto = {
  pictures: [
    { name: 'picture-1.jpg', order: 0 },
    { name: 'picture-1.jpg', order: 1 },
    { name: 'picture-1.jpg', order: 2 },
  ],
};

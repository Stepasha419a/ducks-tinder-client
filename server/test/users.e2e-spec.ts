import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import {
  partnerSettingsDefault,
  picturesDefault,
} from '../src/users/users.constants';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/users/users.model';
import { FilesService } from '../src/files/files.service';
import { AuthGuard } from '../src/auth/auth.guard';
import { UsersModule } from '../src/users/users.module';
import { Token } from '../src/tokens/tokens.model';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const receivedUserCreateDto = {
    password: 'sadasdasdassdf',
    email: '123@mail.ru',
    name: 'stepa',
  };

  const expectedUserCreateDto = {
    email: '123@mail.ru',
    name: 'stepa',
  };

  const updateUserDto = {
    email: 'newEmail@gmail.com',
    name: 'John',
  };

  const getUserData = (dto) => ({
    _id: 'sdfhsdghj34259034578923',
    description: '',
    isActivated: false,
    age: 18,
    sex: 'male',
    nickname: '',
    interests: [],
    partnerSettings: partnerSettingsDefault,
    pictures: picturesDefault,
    chats: [],
    pairs: [],
    checkedUsers: [],
    ...dto,
  });

  const mockAuthGuard = jest.fn().mockImplementation(() => true);

  const mockUserModel = {
    create: jest.fn((dto: CreateUserDto) => Promise.resolve(getUserData(dto))),
    findById: jest.fn((id: string) =>
      Promise.resolve({ ...getUserData(receivedUserCreateDto), id }),
    ),
    findOne: jest.fn((field: Record<string, unknown>) =>
      Promise.resolve({ ...getUserData(receivedUserCreateDto), ...field }),
    ),
    findByIdAndUpdate: jest.fn((id: string, dto: UpdateUserDto) =>
      Promise.resolve({ ...getUserData(receivedUserCreateDto), ...dto, id }),
    ),
    findByIdAndDelete: jest.fn((id: string) =>
      Promise.resolve({ ...getUserData(expectedUserCreateDto), id }),
    ),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(mockUserModel)
      .overrideProvider(getModelToken(Token.name))
      .useValue({})
      .overrideProvider(FilesService)
      .useValue({})
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/:id (GET)', () => {
    request(app.getHttpServer())
      .get('/users/sdfhsdghj34259034578923')
      .expect(200);
  });

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/sdfhsdghj34259034578923')
      .send(updateUserDto)
      .expect(200);

    expect(response.body).toEqual(getUserData(updateUserDto));
  });

  afterEach(async () => {
    await app.close();
  });
});

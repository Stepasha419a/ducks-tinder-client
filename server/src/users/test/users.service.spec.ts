import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { User } from '../users.model';
import { getModelToken } from '@nestjs/mongoose';
import { FilesService } from '../../files/files.service';
import { FilesModule } from '../../files/files.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { partnerSettingsDefault, picturesDefault } from '../users.constants';
import { UpdateUserDto } from '../dto/updated-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const receivedUserCreateDto = {
    password: 'sadasdasdassdf',
    email: '123@mail.ru',
    name: 'stepa',
  };

  const expectedUserDto = {
    email: '123@mail.ru',
    name: 'stepa',
  };

  const updateUserDto = {
    email: 'newEmail@gmail.com',
    name: 'John',
  };

  const getUserData = (dto) => ({
    id: 'sdfhsdghj34259034578923',
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
      Promise.resolve({ ...getUserData(expectedUserDto), id }),
    ),
  };
  const mockFilesService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
      imports: [FilesModule],
    })
      .overrideProvider(FilesService)
      .useValue(mockFilesService)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(await service.create(receivedUserCreateDto)).toEqual(
      getUserData(expectedUserDto),
    );
  });

  it('should get a user by id and return that', async () => {
    expect(await service.getOne('sdfhsdghj34259034578923')).toEqual(
      getUserData(expectedUserDto),
    );
  });

  it('should get a user by email and return its dirty object', async () => {
    expect(await service.getByEmail('123@mail.ru')).toEqual(
      getUserData(receivedUserCreateDto),
    );
  });

  it('should update a user and return that', async () => {
    expect(
      await service.update('sdfhsdghj34259034578923', updateUserDto),
    ).toEqual(getUserData(updateUserDto));
  });

  it('should delete a user and return that', async () => {
    expect(await service.delete('sdfhsdghj34259034578923')).toEqual(
      getUserData(expectedUserDto),
    );
  });
});

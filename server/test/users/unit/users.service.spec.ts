import { Test } from '@nestjs/testing';
import { UsersService } from 'users/users.service';
import { FilesService } from 'files/files.service';
import { FilesModule } from 'files/files.module';
import { CreateUserDto, UpdateUserDto, UserDto, UserSortsDto } from 'users/dto';
import { shortUserStub, userStub } from '../stubs';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersPrismaMock } from '../mocks/users.prisma-mock';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/utils';
import { User } from '@prisma/client';
import { ShortUser } from 'users/users.interface';

describe('UsersService', () => {
  let service: UsersService;

  /* const mockUserModel = {
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
  }; */
  const mockFilesService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(mockFilesService)
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when get one is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.getOne(userStub().id);
    });

    it('should call findUnique', async () => {
      expect(UsersPrismaMock.user.findUnique).toBeCalledTimes(1);
      expect(UsersPrismaMock.user.findUnique).toBeCalledWith({
        where: { id: userStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when get by email is called', () => {
    let user: User;

    beforeEach(async () => {
      user = await service.getByEmail(userStub().email);
    });

    it('should call findUnique', async () => {
      // it was called before
      expect(UsersPrismaMock.user.findUnique).toBeCalledTimes(3);
      expect(UsersPrismaMock.user.findUnique).toBeCalledWith({
        where: { id: userStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual({ ...userStub(), _count: { pairFor: 0 } });
    });
  });

  describe('when get sorted is called', () => {
    let user: ShortUser;
    let userSortsDto: UserSortsDto;
    let findFirstCalledWith;

    beforeEach(async () => {
      userSortsDto = {
        distance: 100,
        onlyNear: true,
        age: 20,
        preferAgeFrom: 18,
        preferAgeTo: 25,
        sex: 'male',
        preferSex: 'female',
        userIds: [],
      };
      findFirstCalledWith = {
        where: {
          id: { notIn: userSortsDto.userIds },
          distance: { gt: 0, lte: userSortsDto.distance },
          age: {
            gt: userSortsDto.preferAgeFrom - 1,
            lt: userSortsDto.preferAgeTo + 1,
          },
          preferAgeFrom: {
            lt: userSortsDto.age + 1,
          },
          preferAgeTo: {
            gt: userSortsDto.age - 1,
          },
          sex: userSortsDto.preferSex,
          preferSex: userSortsDto.sex,
        },
        select: UsersSelector.selectShortUser(),
      };
      user = await service.getSorted(userSortsDto);
    });

    it('should call findFirst', async () => {
      // it was called before
      expect(UsersPrismaMock.user.findFirst).toBeCalledTimes(1);
      expect(UsersPrismaMock.user.findFirst).toBeCalledWith(
        findFirstCalledWith,
      );
    });

    it('should return a short user', async () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when create is called', () => {
    let user: UserDto;
    let createUserDto: CreateUserDto;

    beforeEach(async () => {
      createUserDto = {
        email: userStub().email,
        password: '123123123',
        name: userStub().name,
      };
      user = await service.create(createUserDto);
    });

    it('should call create user', async () => {
      expect(UsersPrismaMock.user.create).toBeCalledTimes(1);
      expect(UsersPrismaMock.user.create).toBeCalledWith({
        data: createUserDto,
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  // TODO: finish that
  describe('when patch is called', () => {
    let user: UserDto;
    let updateUserDto: UpdateUserDto;

    beforeEach(async () => {
      updateUserDto = {
        name: 'John',
        email: 'email123123@gmail.com',
        interests: ['traveling'],
      };
      user = await service.patch(userStub().id, updateUserDto);
    });

    it('should call find many interests', async () => {
      expect(UsersPrismaMock.interest.findMany).toBeCalledTimes(1);
      expect(UsersPrismaMock.interest.findMany).toBeCalledWith({
        where: { name: { in: updateUserDto.interests } },
      });
    });

    it('should call update user', async () => {
      expect(UsersPrismaMock.user.update).toBeCalledTimes(4);
      expect(UsersPrismaMock.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userStub().id },
        data: {
          interests: {
            connect: {
              id: '123123',
            },
          },
        },
      });
      expect(UsersPrismaMock.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          email: 'email123123@gmail.com',
          interests: undefined,
          name: 'John',
        },
        include: UsersSelector.selectUser(),
        where: {
          id: 'sdfhsdghj34259034578923',
        },
      });
    });

    /* it('should return a user', async () => {
      expect(user).toEqual(userStub());
    }); */
  });

  /* it('should get a user by id and return that', async () => {
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
  }); */
});

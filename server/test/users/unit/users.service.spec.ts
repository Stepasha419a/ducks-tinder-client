import { Test } from '@nestjs/testing';
import { UsersService } from 'users/users.service';
import { FilesService } from 'files/files.service';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { ShortUser } from 'users/users.interface';
import {
  CreateUserDto,
  DeletePictureDto,
  SavePictureDto,
  UpdateUserDto,
  UserDto,
  UserSortsDto,
} from 'users/dto';
import { UsersSelector } from 'users/utils';
import { clearMockHistory } from '../../common/utils';
import { UsersPrismaMock } from '../mocks/users.prisma-mock';
import { FilesServiceMock } from '../mocks/files.service-mock';
import { shortUserStub, userStub } from '../stubs';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock)
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    clearMockHistory(UsersPrismaMock);
    clearMockHistory(FilesServiceMock);
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

    it('should call find unique', async () => {
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

    it('should call find unique', async () => {
      expect(UsersPrismaMock.user.findUnique).toBeCalledTimes(1);
      expect(UsersPrismaMock.user.findUnique).toBeCalledWith({
        where: { email: userStub().email },
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

    it('should call find first', async () => {
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
      expect(UsersPrismaMock.user.update).toBeCalledTimes(3);
      expect(UsersPrismaMock.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userStub().id },
        data: {
          interests: {
            disconnect: {
              id: '456456',
            },
          },
        },
      });
      expect(UsersPrismaMock.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          interests: {
            connect: {
              id: '123123',
            },
          },
        },
        where: {
          id: 'sdfhsdghj34259034578923',
        },
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when save picture is called', () => {
    let user: UserDto;
    let savePictureDto: SavePictureDto;

    beforeEach(async () => {
      savePictureDto = {
        userId: userStub().id,
      };
      user = await service.savePicture(savePictureDto, {
        fieldname: '123123',
      } as Express.Multer.File);
    });

    it('should call find unique', async () => {
      expect(UsersPrismaMock.user.findUnique).toBeCalledTimes(2);
      expect(UsersPrismaMock.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userStub().id },
        include: { pictures: true },
      });
      expect(UsersPrismaMock.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should call create picture', async () => {
      expect(UsersPrismaMock.picture.create).toBeCalledTimes(1);
      expect(UsersPrismaMock.picture.create).toBeCalledWith({
        data: {
          name: 'picture-name',
          userId: user.id,
          order: user.pictures.length,
        },
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when delete picture is called', () => {
    let user: UserDto;
    let deletePictureDto: DeletePictureDto;

    beforeEach(async () => {
      deletePictureDto = {
        userId: userStub().id,
        order: 0,
      };
      user = await service.deletePicture(deletePictureDto);
    });

    it('should call picture find first', async () => {
      expect(UsersPrismaMock.picture.findFirst).toBeCalledTimes(1);
      expect(UsersPrismaMock.picture.findFirst).toBeCalledWith({
        where: deletePictureDto,
      });
    });

    it('should call files-service delete picture', async () => {
      expect(FilesServiceMock.deletePicture).toBeCalledTimes(1);
      expect(FilesServiceMock.deletePicture).toBeCalledWith(
        'picture-name',
        userStub().id,
      );
    });

    it('should call picture delete', async () => {
      expect(UsersPrismaMock.picture.delete).toBeCalledTimes(1);
      expect(UsersPrismaMock.picture.delete).toBeCalledWith({
        where: { id: '123123' },
      });
    });

    it('should call picture update', async () => {
      expect(UsersPrismaMock.picture.update).toBeCalledTimes(1);
      expect(UsersPrismaMock.picture.update).toBeCalledWith({
        where: { id: '456456' },
        data: { order: 0 },
      });
    });

    it('should call user find unique', async () => {
      expect(UsersPrismaMock.user.findUnique).toBeCalledTimes(2);
      expect(UsersPrismaMock.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userStub().id },
        include: { pictures: true },
      });
      expect(UsersPrismaMock.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });
});

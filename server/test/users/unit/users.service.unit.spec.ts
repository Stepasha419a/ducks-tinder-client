import { Test } from '@nestjs/testing';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersService } from 'users/users.service';
import { FilesService } from 'files/files.service';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ShortUser } from 'users/users.interface';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';
import { UsersPrismaMock, CommandBusMock, FilesServiceMock } from '../mocks';
import { requestUserStub, shortUserStub, userStub } from '../stubs';
import {
  CREATE_USER_DTO,
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
  UPDATE_USER_DTO,
} from '../values/users.const.dto';
import {
  DeletePairCommand,
  DeletePictureCommand,
  DislikeUserCommand,
  GetSortedCommand,
  LikeUserCommand,
  MixPicturesCommand,
  PatchUserCommand,
  ReturnUserCommand,
  SavePictureCommand,
} from 'users/commands';

describe('users-service', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const usersPrismaMock = UsersPrismaMock();
  const commandBusMock = CommandBusMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [CqrsModule, FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock())
      .overrideProvider(PrismaService)
      .useValue(usersPrismaMock)
      .overrideProvider(CommandBus)
      .useValue(commandBusMock)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
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
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
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
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { email: userStub().email },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual({ ...userStub(), _count: { pairFor: 0 } });
    });
  });

  describe('when create is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.create(CREATE_USER_DTO);
    });

    it('should call create user', async () => {
      expect(prismaService.user.create).toBeCalledTimes(1);
      expect(prismaService.user.create).toBeCalledWith({
        data: CREATE_USER_DTO,
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when patch is called', () => {
    let user: ShortUser;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.patch(requestUserStub(), UPDATE_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
      );
    });

    it('should return a short user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when get sorted is called', () => {
    let user: ShortUser;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(shortUserStub());
    });

    beforeEach(async () => {
      user = await service.getSorted(requestUserStub());
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new GetSortedCommand(requestUserStub()),
      );
    });

    it('should return a short user', async () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when save picture is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.savePicture(requestUserStub(), {
        fieldname: '123123',
      } as Express.Multer.File);
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new SavePictureCommand(requestUserStub(), {
          fieldname: '123123',
        } as Express.Multer.File),
      );
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when delete picture is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.deletePicture(requestUserStub(), DELETE_PICTURE_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new DeletePictureCommand(requestUserStub(), DELETE_PICTURE_DTO),
      );
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when mix pictures is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.mixPictures(requestUserStub(), MIX_PICTURES_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
      );
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when like user is called', () => {
    let response;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await service.likeUser(requestUserStub(), '34545656');
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new LikeUserCommand(requestUserStub(), '34545656'),
      );
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when dislike user is called', () => {
    let response;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await service.dislikeUser(requestUserStub(), '34545656');
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new DislikeUserCommand(requestUserStub(), '34545656'),
      );
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when return user is called', () => {
    let response;

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await service.returnUser(requestUserStub());
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new ReturnUserCommand(requestUserStub()),
      );
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when get pairs is called', () => {
    let pairs: ShortUser[];

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue([shortUserStub()]);
    });

    beforeEach(async () => {
      pairs = await service.getPairs(requestUserStub());
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new ReturnUserCommand(requestUserStub()),
      );
    });

    it('should return an array of pairs', async () => {
      expect(pairs).toEqual([shortUserStub()]);
    });
  });

  describe('when delete pair is called', () => {
    let pairs: ShortUser[];
    const userPairId = '34545656';

    beforeAll(() => {
      commandBusMock.execute.mockClear();
      commandBusMock.execute = jest.fn().mockResolvedValue([shortUserStub()]);
    });

    beforeEach(async () => {
      pairs = await service.deletePair(requestUserStub(), userPairId);
    });

    it('should call command bus execute', () => {
      expect(commandBusMock.execute).toBeCalledTimes(1);
      expect(commandBusMock.execute).toBeCalledWith(
        new DeletePairCommand(requestUserStub(), userPairId),
      );
    });

    it('should return an array of pairs', async () => {
      expect(pairs).toEqual([shortUserStub()]);
    });
  });
});

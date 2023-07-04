import { Test } from '@nestjs/testing';
import { UsersController } from 'users/users.controller';
import { CommandBusMock, QueryBusMock } from 'users/test/mocks';
import { AccessTokenGuard } from 'common/guards';
import { requestUserStub, shortUserStub, userDtoStub } from 'users/test/stubs';
import { UserDto } from 'users/dto';
import { ShortUser } from 'users/users.interface';
import {
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
  UPDATE_USER_DTO,
  USER_SORTS_DATA,
} from 'users/test/values/users.const.dto';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import {
  DeletePairCommand,
  DeletePictureCommand,
  DislikeUserCommand,
  LikeUserCommand,
  MixPicturesCommand,
  PatchUserCommand,
  ReturnUserCommand,
  SavePictureCommand,
  AcceptPairCommand,
} from 'users/commands';
import { GetPairsQuery, GetSortedQuery } from 'users/queries';

describe('users-controller', () => {
  let usersController: UsersController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [CqrsModule],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .overrideProvider(QueryBus)
      .useValue(QueryBusMock())
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });
  });

  describe('when patch is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDtoStub());
    });

    beforeEach(async () => {
      user = await usersController.patch(requestUserStub(), UPDATE_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when getSorted is called', () => {
    let user: ShortUser;

    const RequestMock = jest.fn().mockReturnValue(USER_SORTS_DATA);

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(shortUserStub());
    });

    beforeEach(async () => {
      user = await usersController.getSortedUser(RequestMock());
    });

    it('should call command bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetSortedQuery(USER_SORTS_DATA),
      );
    });

    it('should return a short user', () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDtoStub());
    });

    beforeEach(async () => {
      user = await usersController.savePicture(requestUserStub(), {
        fieldname: '123123',
      } as Express.Multer.File);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SavePictureCommand(requestUserStub(), {
          fieldname: '123123',
        } as Express.Multer.File),
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when deletePicture is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDtoStub());
    });

    beforeEach(async () => {
      user = await usersController.deletePicture(
        requestUserStub(),
        DELETE_PICTURE_DTO,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DeletePictureCommand(requestUserStub(), DELETE_PICTURE_DTO),
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when mixPictures is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDtoStub());
    });

    beforeEach(async () => {
      user = await usersController.mixPictures(
        requestUserStub(),
        MIX_PICTURES_DTO,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when likeUser is called', () => {
    let response;
    const userPairId = '34545656';

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await usersController.likeUser(requestUserStub(), userPairId);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new LikeUserCommand(requestUserStub(), userPairId),
      );
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when dislikeUser is called', () => {
    let response;
    const userPairId = '34545656';

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await usersController.dislikeUser(
        requestUserStub(),
        userPairId,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DislikeUserCommand(requestUserStub(), userPairId),
      );
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when returnUser is called', () => {
    let response;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await usersController.returnUser(requestUserStub());
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new ReturnUserCommand(requestUserStub()),
      );
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when getPairs is called', () => {
    let users: ShortUser[];

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue([shortUserStub()]);
    });

    beforeEach(async () => {
      users = await usersController.getPairs(requestUserStub());
    });

    it('should call command bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetPairsQuery(requestUserStub()),
      );
    });

    it('should return an array of short users', () => {
      expect(users).toEqual([shortUserStub()]);
    });
  });

  describe('when deletePair is called', () => {
    let user: ShortUser[];
    const userPairId = '34545656';

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue([shortUserStub()]);
    });

    beforeEach(async () => {
      user = await usersController.deletePair(requestUserStub(), userPairId);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DeletePairCommand(requestUserStub(), userPairId),
      );
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });

  describe('when acceptPair is called', () => {
    let user: ShortUser[];
    const userPairId = '34545656';

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue([shortUserStub()]);
    });

    beforeEach(async () => {
      user = await usersController.acceptPair(requestUserStub(), userPairId);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new AcceptPairCommand(requestUserStub(), userPairId),
      );
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });
});

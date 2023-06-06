import { Test } from '@nestjs/testing';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { RequestMock, UsersServiceMock } from '../mocks';
import { AccessTokenGuard } from 'common/guards';
import { newUserStub, shortUserStub, userStub } from '../stubs';
import { UserDto } from 'users/dto';
import { ShortUser } from 'users/users.interface';
import {
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
  UPDATE_USER_DTO,
  USER_SORTS_DATA,
} from '../values/users.const.dto';

describe('users-controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);
  const requestMock = RequestMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(UsersService)
      .useValue(UsersServiceMock())
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
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

    beforeEach(async () => {
      user = await usersController.patch(requestMock, UPDATE_USER_DTO);
    });

    it('should call usersService patch', () => {
      expect(usersService.patch).toBeCalledWith(
        requestMock.user,
        UPDATE_USER_DTO,
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when getSorted is called', () => {
    let user: ShortUser;

    const RequestMock = jest.fn().mockReturnValue({
      user: USER_SORTS_DATA,
    });

    beforeEach(async () => {
      user = await usersController.getSortedUser(RequestMock());
    });

    it('should call usersService get sorted', () => {
      expect(usersService.getSorted).toBeCalledWith(RequestMock().user);
    });

    it('should return a short user', () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.savePicture(
        requestMock,
        {} as Express.Multer.File,
      );
    });

    it('should call usersService save picture', () => {
      expect(usersService.savePicture).toBeCalledTimes(1);
      expect(usersService.savePicture).toBeCalledWith(requestMock.user, {});
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when deletePicture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.deletePicture(
        requestMock,
        DELETE_PICTURE_DTO,
      );
    });

    it('should call usersService delete picture', () => {
      expect(usersService.deletePicture).toBeCalledTimes(1);
      expect(usersService.deletePicture).toBeCalledWith(
        requestMock.user,
        DELETE_PICTURE_DTO,
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when mixPictures is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.mixPictures(requestMock, MIX_PICTURES_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.mixPictures).toBeCalledWith(
        requestMock.user,
        MIX_PICTURES_DTO,
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when likeUser is called', () => {
    let response;

    beforeEach(async () => {
      response = await usersController.likeUser(requestMock, newUserStub().id);
    });

    it('should call usersService', () => {
      expect(usersService.likeUser).toBeCalledTimes(1);
      expect(usersService.likeUser).toBeCalledWith(
        requestMock.user,
        newUserStub().id,
      );
    });

    it('should return empty object', () => {
      expect(response).toEqual({});
    });
  });

  describe('when dislikeUser is called', () => {
    let response;

    beforeEach(async () => {
      response = await usersController.dislikeUser(
        requestMock,
        newUserStub().id,
      );
    });

    it('should call usersService', () => {
      expect(usersService.dislikeUser).toBeCalledTimes(1);
      expect(usersService.dislikeUser).toBeCalledWith(
        requestMock.user,
        newUserStub().id,
      );
    });

    it('should return empty object', () => {
      expect(response).toEqual({});
    });
  });

  describe('when returnUser is called', () => {
    let response;

    beforeEach(async () => {
      response = await usersController.returnUser(requestMock);
    });

    it('should call usersService', () => {
      expect(usersService.returnUser).toBeCalledTimes(1);
      expect(usersService.returnUser).toBeCalledWith(requestMock.user);
    });

    it('should return empty object', () => {
      expect(response).toEqual({});
    });
  });

  describe('when getPairs is called', () => {
    let user: ShortUser[];

    beforeEach(async () => {
      user = await usersController.getPairs(requestMock);
    });

    it('should call usersService', () => {
      expect(usersService.getPairs).toBeCalledWith(requestMock.user);
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });

  describe('when deletePair is called', () => {
    let user: ShortUser[];
    const userPairId = '34545656';

    beforeEach(async () => {
      user = await usersController.deletePair(requestMock, userPairId);
    });

    it('should call usersService', () => {
      expect(usersService.deletePair).toBeCalledWith(
        requestMock.user,
        userPairId,
      );
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });
});

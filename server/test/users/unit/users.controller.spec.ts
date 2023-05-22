import { Test } from '@nestjs/testing';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { UsersServiceMock } from '../mocks/users.service-mock';
import { AccessTokenGuard } from 'common/guards';
import { shortUserStub, userStub } from '../stubs';
import { UserDto } from 'users/dto';
import { ShortUser } from 'users/users.interface';
import {
  CREATE_USER_PAIR_DTO,
  DELETE_PICTURE_DTO,
  DELETE_USER_PAIR_DTO,
  MIX_PICTURES_DTO,
  SAVE_PICTURE_DTO,
  UPDATE_USER_DTO,
  USER_SORTS_DTO,
} from '../values/users-const.dto';
import { clearMockHistory } from '../../common/utils';

describe('users-controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);

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

    usersController = await moduleRef.get<UsersController>(UsersController);
    usersService = await moduleRef.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    clearMockHistory(usersService);
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });
  });

  describe('when patch is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.patch(UPDATE_USER_DTO, userStub().id);
    });

    it('should call usersService', () => {
      expect(usersService.patch).toBeCalledWith(userStub().id, UPDATE_USER_DTO);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when getSorted is called', () => {
    let user: ShortUser;

    beforeEach(async () => {
      user = await usersController.getSortedUser(USER_SORTS_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.getSorted).toBeCalledWith(USER_SORTS_DTO);
    });

    it('should return a short user', () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.savePicture(
        SAVE_PICTURE_DTO,
        {} as Express.Multer.File,
      );
    });

    it('should call usersService', () => {
      expect(usersService.savePicture).toBeCalledWith(SAVE_PICTURE_DTO, {});
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when deletePicture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.deletePicture(DELETE_PICTURE_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.deletePicture).toBeCalledWith(DELETE_PICTURE_DTO);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when mixPictures is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await usersController.mixPictures(MIX_PICTURES_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.mixPictures).toBeCalledWith(MIX_PICTURES_DTO);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when createPair is called', () => {
    let users: ShortUser[];

    beforeEach(async () => {
      users = await usersController.createPair(CREATE_USER_PAIR_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.createPair).toBeCalledWith(CREATE_USER_PAIR_DTO);
    });

    it('should return an array of short users', () => {
      expect(users).toEqual([shortUserStub()]);
    });
  });

  describe('when deletePair is called', () => {
    let user: ShortUser[];

    beforeEach(async () => {
      user = await usersController.deletePair(DELETE_USER_PAIR_DTO);
    });

    it('should call usersService', () => {
      expect(usersService.deletePair).toBeCalledWith(DELETE_USER_PAIR_DTO);
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });
});

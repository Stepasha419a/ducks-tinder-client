import { Test } from '@nestjs/testing';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { UsersServiceMock } from '../mocks/users.service-mock';
import { AuthGuard } from 'auth/auth.guard';
import { shortUserStub, userStub } from '../stubs';
import {
  UserDto,
  UserSortsDto,
  UpdateUserDto,
  SavePictureDto,
  DeletePictureDto,
  MixPicturesDto,
  UserPairDto,
} from 'users/dto';
import { ShortUser } from 'users/users.interface';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockAuthGuard = jest.fn(() => true);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider(UsersService)
      .useValue(UsersServiceMock())
      .compile();

    usersController = await moduleRef.get<UsersController>(UsersController);
    usersService = await moduleRef.get<UsersService>(UsersService);
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });
  });

  describe('when patch is called', () => {
    let user: UserDto;
    let updateUserDto: UpdateUserDto;

    beforeEach(async () => {
      updateUserDto = {
        name: 'John',
        email: 'email123123@gmail.com',
      };
      user = await usersController.patch(updateUserDto, userStub().id);
    });

    it('should call usersService', () => {
      expect(usersService.patch).toBeCalledWith(userStub().id, updateUserDto);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when getSorted is called', () => {
    let user: ShortUser;
    let sortedUserDto: UserSortsDto;

    beforeEach(async () => {
      sortedUserDto = {
        distance: 100,
        onlyNear: true,
        age: 20,
        preferAgeFrom: 18,
        preferAgeTo: 25,
        sex: 'male',
        preferSex: 'female',
        userIds: [],
      };
      user = await usersController.getSortedUser(sortedUserDto);
    });

    it('should call usersService', () => {
      expect(usersService.getSorted).toBeCalledWith(sortedUserDto);
    });

    it('should return a short user', () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: UserDto;
    let savePictureDto: SavePictureDto;

    beforeEach(async () => {
      savePictureDto = {
        userId: userStub().id,
      };
      user = await usersController.savePicture(
        savePictureDto,
        {} as Express.Multer.File,
      );
    });

    it('should call usersService', () => {
      expect(usersService.savePicture).toBeCalledWith(savePictureDto, {});
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when deletePicture is called', () => {
    let user: UserDto;
    let deletePictureDto: DeletePictureDto;

    beforeEach(async () => {
      deletePictureDto = {
        userId: userStub().id,
        order: 0,
      };
      user = await usersController.deletePicture(deletePictureDto);
    });

    it('should call usersService', () => {
      expect(usersService.deletePicture).toBeCalledWith(deletePictureDto);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when mixPictures is called', () => {
    let user: UserDto;
    let mixPicturesDto: MixPicturesDto;

    beforeEach(async () => {
      mixPicturesDto = {
        userId: userStub().id,
        mixOrder: 0,
        withOrder: 1,
      };
      user = await usersController.mixPictures(mixPicturesDto);
    });

    it('should call usersService', () => {
      expect(usersService.mixPictures).toBeCalledWith(mixPicturesDto);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when createPair is called', () => {
    let users: ShortUser[];
    let UserPairDto: UserPairDto;

    beforeEach(async () => {
      UserPairDto = {
        userId: '6456456456456',
        userPairId: userStub().id,
      };
      users = await usersController.createPair(UserPairDto);
    });

    it('should call usersService', () => {
      expect(usersService.createPair).toBeCalledWith(UserPairDto);
    });

    it('should return an array of short users', () => {
      expect(users).toEqual([shortUserStub()]);
    });
  });

  describe('when deletePair is called', () => {
    let user: ShortUser[];
    let UserPairDto: UserPairDto;

    beforeEach(async () => {
      UserPairDto = {
        userId: '6456456456456',
        userPairId: userStub().id,
      };
      user = await usersController.deletePair(UserPairDto);
    });

    it('should call usersService', () => {
      expect(usersService.deletePair).toBeCalledWith(UserPairDto);
    });

    it('should return an array of short users', () => {
      expect(user).toEqual([shortUserStub()]);
    });
  });
});

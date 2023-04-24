import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthGuard } from '../../auth/auth.guard';
import { userStub } from './stubs';
import { IUserDto } from '../users.interface';
import { UserSortsDto } from '../dto/user-sorts.dto';
import { UpdateUserDto } from '../dto/updated-user.dto';
import { SavePictureDto } from '../dto/save-picture.dto';
import { DeletePictureDto } from '../dto/delete-picture.dto';
import { UserPairDto } from '../dto/user-pair.dto';

jest.mock('../users.service');

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
      .compile();

    usersController = await moduleRef.get<UsersController>(UsersController);
    usersService = await moduleRef.get<UsersService>(UsersService);
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });
  });

  describe('when getOne is called', () => {
    let user: IUserDto;

    beforeEach(async () => {
      user = await usersController.getOne(userStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.getOne).toBeCalledWith(userStub()._id);
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when update is called', () => {
    let user: IUserDto;
    let updateUserDto: UpdateUserDto;

    beforeEach(async () => {
      updateUserDto = {
        name: 'John',
        email: 'email123123@gmail.com',
      };
      user = await usersController.update(updateUserDto, userStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.update).toBeCalledWith(userStub()._id, updateUserDto);
    });

    it('should return an updated user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when delete is called', () => {
    let user: IUserDto;

    beforeEach(async () => {
      user = await usersController.delete(userStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.delete).toBeCalledWith(userStub()._id);
    });

    it('should return a deleted user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when getSorted is called', () => {
    let user: IUserDto;
    let sortedUserDto: UserSortsDto;

    beforeEach(async () => {
      sortedUserDto = {
        distance: 100,
        onlyNear: true,
        age: 20,
        preferAge: { from: 18, to: 25 },
        sex: 'male',
        preferSex: 'female',
        userIds: [],
      };
      user = await usersController.getSortedUser(sortedUserDto);
    });

    it('should call usersService', () => {
      expect(usersService.getSorted).toBeCalledWith(sortedUserDto);
    });

    it('should return a sorted user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: IUserDto;
    let savePictureDto: SavePictureDto;

    beforeEach(async () => {
      savePictureDto = {
        userId: userStub()._id,
        setting: 'avatar',
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
    let user: IUserDto;
    let deletePictureDto: DeletePictureDto;

    beforeEach(async () => {
      deletePictureDto = {
        userId: 'sdfhsdghj34259034578923',
        pictureName: 'randomPictureName',
        setting: 'avatar',
      };
      user = await usersController.deletePicture(deletePictureDto);
    });

    it('should call usersService', () => {
      expect(usersService.deletePicture).toBeCalledWith(deletePictureDto);
    });

    it('should return an updated user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when createPair is called', () => {
    let user: IUserDto;
    let UserPairDto: UserPairDto;

    beforeEach(async () => {
      UserPairDto = {
        forUserId: '6456456456456',
        userId: 'sdfhsdghj34259034578923',
      };
      user = await usersController.createPair(UserPairDto);
    });

    it('should call usersService', () => {
      expect(usersService.createPair).toBeCalledWith(UserPairDto);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when deletePair is called', () => {
    let user: IUserDto;
    let UserPairDto: UserPairDto;

    beforeEach(async () => {
      UserPairDto = {
        forUserId: '6456456456456',
        userId: 'sdfhsdghj34259034578923',
      };
      user = await usersController.deletePair(UserPairDto);
    });

    it('should call usersService', () => {
      expect(usersService.deletePair).toBeCalledWith(UserPairDto);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });
});

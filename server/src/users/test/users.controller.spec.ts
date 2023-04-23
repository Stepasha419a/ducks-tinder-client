import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthGuard } from '../../auth/auth.guard';
import { userDataStub } from './stubs';
import { IUserDto } from '../users.interface';
import { UserSortsDto } from '../dto/user-sorts.dto';
import { UpdateUserDto } from '../dto/updated-user.dto';
import { SavePictureDto } from '../dto/save-picture.dto';
import { DeletePictureDto } from '../dto/delete-picture.dto';

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
      user = await usersController.getOne(userDataStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.getOne).toBeCalledWith(userDataStub()._id);
    });

    it('should return a user', async () => {
      expect(user).toEqual(userDataStub());
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
      user = await usersController.update(updateUserDto, userDataStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.update).toBeCalledWith(
        userDataStub()._id,
        updateUserDto,
      );
    });

    it('should return an updated user', () => {
      expect(user).toEqual(userDataStub());
    });
  });

  describe('when delete is called', () => {
    let user: IUserDto;

    beforeEach(async () => {
      user = await usersController.delete(userDataStub()._id);
    });

    it('should call usersService', () => {
      expect(usersService.delete).toBeCalledWith(userDataStub()._id);
    });

    it('should return a deleted user', () => {
      expect(user).toEqual(userDataStub());
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
      expect(user).toEqual(userDataStub());
    });
  });

  describe('when savePicture is called', () => {
    let user: IUserDto;
    let savePictureDto: SavePictureDto;

    beforeEach(async () => {
      savePictureDto = {
        userId: userDataStub()._id,
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
      expect(user).toEqual(userDataStub());
    });
  });

  describe('when deletePicture is called', () => {
    let user: IUserDto;
    let deletePictureDtoStub: DeletePictureDto;

    beforeEach(async () => {
      deletePictureDtoStub = {
        userId: 'sdfhsdghj34259034578923',
        pictureName: 'randomPictureName',
        setting: 'avatar',
      };
      user = await usersController.deletePicture(deletePictureDtoStub);
    });

    it('should call usersService', () => {
      expect(usersService.deletePicture).toBeCalledWith(deletePictureDtoStub);
    });

    it('should return an updated user', () => {
      expect(user).toEqual(userDataStub());
    });
  });
});

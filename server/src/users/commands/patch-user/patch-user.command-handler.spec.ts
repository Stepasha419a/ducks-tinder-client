import { Test } from '@nestjs/testing';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { UserDto } from 'users/dto';
import { PatchUserCommandHandler } from './patch-user.command-handler';
import { PatchUserCommand } from './patch-user.command';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { UPDATE_USER_DTO } from 'users/test/values/users.const.dto';
import { USER_ALREADY_EXISTS } from 'common/constants/error';
import { UsersSelector } from 'users/users.selector';

describe('when patch is called', () => {
  let prismaService: PrismaService;
  let patchUserCommandHandler: PatchUserCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchUserCommandHandler],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    patchUserCommandHandler = moduleRef.get<PatchUserCommandHandler>(
      PatchUserCommandHandler,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(undefined);
      prismaService.$transaction = jest.fn();
      prismaService.user.update = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
    });

    let user: UserDto;

    beforeEach(async () => {
      jest.clearAllMocks();

      user = await patchUserCommandHandler.execute(
        new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
      );
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { email: UPDATE_USER_DTO.email },
      });
    });

    it('should call update user', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: { ...UPDATE_USER_DTO },
        include: UsersSelector.selectUser(),
      });
    });

    it('should call user count', () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { id: requestUserStub().id } } },
      });
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when there is already used email address', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.update = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
    });

    let user: UserDto;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        user = await patchUserCommandHandler.execute(
          new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { email: UPDATE_USER_DTO.email },
      });
    });

    it('should not call update user', () => {
      expect(prismaService.user.update).not.toBeCalled();
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(403);
      expect(error.message).toEqual(USER_ALREADY_EXISTS);
    });

    it('should return undefined', () => {
      expect(user).toEqual(undefined);
    });
  });
});

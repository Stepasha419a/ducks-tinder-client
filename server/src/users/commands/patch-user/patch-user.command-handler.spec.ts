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
      prismaService.user.update = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.interest.findMany = jest.fn().mockResolvedValue([
        { id: 'interest-id-2', name: UPDATE_USER_DTO.interests[0] },
        { id: 'interest-id-3', name: UPDATE_USER_DTO.interests[1] },
      ]);
    });

    let user: UserDto;

    beforeEach(async () => {
      jest.clearAllMocks();
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce(undefined)
        .mockResolvedValue({
          interests: [{ id: 'interest-id-1', name: 'programming' }],
        });
      user = await patchUserCommandHandler.execute(
        new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
      );
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(2);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { email: UPDATE_USER_DTO.email },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        select: {
          interests: true,
        },
      });
    });

    it('should call find many interests', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(1);
      expect(prismaService.interest.findMany).toBeCalledWith({
        where: { name: { in: UPDATE_USER_DTO.interests } },
      });
    });

    it('should call update user', () => {
      expect(prismaService.user.update).toBeCalledTimes(4);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userDtoStub().id },
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-1',
            },
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          interests: {
            connect: {
              id: 'interest-id-2',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        data: {
          interests: {
            connect: {
              id: 'interest-id-3',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
    });

    it('should call user count', () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { id: user.id } } },
      });
    });

    it('should return a user', () => {
      expect(user).toEqual(userDtoStub());
    });
  });

  describe('when there is already used email address', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        interests: [{ id: 'interest-id-1', name: 'programming' }],
      });
      prismaService.user.update = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.interest.findMany = jest.fn().mockResolvedValue([
        { id: 'interest-id-2', name: UPDATE_USER_DTO.interests[0] },
        { id: 'interest-id-3', name: UPDATE_USER_DTO.interests[1] },
      ]);
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

    it('should call user find unique (1st time)', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { email: UPDATE_USER_DTO.email },
      });
    });

    it('should not call find many interests', () => {
      expect(prismaService.interest.findMany).not.toBeCalled();
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

import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { UserDto } from 'users/dto';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { UsersSelector } from 'users/users.selector';
import { MixPicturesCommandHandler } from './mix-pictures.command-handler';
import { MixPicturesCommand } from './mix-pictures.command';
import { MIX_PICTURES_DTO } from 'users/test/values/users.const.dto';

describe('when mix pictures is called', () => {
  let prismaService: PrismaService;
  let mixPicturesCommandHandler: MixPicturesCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MixPicturesCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    mixPicturesCommandHandler = moduleRef.get<MixPicturesCommandHandler>(
      MixPicturesCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.picture.findMany = jest.fn().mockResolvedValue([
        {
          id: '123123',
          name: 'picture-1.jpg',
          userId: userDtoStub().id,
          order: 0,
        },
        {
          id: '456456',
          name: 'picture-2.jpg',
          userId: userDtoStub().id,
          order: 1,
        },
        {
          id: '789789',
          name: 'picture-3.jpg',
          userId: userDtoStub().id,
          order: 2,
        },
      ]);
    });

    let user: UserDto;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = await mixPicturesCommandHandler.execute(
        new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
      );
    });

    it('should call picture findMany', () => {
      expect(prismaService.picture.findMany).toBeCalledTimes(1);
      expect(prismaService.picture.findMany).toBeCalledWith({
        where: { userId: userDtoStub().id },
      });
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userDtoStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should call picture update', () => {
      expect(prismaService.picture.update).toBeCalledTimes(3);
      expect(prismaService.picture.update).toHaveBeenNthCalledWith(1, {
        where: { id: '789789' },
        data: { order: 0 },
      });
      expect(prismaService.picture.update).toHaveBeenNthCalledWith(2, {
        where: { id: '123123' },
        data: { order: 1 },
      });
      expect(prismaService.picture.update).toHaveBeenNthCalledWith(3, {
        where: { id: '456456' },
        data: { order: 2 },
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

  describe('when user pictures do not equal dto pictures', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.picture.findMany = jest.fn().mockResolvedValue([
        {
          id: '123123',
          name: 'picture-1.jpg',
          userId: userDtoStub().id,
          order: 0,
        },
      ]);
    });

    let response;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await mixPicturesCommandHandler.execute(
          new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call picture findMany', () => {
      expect(prismaService.picture.findMany).toBeCalledTimes(1);
      expect(prismaService.picture.findMany).toBeCalledWith({
        where: { userId: userDtoStub().id },
      });
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should not call picture update', () => {
      expect(prismaService.picture.update).not.toBeCalled();
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });
  });

  describe('when there is no such picture (name does not equal)', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.picture.findMany = jest.fn().mockResolvedValue([
        {
          id: '123123',
          name: 'picture-1.jpg',
          userId: userDtoStub().id,
          order: 0,
        },
        {
          id: '456456',
          name: 'picture-2.jpg',
          userId: userDtoStub().id,
          order: 1,
        },
        {
          id: '789789',
          name: 'wrong-picture-name.jpg',
          userId: userDtoStub().id,
          order: 2,
        },
      ]);
    });

    let response;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await mixPicturesCommandHandler.execute(
          new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call picture findMany', () => {
      expect(prismaService.picture.findMany).toBeCalledTimes(1);
      expect(prismaService.picture.findMany).toBeCalledWith({
        where: { userId: userDtoStub().id },
      });
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should not call picture update', () => {
      expect(prismaService.picture.update).not.toBeCalled();
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });
  });
});

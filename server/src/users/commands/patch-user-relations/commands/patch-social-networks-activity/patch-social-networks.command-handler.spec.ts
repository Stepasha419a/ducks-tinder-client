import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchSocialNetworksActivityCommandHandler } from './patch-social-networks-activity.command-handler';
import { PatchSocialNetworksActivityCommand } from './patch-social-networks-activity.command';

describe('when patch social networks activity sign is called', () => {
  let prismaService: PrismaService;
  let patchSocialNetworksActivityCommandHandler: PatchSocialNetworksActivityCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchSocialNetworksActivityCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchSocialNetworksActivityCommandHandler =
      moduleRef.get<PatchSocialNetworksActivityCommandHandler>(
        PatchSocialNetworksActivityCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.socialNetworksActivity.findUnique = jest
        .fn()
        .mockResolvedValue('social-networks-activity');
    });

    let response: void;
    const socialNetworksActivityName = 'social-networks-activity';

    beforeEach(async () => {
      response = await patchSocialNetworksActivityCommandHandler.execute(
        new PatchSocialNetworksActivityCommand(
          requestUserStub(),
          socialNetworksActivityName,
        ),
      );
    });

    it('should call social networks activity find unique', () => {
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledTimes(
        1,
      );
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledWith({
        where: { name: socialNetworksActivityName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          socialNetworksActivity: {
            connect: { name: socialNetworksActivityName },
          },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.socialNetworksActivity.findUnique = jest
        .fn()
        .mockResolvedValue('social-networks-activity');
    });

    let response: void;
    const socialNetworksActivityName = 'social-networks-activity';

    beforeEach(async () => {
      response = await patchSocialNetworksActivityCommandHandler.execute(
        new PatchSocialNetworksActivityCommand(
          { ...requestUserStub(), socialNetworksActivity: null },
          socialNetworksActivityName,
        ),
      );
    });

    it('should call social networks activity find unique', () => {
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledTimes(
        1,
      );
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledWith({
        where: { name: socialNetworksActivityName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          socialNetworksActivity: {
            connect: { name: socialNetworksActivityName },
          },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.socialNetworksActivity.findUnique = jest
        .fn()
        .mockResolvedValue('social-networks-activity');
    });

    let response: void;
    const socialNetworksActivityName = null;

    beforeEach(async () => {
      response = await patchSocialNetworksActivityCommandHandler.execute(
        new PatchSocialNetworksActivityCommand(
          requestUserStub(),
          socialNetworksActivityName,
        ),
      );
    });

    it('should not call social networks activity find unique', () => {
      expect(prismaService.socialNetworksActivity.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.socialNetworksActivity.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const socialNetworksActivityName = 'social-networks-activity';

    beforeEach(async () => {
      try {
        response = await patchSocialNetworksActivityCommandHandler.execute(
          new PatchSocialNetworksActivityCommand(
            requestUserStub(),
            socialNetworksActivityName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call social networks activity find unique', () => {
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledTimes(
        1,
      );
      expect(prismaService.socialNetworksActivity.findUnique).toBeCalledWith({
        where: { name: socialNetworksActivityName },
      });
    });

    it('should not call user update', () => {
      expect(prismaService.user.update).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});

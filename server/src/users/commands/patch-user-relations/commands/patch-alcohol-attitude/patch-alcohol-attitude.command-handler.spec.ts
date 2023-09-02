import { PrismaService } from 'prisma/prisma.service';
import { PatchAlcoholAttitudeCommandHandler } from './patch-alcohol-attitude.command-handler';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { PatchAlcoholAttitudeCommand } from './patch-alcohol-attitude.command';
import { requestUserStub } from 'users/test/stubs';

describe('when patch alcohol attitude is called', () => {
  let prismaService: PrismaService;
  let patchAlcoholAttitudeCommandHandler: PatchAlcoholAttitudeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchAlcoholAttitudeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchAlcoholAttitudeCommandHandler =
      moduleRef.get<PatchAlcoholAttitudeCommandHandler>(
        PatchAlcoholAttitudeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.alcoholAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('alcohol-attitude');
    });

    let response: void;
    const alcoholAttitudeName = 'alcohol-attitude';

    beforeEach(async () => {
      response = await patchAlcoholAttitudeCommandHandler.execute(
        new PatchAlcoholAttitudeCommand(requestUserStub(), alcoholAttitudeName),
      );
    });

    it('should call alcohol attitude find unique', () => {
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledWith({
        where: { name: alcoholAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          alcoholAttitude: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          alcoholAttitude: { connect: { name: alcoholAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.alcoholAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('alcohol-attitude');
    });

    let response: void;
    const alcoholAttitudeName = 'alcohol-attitude';

    beforeEach(async () => {
      response = await patchAlcoholAttitudeCommandHandler.execute(
        new PatchAlcoholAttitudeCommand(
          { ...requestUserStub(), alcoholAttitude: null },
          alcoholAttitudeName,
        ),
      );
    });

    it('should call alcohol attitude find unique', () => {
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledWith({
        where: { name: alcoholAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          alcoholAttitude: { connect: { name: alcoholAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.alcoholAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('alcohol-attitude');
    });

    let response: void;
    const alcoholAttitudeName = null;

    beforeEach(async () => {
      response = await patchAlcoholAttitudeCommandHandler.execute(
        new PatchAlcoholAttitudeCommand(requestUserStub(), alcoholAttitudeName),
      );
    });

    it('should not call alcohol attitude find unique', () => {
      expect(prismaService.alcoholAttitude.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          alcoholAttitude: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.alcoholAttitude.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const alcoholAttitudeName = 'alcohol-attitude';

    beforeEach(async () => {
      try {
        response = await patchAlcoholAttitudeCommandHandler.execute(
          new PatchAlcoholAttitudeCommand(
            requestUserStub(),
            alcoholAttitudeName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call alcohol attitude find unique', () => {
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.alcoholAttitude.findUnique).toBeCalledWith({
        where: { name: alcoholAttitudeName },
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

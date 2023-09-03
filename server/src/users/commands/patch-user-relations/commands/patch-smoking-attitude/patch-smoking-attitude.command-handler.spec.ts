import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchSmokingAttitudeCommandHandler } from './patch-smoking-attitude.command-handler';
import { PatchSmokingAttitudeCommand } from './patch-smoking-attitude.command';

describe('when patch smoking attitude sign is called', () => {
  let prismaService: PrismaService;
  let patchSmokingAttitudeCommandHandler: PatchSmokingAttitudeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchSmokingAttitudeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchSmokingAttitudeCommandHandler =
      moduleRef.get<PatchSmokingAttitudeCommandHandler>(
        PatchSmokingAttitudeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.smokingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('smoking-attitude');
    });

    let response: void;
    const smokingAttitudeName = 'smoking-attitude';

    beforeEach(async () => {
      response = await patchSmokingAttitudeCommandHandler.execute(
        new PatchSmokingAttitudeCommand(requestUserStub(), smokingAttitudeName),
      );
    });

    it('should call smoking attitude find unique', () => {
      expect(prismaService.smokingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.smokingAttitude.findUnique).toBeCalledWith({
        where: { name: smokingAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          smokingAttitude: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          smokingAttitude: { connect: { name: smokingAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.smokingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('smoking-attitude');
    });

    let response: void;
    const smokingAttitudeName = 'smoking-attitude';

    beforeEach(async () => {
      response = await patchSmokingAttitudeCommandHandler.execute(
        new PatchSmokingAttitudeCommand(
          { ...requestUserStub(), smokingAttitude: null },
          smokingAttitudeName,
        ),
      );
    });

    it('should call smoking attitude find unique', () => {
      expect(prismaService.smokingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.smokingAttitude.findUnique).toBeCalledWith({
        where: { name: smokingAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          smokingAttitude: { connect: { name: smokingAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.smokingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('smoking-attitude');
    });

    let response: void;
    const smokingAttitudeName = null;

    beforeEach(async () => {
      response = await patchSmokingAttitudeCommandHandler.execute(
        new PatchSmokingAttitudeCommand(requestUserStub(), smokingAttitudeName),
      );
    });

    it('should not call smoking attitude find unique', () => {
      expect(prismaService.smokingAttitude.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          smokingAttitude: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.smokingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const smokingAttitudeName = 'smoking-attitude';

    beforeEach(async () => {
      try {
        response = await patchSmokingAttitudeCommandHandler.execute(
          new PatchSmokingAttitudeCommand(
            requestUserStub(),
            smokingAttitudeName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call smoking attitude find unique', () => {
      expect(prismaService.smokingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.smokingAttitude.findUnique).toBeCalledWith({
        where: { name: smokingAttitudeName },
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

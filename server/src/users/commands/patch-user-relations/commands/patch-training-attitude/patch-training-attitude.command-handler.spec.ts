import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchTrainingAttitudeCommandHandler } from './patch-training-attitude.command-handler';
import { PatchTrainingAttitudeCommand } from './patch-training-attitude.command';

describe('when patch training attitude sign is called', () => {
  let prismaService: PrismaService;
  let patchTrainingAttitudeCommandHandler: PatchTrainingAttitudeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchTrainingAttitudeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchTrainingAttitudeCommandHandler =
      moduleRef.get<PatchTrainingAttitudeCommandHandler>(
        PatchTrainingAttitudeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.trainingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('training-attitude');
    });

    let response: void;
    const trainingAttitudeName = 'training-attitude';

    beforeEach(async () => {
      response = await patchTrainingAttitudeCommandHandler.execute(
        new PatchTrainingAttitudeCommand(
          requestUserStub(),
          trainingAttitudeName,
        ),
      );
    });

    it('should call training attitude find unique', () => {
      expect(prismaService.trainingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.trainingAttitude.findUnique).toBeCalledWith({
        where: { name: trainingAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          trainingAttitude: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          trainingAttitude: { connect: { name: trainingAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.trainingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('training-attitude');
    });

    let response: void;
    const trainingAttitudeName = 'training-attitude';

    beforeEach(async () => {
      response = await patchTrainingAttitudeCommandHandler.execute(
        new PatchTrainingAttitudeCommand(
          { ...requestUserStub(), trainingAttitude: null },
          trainingAttitudeName,
        ),
      );
    });

    it('should call training attitude find unique', () => {
      expect(prismaService.trainingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.trainingAttitude.findUnique).toBeCalledWith({
        where: { name: trainingAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          trainingAttitude: { connect: { name: trainingAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.trainingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('training-attitude');
    });

    let response: void;
    const trainingAttitudeName = null;

    beforeEach(async () => {
      response = await patchTrainingAttitudeCommandHandler.execute(
        new PatchTrainingAttitudeCommand(
          requestUserStub(),
          trainingAttitudeName,
        ),
      );
    });

    it('should not call training attitude find unique', () => {
      expect(prismaService.trainingAttitude.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          trainingAttitude: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.trainingAttitude.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const trainingAttitudeName = 'training-attitude';

    beforeEach(async () => {
      try {
        response = await patchTrainingAttitudeCommandHandler.execute(
          new PatchTrainingAttitudeCommand(
            requestUserStub(),
            trainingAttitudeName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call training attitude find unique', () => {
      expect(prismaService.trainingAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.trainingAttitude.findUnique).toBeCalledWith({
        where: { name: trainingAttitudeName },
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

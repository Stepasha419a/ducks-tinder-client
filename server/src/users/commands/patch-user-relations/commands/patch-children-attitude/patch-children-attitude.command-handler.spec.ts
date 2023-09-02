import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchChildrenAttitudeCommandHandler } from './patch-children-attitude.command-handler';
import { PatchChildrenAttitudeCommand } from './patch-children-attitude.command';

describe('when patch children attitude sign is called', () => {
  let prismaService: PrismaService;
  let patchChildrenAttitudeCommandHandler: PatchChildrenAttitudeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchChildrenAttitudeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchChildrenAttitudeCommandHandler =
      moduleRef.get<PatchChildrenAttitudeCommandHandler>(
        PatchChildrenAttitudeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('children-attitude');
    });

    let response: void;
    const childrenAttitudeName = 'children-attitude';

    beforeEach(async () => {
      response = await patchChildrenAttitudeCommandHandler.execute(
        new PatchChildrenAttitudeCommand(
          requestUserStub(),
          childrenAttitudeName,
        ),
      );
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: childrenAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: { connect: { name: childrenAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('children-attitude');
    });

    let response: void;
    const childrenAttitudeName = 'children-attitude';

    beforeEach(async () => {
      response = await patchChildrenAttitudeCommandHandler.execute(
        new PatchChildrenAttitudeCommand(
          { ...requestUserStub(), childrenAttitude: null },
          childrenAttitudeName,
        ),
      );
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: childrenAttitudeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: { connect: { name: childrenAttitudeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue('children-attitude');
    });

    let response: void;
    const childrenAttitudeName = null;

    beforeEach(async () => {
      response = await patchChildrenAttitudeCommandHandler.execute(
        new PatchChildrenAttitudeCommand(
          requestUserStub(),
          childrenAttitudeName,
        ),
      );
    });

    it('should not call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const childrenAttitudeName = 'children-attitude';

    beforeEach(async () => {
      try {
        response = await patchChildrenAttitudeCommandHandler.execute(
          new PatchChildrenAttitudeCommand(
            requestUserStub(),
            childrenAttitudeName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: childrenAttitudeName },
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

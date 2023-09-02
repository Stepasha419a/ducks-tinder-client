import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchChronotypeCommandHandler } from './patch-chronotype.command-handler';
import { PatchChronotypeCommand } from './patch-chronotype.command';

describe('when patch chronotype sign is called', () => {
  let prismaService: PrismaService;
  let patchChronotypeCommandHandler: PatchChronotypeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchChronotypeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchChronotypeCommandHandler =
      moduleRef.get<PatchChronotypeCommandHandler>(
        PatchChronotypeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.chronotype.findUnique = jest
        .fn()
        .mockResolvedValue('chronotype');
    });

    let response: void;
    const chronotypeName = 'chronotype';

    beforeEach(async () => {
      response = await patchChronotypeCommandHandler.execute(
        new PatchChronotypeCommand(requestUserStub(), chronotypeName),
      );
    });

    it('should call chronotype find unique', () => {
      expect(prismaService.chronotype.findUnique).toBeCalledTimes(1);
      expect(prismaService.chronotype.findUnique).toBeCalledWith({
        where: { name: chronotypeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          chronotype: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          chronotype: { connect: { name: chronotypeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.chronotype.findUnique = jest
        .fn()
        .mockResolvedValue('chronotype');
    });

    let response: void;
    const chronotypeName = 'chronotype';

    beforeEach(async () => {
      response = await patchChronotypeCommandHandler.execute(
        new PatchChronotypeCommand(
          { ...requestUserStub(), chronotype: null },
          chronotypeName,
        ),
      );
    });

    it('should call chronotype find unique', () => {
      expect(prismaService.chronotype.findUnique).toBeCalledTimes(1);
      expect(prismaService.chronotype.findUnique).toBeCalledWith({
        where: { name: chronotypeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          chronotype: { connect: { name: chronotypeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.chronotype.findUnique = jest
        .fn()
        .mockResolvedValue('chronotype');
    });

    let response: void;
    const chronotypeName = null;

    beforeEach(async () => {
      response = await patchChronotypeCommandHandler.execute(
        new PatchChronotypeCommand(requestUserStub(), chronotypeName),
      );
    });

    it('should not call chronotype find unique', () => {
      expect(prismaService.chronotype.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          chronotype: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.chronotype.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const chronotypeName = 'chronotype';

    beforeEach(async () => {
      try {
        response = await patchChronotypeCommandHandler.execute(
          new PatchChronotypeCommand(requestUserStub(), chronotypeName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chronotype find unique', () => {
      expect(prismaService.chronotype.findUnique).toBeCalledTimes(1);
      expect(prismaService.chronotype.findUnique).toBeCalledWith({
        where: { name: chronotypeName },
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
